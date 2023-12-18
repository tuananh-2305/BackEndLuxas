const express = require("express");
const router = express.Router();
const ExportProductController = require("../controllers/ExportProductController");

router.post(
  "/create-export-product",
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

module.exports = router;
