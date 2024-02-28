const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const typeFile = file.mimetype.split("/")[0];
    if (typeFile === "image") {
      callback(null, path.join(__dirname, "../uploads/images/products"));
    } else {
      callback(null, path.join(__dirname, "../uploads/files"));
    }
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/create-product", upload.any(), ProductController.createProduct);
router.put("/update-product/:id", ProductController.updateProduct);
router.delete("/delete-product/:id", ProductController.deleteProduct);
router.get("/details-product/:id", ProductController.getDetailsProduct);
router.get(
  "/details-product-by-code/:luxasCode",
  ProductController.getDetailsProductByCode
);
router.get("/get-all-product", ProductController.getAllProduct);

module.exports = router;
