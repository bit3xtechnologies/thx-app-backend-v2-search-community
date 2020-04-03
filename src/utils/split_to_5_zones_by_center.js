import { getBoundsOfDistance, getCenter } from "geolib";

const default_n_in_n_km_x_n_km = 199.99;

export function split_to_5_zones_by_center(
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

  const [point_e, point_d] = getBoundsOfDistance(
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
  const point_h = getCenter([point_c, point_e]);
  const point_i = getCenter([point_c, point_d]);

  return [
    { sw: point_a, ne: point_b },
    { sw: point_c, ne: point_d },
    { sw: point_e, ne: point_c },
    { sw: point_f, ne: point_g },
    { sw: point_h, ne: point_i },
  ];
}
