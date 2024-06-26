const ExportProductService = require("../services/ExportProductService");
const createExportProduct = async (req, res) => {
  const arrayFiles = req.files;
  try {
    const {
      implementer,
      luxasCode,
      image,
      exportDate,
      partName,
      model,
      shCode,
      saleForCompany,
      quantity,
      unit,
      price,
      amount,
      customerSevice,
      vat,
      shippingFee,
      commission,
      feesIncurred,
      costImportUnit,
      exportCode,
      salePriceUnit,
      totalExportFee,
      exportFeeVat,
      profit,
      profitNoVat,
      note,
    } = req.body;
    if (
      !implementer ||
      !luxasCode ||
      !image ||
      !exportDate ||
      !partName ||
      !model ||
      !shCode ||
      !saleForCompany ||
      !quantity ||
      !unit ||
      !exportCode ||
      !price ||
      !amount ||
      !customerSevice ||
      !vat ||
      !shippingFee ||
      !commission ||
      !feesIncurred ||
      !costImportUnit ||
      !salePriceUnit ||
      !totalExportFee ||
      !exportFeeVat ||
      !profit ||
      !profitNoVat
    ) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const response = await ExportProductService.createExportProduct(
      req.body,
      arrayFiles
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};
const updateExportProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const dataProduct = req.body;
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The ProductId is required",
      });
    }
    const response = await ExportProductService.updateExportProduct(
      productId,
      dataProduct
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};
const deleteExportProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The ProductId is required",
      });
    }
    const response = await ExportProductService.deleteExportProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};

const getDetailsExportProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The ProductId is required",
      });
    }
    const response = await ExportProductService.getDetailsExportProduct(
      productId
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};

const getAllExportProduct = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await ExportProductService.getAllExportProduct(
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
  createExportProduct,
  updateExportProduct,
  getAllExportProduct,
  deleteExportProduct,
  getDetailsExportProduct,
};
