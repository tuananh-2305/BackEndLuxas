const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

router.post("/create-product", ProductController.createProduct);
router.put("/update-product/:id", ProductController.updateProduct);
router.delete("/delete-product/:id", ProductController.deleteProduct);
router.get("/details-product/:id", ProductController.getDetailsProduct);
router.get("/get-all-product", ProductController.getAllProduct);

module.exports = router;
