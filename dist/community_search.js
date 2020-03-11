(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("bottleneck"), require("lodash"), require("geolib"), require("sequelize"), require("axios"), require("ioredis"));
	else if(typeof define === 'function' && define.amd)
		define(["bottleneck", "lodash", "geolib", "sequelize", "axios", "ioredis"], factory);
	else if(typeof exports === 'object')
		exports["CommunitySearch"] = factory(require("bottleneck"), require("lodash"), require("geolib"), require("sequelize"), require("axios"), require("ioredis"));
	else
		root["CommunitySearch"] = factory(root["bottleneck"], root["lodash"], root["geolib"], root["sequelize"], root["axios"], root["ioredis"]);
})(global, function(__WEBPACK_EXTERNAL_MODULE__2__, __WEBPACK_EXTERNAL_MODULE__3__, __WEBPACK_EXTERNAL_MODULE__4__, __WEBPACK_EXTERNAL_MODULE__6__, __WEBPACK_EXTERNAL_MODULE__9__, __WEBPACK_EXTERNAL_MODULE__11__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1).default;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CommunitySearch; });
/* harmony import */ var bottleneck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var bottleneck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bottleneck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var geolib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var geolib__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(geolib__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _models_location_cache__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _utils_http_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var _utils_redis__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);
/* harmony import */ var _utils_db__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(12);
/* harmony import */ var _utils_common_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(13);
/* harmony import */ var _utils_split_to_4_zones_by_center__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(14);


















