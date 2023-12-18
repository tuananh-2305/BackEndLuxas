const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const {
  authMiddleWare,
  authUserMiddleWare,
} = require("../middleware/authMiddleware");

// app.post("/upload-image", upload.single("image"), async (req, res) => {
//   const imageName = req.file.filename;
//   console.log(imageName);

//   try {
//     await Images.create({ image: imageName });
//     res.json({ status: "ok" });
//   } catch (error) {
//     res.json({ status: error });
//   }
// });

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/log-out", userController.logoutUser);
router.put("/update-user/:id", authMiddleWare, userController.updateUser);
router.delete("/delete-user/:id", authMiddleWare, userController.deleteUser);
router.get("/get-all-user", authMiddleWare, userController.getAllUser);
router.get(
  "/get-details-user/:id",
  authUserMiddleWare,
  userController.getDetailsUser
);
router.post("/refresh-token", userController.refreshToken);

module.exports = router;
