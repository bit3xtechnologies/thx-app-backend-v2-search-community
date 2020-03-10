# README

### Install

```sh
npm  install @bit3x/search-community
# or
yarn add     @bit3x/search-community
```

### Usage

```javascript
const CommunitySearch = require("@bit3x/search-community");

const foursquare_client_id = "CLIENT_ID";

const foursquare_client_secret = "CLIENT_SECRET";

const postgres_db_config = {
  host: "HOST",
  port: "5432",
  username: "USER",
  password: "PASSWORD",
  database: "DB",
  schema: "SCHEMA",
  logging: true // OR false
  // logger: pino // for customised logger
};

const redis_config = {
  port: 6379,
  host: "HOST",
  key_prefix: "foo_bar:",
  db_num: 1,
  password: "PASSWORD" // OR "" for empty password
};

const cs = new CommunitySearch(
  foursquare_client_id,
  foursquare_client_secret,
  postgres_db_config,
  redis_config
);

// wait for a while, wait for the db and redis loading
async function f() {
  try {
    // if empty keyword, set ""
    // lang can be "en", "es", "ja" or any locale code at https://developer.foursquare.com/docs/api/configuration/internationalization
    const places_in_map_view = await cs.get_places_in_map_view(
      south_west_coordinate_latitude,
      south_west_coordinate_longitude,
      north_east_coordinate_latitude,
      north_east_coordinate_longitude,
      keyword,
      lang
    );

    // if empty keyword, set ""
    // lang can be "en", "es", "ja" or any locale code at https://developer.foursquare.com/docs/api/configuration/internationalization
    const places_in_large_area_search = await cs.get_places_in_hugearea_with_keyword(
      center_coordinate_latitude,
      center_coordinate_longitude,
      keyword,
      lang
    );

    // the result of these 2 functions will be the array (can be empty array) of :
    const each_item = {
      id: "5a1e564289e4900ae20f809f",
      name: "Finolab",
      location: {
        address: "大手町1-6-1",
        crossStreet: "大手町ビルヂング 4F",
        lat: 35.68597939729372,
        lng: 139.76588023566188,
        labeledLatLngs: [
          { label: "display", lat: 35.68597939729372, lng: 139.76588023566188 }
        ],
        postalCode: "100-0004",
        cc: "JP",
        neighborhood: "千代田区",
        city: "Tokyo",
        state: "Tokyo",
        country: "Japan",
        formattedAddress: [
          "大手町1-6-1 (大手町ビルヂング 4F)",
          "Chiyoda, Tokyo",
          "100-0004",
          "Japan"
        ]
      },
      categories: [
        {
          id: "4bf58dd8d48988d174941735",
          name: "Coworking Space",
          pluralName: "Coworking Spaces",
          shortName: "Coworking Space",
          icon: {
            prefix:
              "https://ss3.4sqi.net/img/categories_v2/building/office_coworkingspace_",
            suffix: ".png"
          },
          primary: true
        }
      ],
      referralId: "v-1583674926",
      hasPerk: false
    };
  } catch (err) {
    console.error(err);
  }
}
```
