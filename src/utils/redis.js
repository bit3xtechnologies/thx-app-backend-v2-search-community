const Redis = require("ioredis");

let redis = null;

export function get_redis(port, host, key_prefix, db_num, password) {
  if (redis !== null) {
    return redis;
  }

  redis = new Redis(port, host, {
    keyPrefix: key_prefix,
    db: db_num,
    password: password || ""
  });

  return redis;
}
