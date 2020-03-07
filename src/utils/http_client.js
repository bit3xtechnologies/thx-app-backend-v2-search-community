const https = require("https");

import Axios from "axios";

let http_client = null;

export let default_param = {};

export function get_http_client(
  foursquare_client_id,
  foursquare_client_secret
) {
  default_param = {
    client_id: foursquare_client_id,
    client_secret: foursquare_client_secret,
    limit: 50,
    v: 20200307
  };

  if (http_client !== null) {
    return http_client;
  }

  http_client = Axios.create({
    baseURL: "https://api.foursquare.com/v2/venues/search",
    httpsAgent: new https.Agent({ keepAlive: true }),
    maxContentLength: 666666
  });

  return http_client;
}
