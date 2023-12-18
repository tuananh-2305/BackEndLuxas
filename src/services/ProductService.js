const Product = require("../models/ProductModel");
const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const {
      image,
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
      quality,
      unit,
      price,
      amount,
      size,
      importTax,
      vatImport,
      feeShipping,
      costomsService,
      fines,
      totalFee,
      description,
      stockLocal,
      note,
    } = newProduct;

    try {
      const checkProduct = await Product.findOne({ luxasCode: luxasCode });
      if (checkProduct != null) {
        resolve({
          status: "ERR",
          message: "The LuxasCode Of Product Is Already Exist",
        });
      }
      const newProduct = await Product.create({
        image,
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
        quality,
        unit,
        price,
        amount,
        size,
        importTax,
        vatImport,
        feeShipping,
        costomsService,
        fines,
        totalFee,
        description,
        stockLocal,
        note,
      });
      if (newProduct) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: newProduct,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const updateProduct = (id, data) => {
  // console.log(id, data);
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({ _id: id });

      if (checkProduct === null) {
        resolve({
          status: "ERR",
          message: "The Product is not defined",
        });
      }
      checkProduct.supplies = data.supplies;
      const updateProduct = await Product.findByIdAndUpdate(
        checkProduct,
        {
          $set: data,
        },
        { new: true }
      );
      console.log(updateProduct.supplies);
      resolve({
        status: "OK",
        message: "UPDATE PRODUCT SUCCESS",
        data: updateProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({ _id: id });

      if (checkProduct === null) {
        resolve({
          status: "ERR",
          message: "The Product is not defined",
        });
      }
      await Product.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "DELETE PRODUCT SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getDetailsProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({ _id: id });

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

const getAllProduct = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = Product.length;
      if (filter) {
        const filterName = filter[0];
        const allObjectFilter = await Product.find({
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
        const allProductSort = await Product.find()
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
      const allProduct = await Product.find()
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
  createProduct,
  updateProduct,
  deleteProduct,
  getDetailsProduct,
  getAllProduct,
};
