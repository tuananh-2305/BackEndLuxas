const express = require("express");
const router = express.Router();
const ExportProductController = require("../controllers/ExportProductController");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, "../uploads/images/products"));
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/create-export-product",
  upload.any(),
  ExportProductController.createExportProduct
);
router.put(
  "/update-export-product/:id",
  ExportProductController.updateExportProduct
);
router.get(
  "/get-all-export-product",
  ExportProductController.getAllExportProduct
);
router.get(
  "/details-export-product/:id",
  ExportProductController.getDetailsExportProduct
);
router.delete(
  "/delete-export-product/:id",
  ExportProductController.deleteExportProduct
);

module.exports = router;