function CommunitySearch(
  foursquare_client_id,
  foursquare_client_secret,
  postgres_db_config,
  redis_config
) {
  const self = this;

  try {
    self.postgres_db_config = postgres_db_config;

    self.limiter = new bottleneck__WEBPACK_IMPORTED_MODULE_0___default.a({
      maxConcurrent: 15,
      minTime: 67
    });

    self.default_param = {
      client_id: foursquare_client_id,
      client_secret: foursquare_client_secret,
      limit: 50,
      v: 20200307
    };

    self.http_client = Object(_utils_http_client__WEBPACK_IMPORTED_MODULE_4__["get_http_client"])();

    self.redis = Object(_utils_redis__WEBPACK_IMPORTED_MODULE_5__["get_redis"])(redis_config);

    self.db = null;

    self.location_cache_model = null;

    self.db_and_table_loaded = new Promise(async (res, rej) => {
      try {
        self.db = await Object(_utils_db__WEBPACK_IMPORTED_MODULE_6__["connect_db"])(self.postgres_db_config);

        self.location_cache_model = await Object(_models_location_cache__WEBPACK_IMPORTED_MODULE_3__["get_location_cache_model"])(
          self.db,
          self.postgres_db_config.schema
        );

        setInterval(async () => {
          try {
            await Object(_utils_common_components__WEBPACK_IMPORTED_MODULE_7__["clean_cache_in_db"])(self);
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

    self.any_to_fixed_float = function(f, n) {
      return parseFloat(parseFloat(f).toFixed(n));
    };

    self.merge_rectangle_results_from_db_and_api = _utils_common_components__WEBPACK_IMPORTED_MODULE_7__["merge_rectangle_results_from_db_and_api"];

    self.get_cache_key = function(
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

    self.get_places_in_map_view = async function(
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
          Object(geolib__WEBPACK_IMPORTED_MODULE_2__["getDistance"])(
            {
              latitude: south_west_coordinate_latitude,
              longitude: south_west_coordinate_longitude
            },
            {
              latitude: north_east_coordinate_latitude,
              longitude: north_east_coordinate_longitude
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

    self.get_places_in_hugearea_with_keyword = async function(
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
        const zs = Object(_utils_split_to_4_zones_by_center__WEBPACK_IMPORTED_MODULE_8__["split_to_4_zones_by_center"])(
          center_coordinate_latitude,
          center_coordinate_longitude
        );

        const tmpResults = await Promise.all(
          zs.map(z =>
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
        tmpResults.forEach(r => {
          r.forEach(v => {
            flatten_tmp_result.push(v);
          });
        });

        flatten_tmp_result.forEach(r => {
          r.center = {
            latitude: center_coordinate_latitude,
            longitude: center_coordinate_longitude
          };
          r.distance = Object(geolib__WEBPACK_IMPORTED_MODULE_2__["getDistance"])(
            {
              latitude: r.location.lat,
              longitude: r.location.lng
            },
            r.center,
            1
          );
          r.distance_to_center = r.distance;
        });

        const result = Object(lodash__WEBPACK_IMPORTED_MODULE_1__["sortBy"])(Object(lodash__WEBPACK_IMPORTED_MODULE_1__["uniqBy"])(flatten_tmp_result, "id"), [
          "distance_to_center"
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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__4__;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_location_cache_model", function() { return get_location_cache_model; });
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_0__);


async function get_location_cache_model(db, schema) {
  const LocationCache = db.define(
    "LocationCache",
    {
      cache_id: {
        type: sequelize__WEBPACK_IMPORTED_MODULE_0__["DataTypes"].INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
      },
      location_id: {
        type: sequelize__WEBPACK_IMPORTED_MODULE_0__["DataTypes"].STRING,
        allowNull: false
      },
      name: { type: sequelize__WEBPACK_IMPORTED_MODULE_0__["DataTypes"].TEXT, allowNull: false },
      keyword_str: { type: sequelize__WEBPACK_IMPORTED_MODULE_0__["DataTypes"].STRING, allowNull: false },
      latitude_num: { type: sequelize__WEBPACK_IMPORTED_MODULE_0__["DataTypes"].DOUBLE, allowNull: false },
      longitude_num: { type: sequelize__WEBPACK_IMPORTED_MODULE_0__["DataTypes"].DOUBLE, allowNull: false },
      latitude_raw_str: { type: sequelize__WEBPACK_IMPORTED_MODULE_0__["DataTypes"].TEXT, allowNull: false },
      longitude_raw_str: { type: sequelize__WEBPACK_IMPORTED_MODULE_0__["DataTypes"].TEXT, allowNull: false },
      raw_content: { type: sequelize__WEBPACK_IMPORTED_MODULE_0__["DataTypes"].JSON, allowNull: false },
      should_be_deleted_when: {
        type: sequelize__WEBPACK_IMPORTED_MODULE_0__["DataTypes"].DATE,
        allowNull: false
      }
    },
    {
      freezeTableName: true,
      tableName: "location_cache",
      modelName: "LocationCache",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
      deletedAt: false,
      underscored: true,
      sequelize: db,
      schema,
      indexes: [
        {
          fields: ["keyword_str"]
        },
        {
          using: "BTREE",
          fields: [{ attribute: "should_be_deleted_when", order: "ASC" }]
        },
        {
          using: "HASH",
          fields: ["location_id"]
        },
        {
          name: "lat_asc",
          using: "BTREE",
          fields: [{ attribute: "latitude_num", order: "ASC" }]
        },
        {
          name: "long_asc",
          using: "BTREE",
          fields: [{ attribute: "longitude_num", order: "ASC" }]
        },
        {
          name: "lat_desc",
          using: "BTREE",
          fields: [{ attribute: "latitude_num", order: "DESC" }]
        },
        {
          name: "long_desc",
          using: "BTREE",
          fields: [{ attribute: "longitude_num", order: "DESC" }]
        },
        {
          name: "cache_id_desc_idx_x",
          using: "BTREE",
          fields: [{ attribute: "cache_id", order: "DESC" }]
        },
        {
          name: "cache_id_asc_idx_x",
          using: "BTREE",
          fields: [{ attribute: "cache_id", order: "ASC" }]
        },
        {
          name: "should_be_deleted_when_asc",
          using: "BTREE",
          fields: [{ attribute: "should_be_deleted_when", order: "ASC" }]
        }
      ]
    }
  );

  if (process.env.DB_SYNC_FORCE === "true") {
    await LocationCache.sync({ force: true });
  } else {
    await LocationCache.sync({ force: false });
  }

  return LocationCache;
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__6__;

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_http_client", function() { return get_http_client; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
const https = __webpack_require__(8);



function get_http_client() {
  const http_client = axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({
    url: "https://api.foursquare.com/v2/venues/search",
    method: "get",
    httpsAgent: new https.Agent({ keepAlive: true }),
    maxContentLength: 666666
  });

  return http_client;
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__9__;

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_redis", function() { return get_redis; });
const Redis = __webpack_require__(11);

function get_redis({ port, host, key_prefix, db_num, password }) {
  const redis = new Redis(port, host, {
    keyPrefix: key_prefix,
    db: db_num,
    password: password || ""
  });

  return redis;
}


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__11__;

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "connect_db", function() { return connect_db; });
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_0__);


async function connect_db({
  host,
  port,
  username,
  password,
  schema,
  database,
  logging,
  logger
}) {
  try {
    const db_config = {
      host,
      port,
      username,
      password,
      database,
      dialect: "postgres",
      native: false,
      logging:
        logging === true
          ? (...args) => {
              if (logger !== undefined) {
                logger.info(args[0], "#Sequelize logging");
              } else {
                console.info(args[0], "#Sequelize logging");
              }
            }
          : false,
      pool: {
        max: 4,
        min: 2,
        idle: 3000,
        acquire: 12000
      },
      isolationLevel: sequelize__WEBPACK_IMPORTED_MODULE_0__["Transaction"].ISOLATION_LEVELS.READ_COMMITTED
    };

    const _db = new sequelize__WEBPACK_IMPORTED_MODULE_0__["Sequelize"](db_config);

    await _db.authenticate();

    if (logger !== undefined) {
      logger.info("#DB connection has been established successfully.");
    } else {
      console.info("#DB connection has been established successfully.");
    }

    await _db.createSchema(schema);

    return _db;
  } catch (error) {
    if (logger !== undefined) {
      logger.error(error, "#Unable to connect to the database:");
    } else {
      console.error(error, "#Unable to connect to the database:");
    }

    throw error;
  }
}


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "merge_rectangle_results_from_db_and_api", function() { return merge_rectangle_results_from_db_and_api; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "api_call_intent", function() { return api_call_intent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clean_cache_in_db", function() { return clean_cache_in_db; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var geolib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var geolib__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(geolib__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_2__);






const cache_ttl_sec = 86400;

async function merge_rectangle_results_from_db_and_api(
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
    )
  ]);

  const data = { response: { venues: [] } };

  data.response.venues = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["uniqBy"])(
    [...data_browse.response.venues, ...data_checkin.response.venues],
    "id"
  ).filter(v => {
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

  const tmpModelFindAllConfig = {
    where: {
      [sequelize__WEBPACK_IMPORTED_MODULE_2__["Op"].and]: [
        {
          latitude_num: {
            [sequelize__WEBPACK_IMPORTED_MODULE_2__["Op"].gte]: self.any_to_fixed_float(south_west_coordinate_latitude, 6)
          }
        },
        {
          latitude_num: {
            [sequelize__WEBPACK_IMPORTED_MODULE_2__["Op"].lte]: self.any_to_fixed_float(north_east_coordinate_latitude, 6)
          }
        },
        {
          longitude_num: {
            [sequelize__WEBPACK_IMPORTED_MODULE_2__["Op"].gte]: self.any_to_fixed_float(
              south_west_coordinate_longitude,
              6
            )
          }
        },
        {
          longitude_num: {
            [sequelize__WEBPACK_IMPORTED_MODULE_2__["Op"].lte]: self.any_to_fixed_float(
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
    const tmpSplitted = keyword.split(/[\s\+]/).filter(c => c.length > 0);

    if (tmpSplitted.length > 0) {
      tmpModelFindAllConfig.where[sequelize__WEBPACK_IMPORTED_MODULE_2__["Op"].and].push({
        keyword_str: { [sequelize__WEBPACK_IMPORTED_MODULE_2__["Op"].iLike]: `%${tmpSplitted.join("%")}%` }
      });
    } else {
      tmpModelFindAllConfig.where[sequelize__WEBPACK_IMPORTED_MODULE_2__["Op"].and].push({
        keyword_str: { [sequelize__WEBPACK_IMPORTED_MODULE_2__["Op"].iLike]: `%${keyword}%` }
      });
    }
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
          raw_content: Object(lodash__WEBPACK_IMPORTED_MODULE_0__["cloneDeep"])(v),
          should_be_deleted_when: Date.now() + cache_ttl_sec * 1000
        };
      });

    await self.location_cache_model.bulkCreate(ready_to_be_written_in_db, {
      logging: false
    });

    const tmpResult = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["uniqBy"])(
      [
        ...ready_to_be_written_in_db.map(v => v.raw_content),
        ...Object.keys(tmpDBMap).map(k => tmpDBMap[k])
      ],
      "id"
    );

    const center = Object(geolib__WEBPACK_IMPORTED_MODULE_1__["getCenter"])([
      {
        latitude: south_west_coordinate_latitude,
        longitude: south_west_coordinate_longitude
      },
      {
        latitude: north_east_coordinate_latitude,
        longitude: north_east_coordinate_longitude
      }
    ]);

    tmpResult.forEach(r => {
      r.center = center;
      r.distance = Object(geolib__WEBPACK_IMPORTED_MODULE_1__["getDistance"])(
        {
          latitude: r.location.lat,
          longitude: r.location.lng
        },
        r.center,
        1
      );
      r.distance_to_center = r.distance;
    });

    const sortedResult = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["sortBy"])(tmpResult, ["distance_to_center"]);

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

async function api_call_intent(
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
        lang === undefined || lang === "" || lang === null ? "en" : lang
    },
    params: {
      ...self.default_param,
      intent,
      query:
        keyword === undefined || keyword === "" || keyword === null
          ? undefined
          : keyword
    }
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
    const tmpCenter = Object(geolib__WEBPACK_IMPORTED_MODULE_1__["getCenter"])([
      {
        latitude: south_west_coordinate_latitude,
        longitude: south_west_coordinate_longitude
      },
      {
        latitude: north_east_coordinate_latitude,
        longitude: north_east_coordinate_longitude
      }
    ]);
    tmpAxiosConfig.params.ll = `${tmpCenter.latitude},${tmpCenter.longitude}`;
  }

  const { data } = await self.limiter.schedule(() =>
    self.http_client.request(tmpAxiosConfig)
  );

  // if (data && data.response && data.response.venues) {
  // console.log("API", data.response.venues, tmpAxiosConfig);
  // }

  return data;
}

async function clean_cache_in_db(self) {
  return await self.location_cache_model.destroy({
    where: {
      should_be_deleted_when: {
        [sequelize__WEBPACK_IMPORTED_MODULE_2__["Op"].lte]: Date.now()
      }
    }
  });
}


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "split_to_4_zones_by_center", function() { return split_to_4_zones_by_center; });
/* harmony import */ var geolib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var geolib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(geolib__WEBPACK_IMPORTED_MODULE_0__);


const default_n_in_n_km_x_n_km = 199.99;

function split_to_4_zones_by_center(
  latitude,
  longitude,
  n_in_n_km_x_n_km
) {
  const n =
    n_in_n_km_x_n_km === undefined
      ? default_n_in_n_km_x_n_km
      : n_in_n_km_x_n_km;

  //   n is in km
  //
  //       0.5n      0.5n
  //   |---------b---------d
  //   |         |         |
  //   |         |         | 0.5n
  //   |         |         |
  //   a---------c---------g
  //   |         |         |
  //   |         |         | 0.5n
  //   |         |         |
  //   e---------f---------|

  // for the stars
  const [point_e, point_d] = Object(geolib__WEBPACK_IMPORTED_MODULE_0__["getBoundsOfDistance"])(
    { latitude, longitude },
    n * 500
  ); //  * 1000m * 0.5

  point_e.latitude = point_e.latitude.toFixed(6);
  point_e.longitude = point_e.longitude.toFixed(6);
  point_d.latitude = point_d.latitude.toFixed(6);
  point_d.longitude = point_d.longitude.toFixed(6);

  const point_a = {
    latitude: latitude.toFixed(6),
    longitude: point_e.longitude
  };
  const point_b = {
    latitude: point_d.latitude,
    longitude: longitude.toFixed(6)
  };
  const point_c = {
    latitude: latitude.toFixed(6),
    longitude: longitude.toFixed(6)
  };
  const point_f = {
    latitude: point_e.latitude,
    longitude: longitude.toFixed(6)
  };
  const point_g = {
    latitude: latitude.toFixed(6),
    longitude: point_d.longitude
  };

  return [
    { sw: point_a, ne: point_b },
    { sw: point_c, ne: point_d },
    { sw: point_e, ne: point_c },
    { sw: point_f, ne: point_g }
  ];
}


/***/ })
/******/ ]);
});