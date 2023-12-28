const ExportProduct = require("../models/ExportProductModal");
const Product = require("../models/ProductModel");
const createExportProduct = (newExportProduct) => {
  return new Promise(async (resolve, reject) => {
    const {
      implementer,
      luxasCode,
      image,
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
      profit,
      note,
    } = newExportProduct;
    try {
      const newExportProduct = await ExportProduct.create({
        implementer,
        luxasCode,
        image,
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
      const checkExportProduct = await ExportProduct.findOne({ _id: id });

      const checkProduct = await Product.findOne({
        luxasCode: checkExportProduct.luxasCode,
      });
      const idProduct = checkProduct._id.toString();
      const quantityUpdate = data.quantity;
      const quantityExport = checkExportProduct.quantity;
      const quantityProduct = checkProduct.quantity;
      if (checkProduct === null) {
        resolve({
          status: "ERR",
          message: "The Export Product is not defined",
        });
      }
      if (quantityUpdate <= quantityExport) {
        await Product.findByIdAndUpdate(
          idProduct,
          {
            quantity:
              Number(quantityProduct) + Number(quantityExport - quantityUpdate),
          },
          {
            new: true,
          }
        );
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
      } else if (quantityUpdate > quantityExport) {
        await Product.findByIdAndUpdate(
          idProduct,
          {
            quantity:
              Number(quantityProduct) - Number(quantityUpdate - quantityExport),
          },
          {
            new: true,
          }
        );
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
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteExportProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkExportProduct = await ExportProduct.findOne({ _id: id });

      if (checkExportProduct === null) {
        resolve({
          status: "ERR",
          message: "The Product is not defined",
        });
      } else {
        const checkProduct = await Product.findOne({
          luxasCode: checkExportProduct.luxasCode,
        });

        const filter = { luxasCode: checkProduct.luxasCode };

        await Product.findOneAndUpdate(
          filter,
          {
            quantity: Number(
              checkProduct.quantity + checkExportProduct.quantity
            ),
          },
          {
            new: true,
          }
        );
        await ExportProduct.findByIdAndDelete(id);
        resolve({
          status: "OK",
          message: "DELETE EXPORT PRODUCT SUCCESS",
        });
      }
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
  deleteExportProduct,
  getAllExportProduct,
  getDetailsExportProduct,
};
