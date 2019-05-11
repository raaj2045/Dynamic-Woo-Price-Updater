var WooCommerceAPI = require("woocommerce-api");

var WooCommerce = new WooCommerceAPI({
  url: "http://mmjewellers.in",
  consumerKey: "ck_af926fabe4c32e58a5732648caaf8c29c7844c73",
  consumerSecret: "cs_c28d38ff1da042992bf3192774dc9d02bb18c4a9",
  wpAPI: true,
  version: "wc/v3"
});

const fs = require("fs");
var data = {
  update: null
};
let rawdata = fs.readFileSync("products.json");
let products = JSON.parse(rawdata);

data["update"] = products;

WooCommerce.post("products/batch", data, function(err, data, res) {
  if (err) {
    console.log(err);
  } else {
    console.log("Products successfully updated!");
  }
});
