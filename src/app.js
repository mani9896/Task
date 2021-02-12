// Node app basic setup
const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const rp = require("request-promise"); // library for hhtp request with promise support

app.use(express.static("public")); // set static files folder

app.set("view engine", "ejs"); // set template

app.use(express.json()); //to get data from unit test cases
app.use(bodyParser.urlencoded({ extended: true })); //get data in req.body

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json({ extended: false }));

const URL = "https://api.wazirx.com/api/v2/tickers";

const options = {
  uri: URL,
  json: true, // Automatically parses the JSON string in the response
};

app.get("/", async (req, res) => {
  // intialise empty array
  // to send filtered response
  var currency_data = [];
  rp(options)
    .then(function (api_response) {
      for (const key in api_response) {
        var response_obj_value = api_response[key];

        // push api response in array
        var filtered_response = {
          name: response_obj_value.name,
          last: response_obj_value.last,
          buy: response_obj_value.buy,
          sell: response_obj_value.sell,
          volume: response_obj_value.volume,
          base_unit: response_obj_value.base_unit,
        };
        currency_data.push(filtered_response);

        //   get only top 10 items
        if (currency_data.length >= 10) break;
      }
      console.log("API call successful response sent");

      res.render("index", { currency_data: currency_data });
    })
    .catch(function (err) {
      res.send("API CALL Failed");
    });
});

module.exports = app;
