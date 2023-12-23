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
router.get(
  "/details-export-product/:id",
  ExportProductController.getDetailsExportProduct
);
router.delete(
  "/delete-export-product/:id",
  ExportProductController.deleteExportProduct
);

module.exports = router;
