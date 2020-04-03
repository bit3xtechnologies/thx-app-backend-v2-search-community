import Bottleneck from "bottleneck";

import { sortBy, uniqBy } from "lodash";

import { getDistance } from "geolib";

import { get_location_cache_model } from "./models/location_cache";

import { get_http_client } from "./utils/http_client";

import { get_redis } from "./utils/redis";

import { connect_db } from "./utils/db";

import {
  merge_rectangle_results_from_db_and_api,
  clean_cache_in_db,
} from "./utils/common_components";

import { split_to_4_zones_by_center } from "./utils/split_to_4_zones_by_center";

export default function CommunitySearch(
  foursquare_client_id,
  foursquare_client_secret,
  postgres_db_config,
  redis_config
) {
  const self = this;

  try {
    self.postgres_db_config = postgres_db_config;

    self.limiter = new Bottleneck({
      maxConcurrent: 15,
      minTime: 67,
    });

    self.default_param = {
      client_id: foursquare_client_id,
      client_secret: foursquare_client_secret,
      limit: 50,
      v: 20200307,
    };

    self.http_client = get_http_client();

    self.redis = get_redis(redis_config);

    self.db = null;

    self.location_cache_model = null;

    self.db_and_table_loaded = new Promise(async (res, rej) => {
      try {
        self.db = await connect_db(self.postgres_db_config);

        self.location_cache_model = await get_location_cache_model(
          self.db,
          self.postgres_db_config.schema
        );

        setInterval(async () => {
          try {
            await clean_cache_in_db(self);
          } catch (err) {
            if (self.postgres_db_config.logger !== undefined) {
              if (error.response) {
                self.postgres_db_config.logger.error(error.response.data);
              } else {
                self.postgres_db_config.logger.error(error);
              }
            } else {
              if (error.response) {
                console.error(error.response.data);
              } else {
                console.error(error);
              }
            }
          }
        }, 60000);

        res(true);
      } catch (err) {
        rej(err);
      }
    });

    self.any_to_fixed_float = function (f, n) {
      return parseFloat(parseFloat(f).toFixed(n));
    };

    self.merge_rectangle_results_from_db_and_api = merge_rectangle_results_from_db_and_api;

    self.get_cache_key = function (
      south_west_coordinate_latitude,
      south_west_coordinate_longitude,
      north_east_coordinate_latitude,
      north_east_coordinate_longitude,
      keyword,
      lang
    ) {
      const converted_keyword = Buffer.from(
        keyword === undefined || keyword === null || keyword === ""
          ? "0"
          : keyword
      ).toString("base64");

      const converted_lang = Buffer.from(
        lang === undefined || lang === null || lang === "" ? "0" : lang
      ).toString("base64");

      return `${self.any_to_fixed_float(
        south_west_coordinate_latitude,
        4
      )}:${self.any_to_fixed_float(
        south_west_coordinate_longitude,
        4
      )}:${self.any_to_fixed_float(
        north_east_coordinate_latitude,
        4
      )}:${self.any_to_fixed_float(
        north_east_coordinate_longitude,
        4
      )}:${converted_keyword}:${converted_lang}`;
    };

    self.get_places_in_map_view = async function (
      _south_west_coordinate_latitude,
      _south_west_coordinate_longitude,
      _north_east_coordinate_latitude,
      _north_east_coordinate_longitude,
      keyword,
      lang
    ) {
      const south_west_coordinate_latitude = parseFloat(
        _south_west_coordinate_latitude
      );
      const south_west_coordinate_longitude = parseFloat(
        _south_west_coordinate_longitude
      );
      const north_east_coordinate_latitude = parseFloat(
        _north_east_coordinate_latitude
      );
      const north_east_coordinate_longitude = parseFloat(
        _north_east_coordinate_longitude
      );

      try {
        if (
          getDistance(
            {
              latitude: south_west_coordinate_latitude,
              longitude: south_west_coordinate_longitude,
            },
            {
              latitude: north_east_coordinate_latitude,
              longitude: north_east_coordinate_longitude,
            }
          ) >= 141409 // (100km*100km+100km*100km)^(1/2) meter
        ) {
          throw { message: "too large, max is 100km x 100km" };
        }

        const result = await self.merge_rectangle_results_from_db_and_api(
          south_west_coordinate_latitude,
          south_west_coordinate_longitude,
          north_east_coordinate_latitude,
          north_east_coordinate_longitude,
          keyword,
          lang,
          self
        );

        return result;
      } catch (error) {
        if (self.postgres_db_config.logger !== undefined) {
          if (error.response) {
            self.postgres_db_config.logger.error(error.response.data);
          } else {
            self.postgres_db_config.logger.error(error);
          }
        } else {
          if (error.response) {
            console.error(error.response.data);
          } else {
            console.error(error);
          }
        }
        throw error;
      }
    };

    self.get_places_in_hugearea_with_keyword = async function (
      _center_coordinate_latitude,
      _center_coordinate_longitude,
      keyword,
      lang
    ) {
      const center_coordinate_latitude = parseFloat(
        _center_coordinate_latitude
      );
      const center_coordinate_longitude = parseFloat(
        _center_coordinate_longitude
      );

      try {
        const zs = split_to_4_zones_by_center(
          center_coordinate_latitude,
          center_coordinate_longitude
        );

        const tmpResults = await Promise.all(
          zs.map((z) =>
            self.merge_rectangle_results_from_db_and_api(
              z.sw.latitude,
              z.sw.longitude,
              z.ne.latitude,
              z.ne.longitude,
              keyword,
              lang,
              self
            )
          )
        );

        const flatten_tmp_result = [];
        tmpResults.forEach((r) => {
          r.forEach((v) => {
            flatten_tmp_result.push(v);
          });
        });

        flatten_tmp_result.forEach((r) => {
          r.center = {
            latitude: center_coordinate_latitude,
            longitude: center_coordinate_longitude,
          };
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

        const result = sortBy(uniqBy(flatten_tmp_result, "id"), [
          "distance_to_center",
        ]);

        return result;
      } catch (error) {
        if (self.postgres_db_config.logger !== undefined) {
          if (error.response) {
            self.postgres_db_config.logger.error(error.response.data);
          } else {
            self.postgres_db_config.logger.error(error);
          }
        } else {
          if (error.response) {
            console.error(error.response.data);
          } else {
            console.error(error);
          }
        }
        throw error;
      }
    };

    return self;
  } catch (error) {
    if (self.postgres_db_config.logger !== undefined) {
      if (error.response) {
        self.postgres_db_config.logger.error(error.response.data);
      } else {
        self.postgres_db_config.logger.error(error);
      }
    } else {
      if (error.response) {
        console.error(error.response.data);
      } else {
        console.error(error);
      }
    }
    throw error;
  }
}
