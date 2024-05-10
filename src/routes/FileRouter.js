const express = require("express");
const router = express.Router();
const FileController = require("../controllers/FileController");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, "../uploads/files"));
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.array("files"), FileController.uploadFile);
router.get("/details-file/:id", FileController.getDetailsFile);
router.get("/get-all-file", FileController.getAllFile);
router.delete("/delete-file/:id", FileController.deleteFile);

module.exports = router;
