const router = require("express").Router();
const axios = require('axios')

require("dotenv").config();




router.get("/data", async (req, res) => {

    let data = await axios.get('https://scripts.wigs.com/shiphero/warehouse-transfer/warehouses.php').
  catch(err => err);
  console.log(data.data.warehouses)
res.json(data.data.warehouses)
});

router.get("/products", async (req, res) => {

    let data = await axios.get('https://scripts.wigs.com/shopify/products/product-data/skus-and-barcodes-wigoutlet.com.json').
  catch(err => err);
  console.log(data.data)
res.json(data.data)
});


module.exports = router;


