const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleWare = (req, res, next) => {
  const token = req.headers.token?.split(" ")[1];
  if (token) {
    return jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
      if (err) {
        return res.status(404).json({
          message: "Authentication",
          status: "ERROR",
        });
      }
      if (user?.isAdmin) {
        next();
      } else {
        return res.status(404).json({
          message: "The authentication",
          status: "ERROR",
        });
      }
    });
  }
};
const authUserMiddleWare = (req, res, next) => {
  const token = req.headers.token?.split(" ")[1];
  const userId = req.params.id;
  if (token) {
    return jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
      if (err) {
        return res.status(404).json({
          message: "Authentication",
          status: "ERROR",
        });
      }
      if (user?.isAdmin || user?.id === userId) {
        next();
      } else {
        return res.status(404).json({
          message: "The authentication",
          status: "ERROR",
        });
      }
    });
  }
};
module.exports = {
  authMiddleWare,
  authUserMiddleWare,
};
