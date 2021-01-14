const router = require("express").Router();
const axios = require('axios')

require("dotenv").config();




router.get("/data", async (req, res) => {

    let data = await axios.get('https://scripts.wigs.com/shiphero/warehouse-transfer/warehouses.php').
  catch(err => err);
  console.log(data.data.warehouses)
res.json(data.data.warehouses)
});




module.exports = router;


