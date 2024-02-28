const LimitProductService = require("../services/LimitProductService");
const getAllLimitProduct = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await LimitProductService.getAllLimitProduct(
      Number(limit) || null,
      Number(page) || 0,
      sort || "",
      filter || ""
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  getAllLimitProduct,
};
