const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.enable("trust proxy");
require("dotenv").config();
const port = process.env.PORT || 5000;
const path = require("path");





app.use(express.static(path.join(__dirname, "client/build")));

app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build"));
  });
}
app.use(cors());

const sale = require("./routes/route");
app.use("/", sale);


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

