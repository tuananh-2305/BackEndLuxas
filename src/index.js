const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

global.__basedir = __dirname;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(__dirname));
routes(app);
mongoose
  .connect(`${process.env.MONGO_DB}`)
  .then(() => {
    console.log("Connect DB Succesfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
