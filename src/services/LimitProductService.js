const Product = require("../models/ProductModel");
const getAllLimitProduct = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const allProduct = await Product.find();
      const limitProduct = allProduct.filter((product) => {
        return product.quantity <= product.limitSetting;
      });
      const totalProduct = limitProduct.length;
      if (filter) {
        const filterName = filter[0];
        const filterValue = filter[1];
        const allObjectFilter = limitProduct.filter(
          (product) => product[filterName] === filterValue
        );
        // .limit(limit)
        // .skip(limit * page);
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
        const allProductSort = limitProduct
          .find()
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
      resolve({
        status: "OK",
        message: "GET ALL LIMIT PRODUCT SUCCESS",
        data: limitProduct,
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
  getAllLimitProduct,
};
