const express = require("express");
const router = express.Router();
const LimitProductController = require("../controllers/LimitProductController");

router.get("/get-all-limit-product", LimitProductController.getAllLimitProduct);

module.exports = router;
