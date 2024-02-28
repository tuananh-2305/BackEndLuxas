const UserRouter = require("./UserRouter");
const ProductRouter = require("./ProductRouter");
const ExportProductRouter = require("./ExportProductRouter");
const LimitProductRouter = require("./LimitProductRouter");
const FileRouter = require("./FileRouter");

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/product", ProductRouter);
  app.use("/api/export-product", ExportProductRouter);
  app.use("/api/limit-product", LimitProductRouter);
  app.use("/api/file", FileRouter);
};

module.exports = routes;
