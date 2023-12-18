const ExportProduct = require("../models/ExportProductService");
const createExportProduct = (newExportProduct) => {
  console.log(newExportProduct);
  return new Promise(async (resolve, reject) => {
    const {
      implementer,
      luxasCode,
      image,
      saleForCompany,
      quality,
      unit,
      price,
      amount,
      customerSevice,
      vat,
      shippingFee,
      commission,
      feesIncurred,
      profit,
      note,
    } = newExportProduct;

    try {
      const checkProduct = await ExportProduct.findOne({
        luxasCode: luxasCode,
      });
      if (checkProduct != null) {
        resolve({
          status: "ERR",
          message: "The LuxasCode Of Product Is Already Exist",
        });
      }
      const newExportProduct = await ExportProduct.create({
        implementer,
        luxasCode,
        image,
        saleForCompany,
        quality,
        unit,
        price,
        amount,
        customerSevice,
        vat,
        shippingFee,
        commission,
        feesIncurred,
        profit,
        note,
      });
      if (newExportProduct) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: newExportProduct,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateExportProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await ExportProduct.findOne({ _id: id });

      if (checkProduct === null) {
        resolve({
          status: "ERR",
          message: "The Export Product is not defined",
        });
      }

      const updateExportProduct = await ExportProduct.findByIdAndUpdate(
        id,
        data,
        {
          new: true,
        }
      );
      resolve({
        status: "OK",
        message: "UPDATE EXPORT PRODUCT SUCCESS",
        data: updateExportProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getAllExportProduct = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = ExportProduct.length;
      if (filter) {
        const filterName = filter[0];
        const allObjectFilter = await ExportProduct.find({
          [filterName]: { $regex: filter[1] },
        })
          .limit(limit)
          .skip(limit * page);
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: allObjectFilter,
          total: totalProduct,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalProduct / limit),
        });
      }
      if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        const allProductSort = await ExportProduct.find()
          .limit(limit)
          .skip(limit * page)
          .sort({ objectSort });
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: allProductSort,
          total: totalProduct,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalProduct / limit),
        });
      }
      const allProduct = await ExportProduct.find()
        .limit(limit)
        .skip(limit * page);
      resolve({
        status: "OK",
        message: "Success",
        data: allProduct,
        total: totalProduct,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalProduct / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createExportProduct,
  updateExportProduct,
  getAllExportProduct,
};
