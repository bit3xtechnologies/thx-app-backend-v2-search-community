import Bottleneck from "bottleneck";

import { get_location_cache_model } from "./models/location_cache";

import { get_http_client } from "./utils/http_client";

import { get_redis } from "./utils/redis";

import { connect_db } from "./utils/db";

export async function CommunitySearch(
  foursquare_client_id,
  foursquare_client_secret,
  postgres_db_config,
  redis_config
) {
  try {
    const self = this;

    self.limiter = new Bottleneck({
      maxConcurrent: 15,
      minTime: 67
    });

    self.default_param = {
      client_id: foursquare_client_id,
      client_secret: foursquare_client_secret,
      limit: 50,
      v: 20200307
    };

    self.http_client = get_http_client();

    self.redis = get_redis(redis_config);

    self.db = await connect_db(postgres_db_config);

    self.location_cache_model = await get_location_cache_model(
      self.db,
      postgres_db_config.schema
    );

    self.get_places_in_map_view_without_keywords = async function(
      south_west_coordinate_latitude,
      south_west_coordinate_longitude,
      north_east_coordinate_latitude,
      north_east_coordinate_longitude
    ) {};

    self.get_places_in_hugearea_with_keywords = async function(
      keyword,
      center_coordinate_latitude,
      center_coordinate_longitude
    ) {
      const additional_param = {};
    };

    return self;
  } catch (error) {
    throw error;
  }
}
