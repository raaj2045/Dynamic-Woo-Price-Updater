var WooCommerceAPI = require("woocommerce-api");
var fs = require("fs");

var WooCommerce = new WooCommerceAPI({
  url: "http://mmjewellers.in",
  consumerKey: "ck_af926fabe4c32e58a5732648caaf8c29c7844c73",
  consumerSecret: "cs_c28d38ff1da042992bf3192774dc9d02bb18c4a9",
  wpAPI: true,
  version: "wc/v3"
});

WooCommerce.get("products?per_page=100", async function(err, data, res) {
  var products = await JSON.parse(res);
  var length = await products.length;
  console.log(length);
  for (const productId in products) {
    if (products.hasOwnProperty(productId)) {
      const product = products[productId];
      metadata = product.meta_data;
      let purity, making_charges, weight, value_addition;
      metadata.forEach(meta => {
        switch (meta.key) {
          case "purity":
            purity = meta.value;
            break;
          case "making_charges":
            making_charges = meta.value;
            break;
          case "weight":
            weight = meta.value;
            break;
          case "value_addition":
            value_addition = meta.value;
            break;
          default:
            break;
        }
      });

      /*-------------------------------------------------------//
      //--------------- FORMULA FOR PRICE UPDATE---------------//
      //-------------------------------------------------------*/

      var gold_price = 3000;

      var updated_weight = weight * (value_addition / 100);
      var initial_price = updated_weight * gold_price;
      var final_making_charges = weight * making_charges;
      var subtotal = initial_price + final_making_charges;
      var gst = subtotal * (3 / 100);

      var price = subtotal + gst;

      product.regular_price = price.toFixed(2);
      product.sale_price = price.toFixed(2);
    }
  }

  fs.writeFile("products.json", JSON.stringify(products), "utf8", err => {
    if (err) console.log(err);
  });
});
