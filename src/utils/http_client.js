const https = require("https");

import Axios from "axios";

export function get_http_client() {
  const http_client = Axios.create({
    url: "https://api.foursquare.com/v2/venues/search",
    method: "get",
    httpsAgent: new https.Agent({ keepAlive: true }),
    maxContentLength: 666666,
  });

  return http_client;
}
