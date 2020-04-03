(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("bottleneck"), require("lodash"), require("geolib"), require("axios"), require("ioredis"));
	else if(typeof define === 'function' && define.amd)
		define(["bottleneck", "lodash", "geolib", "axios", "ioredis"], factory);
	else if(typeof exports === 'object')
		exports["CommunitySearch"] = factory(require("bottleneck"), require("lodash"), require("geolib"), require("axios"), require("ioredis"));
	else
		root["CommunitySearch"] = factory(root["bottleneck"], root["lodash"], root["geolib"], root["axios"], root["ioredis"]);
})(global, function(__WEBPACK_EXTERNAL_MODULE__2__, __WEBPACK_EXTERNAL_MODULE__3__, __WEBPACK_EXTERNAL_MODULE__4__, __WEBPACK_EXTERNAL_MODULE__7__, __WEBPACK_EXTERNAL_MODULE__9__) {
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
/* harmony import */ var _utils_http_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _utils_redis__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
/* harmony import */ var _utils_common_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);
/* harmony import */ var _utils_split_to_5_zones_by_center__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11);














function CommunitySearch(
  foursquare_client_id,
  foursquare_client_secret,
  redis_config
) {
  const self = this;

  try {
    self.limiter = new bottleneck__WEBPACK_IMPORTED_MODULE_0___default.a({
      maxConcurrent: 30,
      minTime: 30,
    });

    self.default_param = {
      client_id: foursquare_client_id,
      client_secret: foursquare_client_secret,
      limit: 50,
      v: 20200307,
    };

    self.http_client = Object(_utils_http_client__WEBPACK_IMPORTED_MODULE_3__["get_http_client"])();

    self.redis = Object(_utils_redis__WEBPACK_IMPORTED_MODULE_4__["get_redis"])(redis_config);

    self.any_to_fixed_float = function (f, n) {
      return parseFloat(parseFloat(f).toFixed(n));
    };

    self.fetch_rectangle_results_from_api = _utils_common_components__WEBPACK_IMPORTED_MODULE_5__["fetch_rectangle_results_from_api"];

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
          ? ""
          : keyword
      ).toString("base64");

      const converted_lang = Buffer.from(
        lang === undefined || lang === null || lang === "" ? "en" : lang
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
          Object(geolib__WEBPACK_IMPORTED_MODULE_2__["getDistance"])(
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

        const result = await self.fetch_rectangle_results_from_api(
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
        if (error.response) {
          throw error.response.data;
        } else {
          throw error;
        }
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
        const zs = Object(_utils_split_to_5_zones_by_center__WEBPACK_IMPORTED_MODULE_6__["split_to_5_zones_by_center"])(
          center_coordinate_latitude,
          center_coordinate_longitude
        );

        const tmpResults = await Promise.all(
          zs.map((z) =>
            self.fetch_rectangle_results_from_api(
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
          r.distance = Object(geolib__WEBPACK_IMPORTED_MODULE_2__["getDistance"])(
            {
              latitude: r.location.lat,
              longitude: r.location.lng,
            },
            r.center,
            1
          );
          r.distance_to_center = r.distance;
        });

        const result = Object(lodash__WEBPACK_IMPORTED_MODULE_1__["sortBy"])(Object(lodash__WEBPACK_IMPORTED_MODULE_1__["uniqBy"])(flatten_tmp_result, "id"), [
          "distance_to_center",
        ]);

        return result;
      } catch (error) {
        if (error.response) {
          throw error.response.data;
        } else {
          throw error;
        }
      }
    };

    return self;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw error;
    }
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_http_client", function() { return get_http_client; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
const https = __webpack_require__(6);



function get_http_client() {
  const http_client = axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({
    url: "https://api.foursquare.com/v2/venues/search",
    method: "get",
    httpsAgent: new https.Agent({ keepAlive: true }),
    maxContentLength: 666666,
  });

  return http_client;
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__7__;

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_redis", function() { return get_redis; });
const Redis = __webpack_require__(9);

function get_redis({ port, host, key_prefix, db_num, password }) {
  const redis = new Redis(port, host, {
    keyPrefix: key_prefix,
    db: db_num,
    password: password || "",
  });

  return redis;
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__9__;

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetch_rectangle_results_from_api", function() { return fetch_rectangle_results_from_api; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "api_call_intent", function() { return api_call_intent; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var geolib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var geolib__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(geolib__WEBPACK_IMPORTED_MODULE_1__);




const cache_ttl_sec = 259200;

async function fetch_rectangle_results_from_api(
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

  data.response.venues = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["uniqBy"])(
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
    const center = Object(geolib__WEBPACK_IMPORTED_MODULE_1__["getCenter"])([
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
      r.distance = Object(geolib__WEBPACK_IMPORTED_MODULE_1__["getDistance"])(
        {
          latitude: r.location.lat,
          longitude: r.location.lng,
        },
        r.center,
        1
      );
      r.distance_to_center = r.distance;
    });

    const sortedResult = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["sortBy"])(data.response.venues, ["distance_to_center"]);

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
    const tmpCenter = Object(geolib__WEBPACK_IMPORTED_MODULE_1__["getCenter"])([
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


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "split_to_5_zones_by_center", function() { return split_to_5_zones_by_center; });
/* harmony import */ var geolib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var geolib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(geolib__WEBPACK_IMPORTED_MODULE_0__);


const default_n_in_n_km_x_n_km = 199.99;

function split_to_5_zones_by_center(
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
  //   |         |    i    | 0.5n
  //   |         |         |
  //   a---------c---------g
  //   |         |         |
  //   |    h    |         | 0.5n
  //   |         |         |
  //   e---------f---------|

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
    longitude: point_e.longitude,
  };
  const point_b = {
    latitude: point_d.latitude,
    longitude: longitude.toFixed(6),
  };
  const point_c = {
    latitude: latitude.toFixed(6),
    longitude: longitude.toFixed(6),
  };
  const point_f = {
    latitude: point_e.latitude,
    longitude: longitude.toFixed(6),
  };
  const point_g = {
    latitude: latitude.toFixed(6),
    longitude: point_d.longitude,
  };
  const point_h = Object(geolib__WEBPACK_IMPORTED_MODULE_0__["getCenter"])([point_c, point_e]);
  const point_i = Object(geolib__WEBPACK_IMPORTED_MODULE_0__["getCenter"])([point_c, point_d]);

  return [
    { sw: point_a, ne: point_b },
    { sw: point_c, ne: point_d },
    { sw: point_e, ne: point_c },
    { sw: point_f, ne: point_g },
    { sw: point_h, ne: point_i },
  ];
}


/***/ })
/******/ ]);
});