const fs = require("fs-extra");
const Product = require("../models/ProductModel");
const File = require("../models/FileModal");
const createProduct = (newProduct, imageFile, documentFiles) => {
  return new Promise(async (resolve, reject) => {
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
      costImportUnit,
      costImportTax,
      totalFeeVat,
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
      } else {
        const document = documentFiles.map((file) => {
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
              typeFile: "Import",
              fileCode: importNo_VatNo,
              fileName: element.documentFileName,
              size: element.size,
            });
          }
        }
        const newProduct = await Product.create({
          image: imageFile.originalname,
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
          costImportUnit,
          costImportTax,
          totalFeeVat,
          description,
          stockLocal,
          note,
          document: document,
        });

        if (newProduct) {
          resolve({
            status: "OK",
            message: "SUCCESS",
            data: newProduct,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
const updateProduct = (id, data, imageFile) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findById({ _id: id });
      const directoryPath = __basedir + "/uploads/products/images/";
      const productImage = checkProduct.image;
      if (checkProduct === null) {
        resolve({
          status: "ERR",
          message: "The Product is not defined",
        });
      }
      if (imageFile && productImage) {
        fs.unlink(directoryPath + productImage, async (err) => {
          if (err) {
            resolve({
              status: "ERR",
              message: "Could not update image",
            });
          }
        });
        data.image = imageFile.originalname;
      }
      const updateProduct = await Product.findByIdAndUpdate(
        { _id: id },
        { $set: data },
        {
          new: true,
        }
      );
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
      const directoryPath = __basedir + "/uploads/products/files/";
      const pathImage = __basedir + "/uploads/products/images/";
      const document = checkProduct.document;
      if (checkProduct === null) {
        resolve({
          status: "ERR",
          message: "The Product is not defined",
        });
      }
      if (fs.existsSync(pathImage + checkProduct.image)) {
        fs.unlink(pathImage + checkProduct.image, async (err) => {
          if (err) {
            resolve({
              status: "ERR",
              message: "Could not delete image",
            });
          }
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

const getDetailsProductByCode = (productCode) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({ luxasCode: productCode });
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

const getAllProduct = (limit, page, sort, filter, startDate, endDate) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await Product.find().count();
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
          totalProduct: totalProduct,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalProduct / limit),
        });
      }
      if (startDate || endDate) {
        const allProductDate = await Product.find({
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        })
          .limit(limit)
          .skip(limit * page);
        console.log(allProductDate);
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: allProductDate,
          totalProduct: totalProduct,
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
          totalProduct: totalProduct,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalProduct / limit),
        });
      }
      const allProduct = await Product.find()
        .limit(limit)
        .skip(limit * page);
      resolve({
        status: "OK",
        message: "GET ALL PRODUCT SUCCESS",
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
  createProduct,
  updateProduct,
  deleteProduct,
  getDetailsProduct,
  getDetailsProductByCode,
  getAllProduct,
};
