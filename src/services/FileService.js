const fs = require("fs-extra");
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

const getDetailsFile = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const file = await File.findOne({ _id: id });

      if (file === null) {
        resolve({
          status: "ERR",
          message: "The File is not defined",
        });
      }
      resolve({
        status: "OK",
        message: "GET DETAILS FILE SUCCESS",
        data: file,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteFile = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const directoryPath = __basedir + "/uploads/files/";
      const checkFile = await File.findOne({ _id: id });
      if (checkFile === null) {
        resolve({
          status: "ERR",
          message: "The File is not defined",
        });
      }
      const fileName = checkFile.fileName;
      if (fs.existsSync(directoryPath + fileName)) {
        fs.unlink(directoryPath + fileName, async (err) => {
          if (err) {
            resolve({
              status: "OK",
              message: "Could not delete file",
            });
          }
        });
      }
      await File.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "DELETE FILE SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllFile = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalFile = await File.find().count();
      if (filter) {
        const filterName = filter[0];
        const allObjectFilter = await File.find({
          [filterName]: { $regex: filter[1] },
        })
          .limit(limit)
          .skip(limit * page);
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: allObjectFilter,
          totalFile: totalFile,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalFile / limit),
        });
      }
      if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        const allFileSort = await File.find()
          .limit(limit)
          .skip(limit * page)
          .sort({ objectSort });
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: allFileSort,
          totalFile: totalFile,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalFile / limit),
        });
      }
      const allFile = await File.find()
        .limit(limit)
        .skip(limit * page);
      resolve({
        status: "OK",
        message: "GET ALL FILE SUCCESS",
        data: allFile,
        totalFile: totalFile,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalFile / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  uploadFile,
  getDetailsFile,
  getAllFile,
  deleteFile,
};
