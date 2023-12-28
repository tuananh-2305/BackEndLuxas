const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

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
  "/create-product",
  upload.single("image"),
  ProductController.createProduct
);
router.put("/update-product/:id", ProductController.updateProduct);
router.delete("/delete-product/:id", ProductController.deleteProduct);
router.get("/details-product/:id", ProductController.getDetailsProduct);
router.get("/get-all-product", ProductController.getAllProduct);
router.get("/get-all-limit-product", ProductController.getAllLimitProduct);

module.exports = router;
