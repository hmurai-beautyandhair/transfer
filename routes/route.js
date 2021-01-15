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


router.get("/max/:str", async (req, res) => {

axios.post('https://scripts.wigs.com/shiphero/shiphero_data/get-stock-quantities.php', {
    query: req.params.str,
  })
  .then((response) => {
    console.log(response.data);
    res.json(response.data)
  }, (error) => {
    console.log(error);
  });
});

router.post("/transfer", async (req, res) => {

    axios.post('https://scripts.wigs.com/shiphero/warehouse-transfer/process.php', req.body)
      .then((response) => {
          if(response.data) {
     

      console.log('Response',response.data.results);
      
        res.json(response.data.results)
          }
          else {
            res.status(409).send('Server error')
            console.log('Error', response)
          }
      }, (error) => {
        console.log('EEEEEEEEEEEEEEEE', error);
        res.json(error.data)
      });
    });

module.exports = router;


