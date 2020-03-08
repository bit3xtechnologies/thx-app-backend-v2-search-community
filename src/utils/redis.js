const Redis = require("ioredis");

export function get_redis({ port, host, key_prefix, db_num, password }) {
  const redis = new Redis(port, host, {
    keyPrefix: key_prefix,
    db: db_num,
    password: password || ""
  });

  return redis;
}
