import axios from "axios";
let baseURL;

process.env.NODE_ENV === "production"
  ? (baseURL = "https://sale-bdh.herokuapp.com")
  : (baseURL = "http://localhost:5000");

console.log(process.env, baseURL);

const service = axios.create({ baseURL});

const actions = {
  data: async () => {
    return await service.get("/data");
  },
  products: async () => {
    return await service.get("/products");
  },
//   addSale: async sale => {
//     return await service.post("/sale/add", sale);
//   },
 

  
};

export default actions;
