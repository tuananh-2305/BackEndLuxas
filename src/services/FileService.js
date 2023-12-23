const File = require("../models/FileModal");
const uploadFile = (files) => {
  return new Promise(async (resolve, reject) => {
    const { filename, size } = files;
    try {
      const createFile = await File.create({ fileName: filename, size });
      if (createFile) {
        resolve({
          status: "OK",
          message: "UPLOAD FILE SUCCESS",
          data: createFile,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const getAllFile = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allFile = await File.find({});
      resolve({
        status: "OK",
        message: "GET ALL FILE SUCCESS",
        data: allFile,
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  uploadFile,
  getAllFile,
};
