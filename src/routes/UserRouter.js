const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const {
  authMiddleWare,
  authUserMiddleWare,
} = require("../middleware/authMiddleware");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, "../uploads/images/avatar"));
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/register", upload.single("image"), UserController.createUser);
router.post("/login", UserController.loginUser);
router.post("/log-out", UserController.logoutUser);
router.put("/update-user/:id", authMiddleWare, UserController.updateUser);
router.delete("/delete-user/:id", authMiddleWare, UserController.deleteUser);
router.get("/get-all-user", authMiddleWare, UserController.getAllUser);
router.get(
  "/get-details-user/:id",
  authUserMiddleWare,
  UserController.getDetailsUser
);
router.post("/refresh-token", UserController.refreshToken);

module.exports = router;
