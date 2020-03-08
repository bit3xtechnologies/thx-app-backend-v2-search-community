const https = require("https");

import Axios from "axios";

export function get_http_client() {
  const http_client = Axios.create({
    baseURL: "https://api.foursquare.com/v2/venues/search",
    httpsAgent: new https.Agent({ keepAlive: true }),
    maxContentLength: 666666
  });

  return http_client;
}
