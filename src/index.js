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

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(__dirname));
routes(app);

// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "/uploads/images"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// console.log(upload.single("image"));

// app.post("/upload-image", upload.single("image"), async (req, res) => {
//   const file = req.file;
//   const imageName = req.file.filename;

//   try {
//     await Images.create({ image: imageName });
//     res.json({ status: "ok" });
//   } catch (error) {
//     res.json({ status: error });
//   }
// });

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
