import { cloneDeep, sortBy, uniqBy } from "lodash";

import { getCenter, getDistance } from "geolib";

const cache_ttl_sec = 259200;

export async function fetch_rectangle_results_from_api(
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

  const [data_browse, data_checkin] = await Promise.all([
    api_call_intent(
      "browse",
      south_west_coordinate_latitude,
      south_west_coordinate_longitude,
      north_east_coordinate_latitude,
      north_east_coordinate_longitude,
      keyword,
      lang,
      self
    ),
    api_call_intent(
      "checkin",
      south_west_coordinate_latitude,
      south_west_coordinate_longitude,
      north_east_coordinate_latitude,
      north_east_coordinate_longitude,
      keyword,
      lang,
      self
    ),
  ]);

  const data = { response: { venues: [] } };

  data.response.venues = uniqBy(
    [...data_browse.response.venues, ...data_checkin.response.venues],
    "id"
  ).filter((v) => {
    if (
      self.any_to_fixed_float(v.location.lat, 3) >=
        self.any_to_fixed_float(south_west_coordinate_latitude, 3) - 0.001 &&
      self.any_to_fixed_float(v.location.lng, 3) >=
        self.any_to_fixed_float(south_west_coordinate_longitude, 3) - 0.001 &&
      self.any_to_fixed_float(v.location.lat, 3) <=
        self.any_to_fixed_float(north_east_coordinate_latitude, 3) + 0.001 &&
      self.any_to_fixed_float(v.location.lng, 3) <=
        self.any_to_fixed_float(north_east_coordinate_longitude, 3) + 0.001
    ) {
      return true;
    } else {
      return false;
    }
  });

  if (
    data &&
    data.response &&
    data.response.venues &&
    data.response.venues.length > 0
  ) {
    const center = getCenter([
      {
        latitude: south_west_coordinate_latitude,
        longitude: south_west_coordinate_longitude,
      },
      {
        latitude: north_east_coordinate_latitude,
        longitude: north_east_coordinate_longitude,
      },
    ]);

    data.response.venues.forEach((r) => {
      r.center = center;
      r.distance = getDistance(
        {
          latitude: r.location.lat,
          longitude: r.location.lng,
        },
        r.center,
        1
      );
      r.distance_to_center = r.distance;
    });

    const sortedResult = sortBy(data.response.venues, ["distance_to_center"]);

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

export async function api_call_intent(
  intent,
  south_west_coordinate_latitude,
  south_west_coordinate_longitude,
  north_east_coordinate_latitude,
  north_east_coordinate_longitude,
  keyword,
  lang,
  self
) {
  const tmpAxiosConfig = {
    headers: {
      "Accept-Language":
        lang === undefined || lang === "" || lang === null ? "en" : lang,
    },
    params: {
      ...self.default_param,
      intent,
      query:
        keyword === undefined || keyword === "" || keyword === null
          ? undefined
          : keyword,
    },
  };

  if (intent === "browse") {
    tmpAxiosConfig.params.sw = `${self.any_to_fixed_float(
      south_west_coordinate_latitude,
      6
    )},${self.any_to_fixed_float(south_west_coordinate_longitude, 6)}`;

    tmpAxiosConfig.params.ne = `${self.any_to_fixed_float(
      north_east_coordinate_latitude,
      6
    )},${self.any_to_fixed_float(north_east_coordinate_longitude, 6)}`;
  }

  if (intent === "checkin") {
    const tmpCenter = getCenter([
      {
        latitude: south_west_coordinate_latitude,
        longitude: south_west_coordinate_longitude,
      },
      {
        latitude: north_east_coordinate_latitude,
        longitude: north_east_coordinate_longitude,
      },
    ]);
    tmpAxiosConfig.params.ll = `${tmpCenter.latitude},${tmpCenter.longitude}`;
  }

  const { data } = await self.limiter.schedule(() =>
    self.http_client.request(tmpAxiosConfig)
  );

  return data;
}
