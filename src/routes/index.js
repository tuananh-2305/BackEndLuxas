const UserRouter = require("./UserRouter");
const ProductRouter = require("./ProductRouter");
const ExportProductRouter = require("./ExportProductRouter");

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/product", ProductRouter);
  app.use("/api/export-product", ExportProductRouter);
};

module.exports = routes;
