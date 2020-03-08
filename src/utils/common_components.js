import { cloneDeep, sortBy, uniqBy } from "lodash";

import { getCenter, getDistance } from "geolib";

import { Op } from "sequelize";

const cache_ttl_sec = 1209600;

export async function merge_rectangle_results_from_db_and_api(
  south_west_coordinate_latitude,
  south_west_coordinate_longitude,
  north_east_coordinate_latitude,
  north_east_coordinate_longitude,
  keyword,
  lang,
  self
) {
  const tmpCacheKey = self.get_cache_key(
    south_west_coordinate_latitude,
    south_west_coordinate_longitude,
    north_east_coordinate_latitude,
    north_east_coordinate_longitude,
    keyword,
    lang
  );

  const tmpCacheResult = await self.redis.get(tmpCacheKey);
  if (tmpCacheResult !== null && tmpCacheResult !== undefined) {
    return JSON.parse(Buffer.from(tmpCacheResult, "base64").toString("utf-8"));
  }

  const tmpAxiosConfig = {
    headers: {
      "Accept-Language":
        lang === undefined || lang === "" || lang === null ? "en" : lang
    },
    params: {
      ...self.default_param,
      intent: "browse",
      sw: `${self.any_to_fixed_float(
        south_west_coordinate_latitude,
        6
      )},${self.any_to_fixed_float(south_west_coordinate_longitude, 6)}`,
      ne: `${self.any_to_fixed_float(
        north_east_coordinate_latitude,
        6
      )},${self.any_to_fixed_float(north_east_coordinate_longitude, 6)}`,
      query:
        keyword === undefined || keyword === "" || keyword === null
          ? undefined
          : keyword
    }
  };

  if (self.postgres_db_config.logger) {
    self.postgres_db_config.logger.trace(tmpAxiosConfig);
  } else {
    console.trace(
      JSON.stringify(tmpAxiosConfig, null, 2),
      "Search-Communities::tmpAxiosConfig"
    );
  }

  const { data } = await self.limiter.schedule(() =>
    self.http_client.request(tmpAxiosConfig)
  );

  const tmpModelFindAllConfig = {
    where: {
      [Op.and]: [
        {
          latitude_num: {
            [Op.gte]: self.any_to_fixed_float(south_west_coordinate_latitude, 6)
          }
        },
        {
          latitude_num: {
            [Op.lte]: self.any_to_fixed_float(north_east_coordinate_latitude, 6)
          }
        },
        {
          longitude_num: {
            [Op.gte]: self.any_to_fixed_float(
              south_west_coordinate_longitude,
              6
            )
          }
        },
        {
          longitude_num: {
            [Op.lte]: self.any_to_fixed_float(
              north_east_coordinate_longitude,
              6
            )
          }
        }
      ]
    },
    order: [["cache_id", "DESC"]],
    limit: 5000
  };

  if (keyword !== undefined && keyword !== "" && keyword !== null) {
    tmpModelFindAllConfig.where[Op.and].push({
      keyword_str: { [Op.iLike]: `%${keyword}%` }
    });
  }

  if (self.postgres_db_config.logger) {
    self.postgres_db_config.logger.trace(tmpModelFindAllConfig);
  } else {
    console.trace(
      JSON.stringify(tmpModelFindAllConfig, null, 2),
      "Search-Communities::tmpModelFindAllConfig"
    );
  }

  const from_db = await self.location_cache_model.findAll(
    tmpModelFindAllConfig
  );

  if (
    data &&
    data.response &&
    data.response.venues &&
    data.response.venues.length > 0
  ) {
    const tmpDBMap = {};
    from_db
      .map(r => r.toJSON())
      .forEach(v => {
        if (tmpDBMap[v.location_id] === undefined) {
          tmpDBMap[v.location_id] = v.raw_content;
        }
      });

    const ready_to_be_written_in_db = data.response.venues
      .filter(v => {
        if (tmpDBMap[v.id] !== undefined) {
          return false;
        } else {
          return true;
        }
      })
      .map(v => {
        return {
          location_id: v.id,
          name: v.name,
          keyword_str: keyword,
          latitude_num: self.any_to_fixed_float(v.location.lat, 6),
          longitude_num: self.any_to_fixed_float(v.location.lng, 6),
          latitude_raw_str: `${v.location.lat}`,
          longitude_raw_str: `${v.location.lng}`,
          raw_content: cloneDeep(v),
          should_be_deleted_when: Date.now() + cache_ttl_sec * 1000
        };
      });

    await self.location_cache_model.bulkCreate(ready_to_be_written_in_db);

    const tmpResult = uniqBy(
      [
        ...ready_to_be_written_in_db.map(v => v.raw_content),
        ...Object.keys(tmpDBMap).map(k => tmpDBMap[k])
      ],
      "id"
    );

    const center = getCenter([
      {
        latitude: south_west_coordinate_latitude,
        longitude: south_west_coordinate_longitude
      },
      {
        latitude: north_east_coordinate_latitude,
        longitude: north_east_coordinate_longitude
      }
    ]);

    const sortedResult = sortBy(tmpResult, [
      v => {
        return getDistance(
          {
            latitude: v.location.lat,
            longitude: v.location.lng
          },
          center,
          1
        );
      }
    ]);

    await self.redis.setex(
      tmpCacheKey,
      `${cache_ttl_sec}`,
      Buffer.from(JSON.stringify(sortedResult)).toString("base64")
    );
    return sortedResult;
  } else {
    await self.redis.setex(
      tmpCacheKey,
      `${cache_ttl_sec}`,
      Buffer.from(JSON.stringify([])).toString("base64")
    );
    return [];
  }
}
