const ProductService = require("../services/ProductService");
const createProduct = async (req, res) => {
  const arrayFiles = req.files;
  const imageFile = arrayFiles.find((file) => file.fieldname === "image");
  const documentFiles = arrayFiles.filter(
    (file) => file.fieldname === "documentFile"
  );
  try {
    const {
      importDate,
      importNo_VatNo,
      luxasCode,
      status,
      partName,
      model,
      supplies,
      suppliesAddress,
      maker,
      shCode,
      quantity,
      limitSetting,
      unit,
      price,
      amount,
      size,
      importTax,
      vatImport,
      feeShipping,
      costomsService,
      fines,
      costImportTax,
      productFee,
      totalFee,
      description,
      stockLocal,
      note,
    } = req.body;
    if (
      !importDate ||
      !importNo_VatNo ||
      !luxasCode ||
      !status ||
      !partName ||
      !model ||
      !supplies ||
      !suppliesAddress ||
      !maker ||
      !shCode ||
      !quantity ||
      !limitSetting ||
      !unit ||
      !price ||
      !amount ||
      !size ||
      !importTax ||
      !vatImport ||
      !feeShipping ||
      !costomsService ||
      !costImportTax ||
      !productFee ||
      !totalFee ||
      !description ||
      !stockLocal
    ) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    } else if (!imageFile) {
      return res.status(200).json({
        status: "ERR",
        message: "The avatar is required",
      });
    } else if (documentFiles.length === 0) {
      return res.status(200).json({
        status: "ERR",
        message: "The document is required",
      });
    }

    const response = await ProductService.createProduct(
      req.body,
      imageFile,
      documentFiles
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    ////const [productDetails, setProductDetails] = useState(initial());
    const dataProduct = req.body.productDetails;
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The ProductId is required",
      });
    }
    const response = await ProductService.updateProduct(productId, dataProduct);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The ProductId is required",
      });
    }
    const response = await ProductService.deleteProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};

const getDetailsProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The ProductId is required",
      });
    }
    const response = await ProductService.getDetailsProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};

const getDetailsProductByCode = async (req, res) => {
  try {
    const productCode = req.params.luxasCode;

    if (!productCode) {
      return res.status(200).json({
        status: "ERR",
        message: "The ProductId is required",
      });
    }
    const response = await ProductService.getDetailsProductByCode(productCode);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await ProductService.getAllProduct(
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
  createProduct,
  updateProduct,
  deleteProduct,
  getDetailsProduct,
  getDetailsProductByCode,
  getAllProduct,
};
