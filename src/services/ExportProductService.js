const fs = require("fs-extra");
const ExportProduct = require("../models/ExportProductModal");
const File = require("../models/FileModal");
const createExportProduct = (newExportProduct, arrayFiles) => {
  return new Promise(async (resolve, reject) => {
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
      exportCode,
      price,
      amount,
      customerSevice,
      vat,
      shippingFee,
      commission,
      feesIncurred,
      costImportUnit,
      salePriceUnit,
      totalExportFee,
      exportFeeVat,
      profit,
      profitNoVat,
      note,
    } = newExportProduct;
    try {
      const document = arrayFiles.map((file) => {
        var arr = {
          documentFileName: file.originalname,
          size: file.size,
        };
        return arr;
      });
      if (document.length > 0) {
        for (let i = 0; i < document.length; i++) {
          const element = document[i];
          await File.create({
            fileName: element.documentFileName,
            size: element.size,
          });
        }
      }
      const newExportProduct = await ExportProduct.create({
        implementer,
        exportDate,
        luxasCode,
        image,
        partName,
        model,
        shCode,
        saleForCompany,
        quantity,
        unit,
        exportCode,
        price,
        amount,
        customerSevice,
        vat,
        shippingFee,
        commission,
        feesIncurred,
        costImportUnit,
        salePriceUnit,
        totalExportFee,
        exportFeeVat,
        profit,
        profitNoVat,
        note,
        document: document,
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
      const checkExportProduct = await ExportProduct.findOne({ _id: id });

      if (checkExportProduct === null) {
        resolve({
          status: "ERR",
          message: "The Export Product is not defined",
        });
      }
      const updateExportProduct = await ExportProduct.findByIdAndUpdate(
        { _id: id },
        { $set: data },
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

const deleteExportProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const directoryPath = __basedir + "/uploads/products/files/";
      const checkExportProduct = await ExportProduct.findOne({ _id: id });
      const document = checkExportProduct.document;
      if (checkExportProduct === null) {
        resolve({
          status: "ERR",
          message: "The Export Product is not defined",
        });
      }
      if (document.length > 0) {
        document.forEach((file) => {
          fs.unlink(directoryPath + file.documentFileName, async (err) => {
            if (err) {
              resolve({
                status: "ERR",
                message: "Could not delete file",
              });
            }
          });
        });
      }
      await ExportProduct.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "DELETE EXPORT PRODUCT SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getDetailsExportProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await ExportProduct.findOne({ _id: id });

      if (product === null) {
        resolve({
          status: "ERR",
          message: "The Product is not defined",
        });
      }
      resolve({
        status: "OK",
        message: "GET DETAILS PRODUCT SUCCESS",
        data: product,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getAllExportProduct = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await ExportProduct.find().count();
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
          totalProduct: totalProduct,
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
          totalProduct: totalProduct,
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
        totalProduct: totalProduct,
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
  deleteExportProduct,
  getAllExportProduct,
  getDetailsExportProduct,
};
