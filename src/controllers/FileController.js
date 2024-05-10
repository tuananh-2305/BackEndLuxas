const FileService = require("../services/FileService");
const uploadFile = async (req, res, next) => {
  let arrayFiles = req.files;
  try {
    if (arrayFiles.length > 0) {
      for (let i = 0; i < arrayFiles.length; i++) {
        const newFile = arrayFiles[i];
        var response = await FileService.uploadFile(newFile);
      }
      return res.status(200).json(response);
    }
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};

const getDetailsFile = async (req, res, next) => {
  try {
    const idFile = req.params.id;
    if (!idFile) {
      return res.status(200).json({
        status: "ERR",
        message: "The idFile is required",
      });
    }
    const response = await FileService.getDetailsFile(idFile);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};

const getAllFile = async (req, res, next) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await FileService.getAllFile(
      Number(limit) || null,
      Number(page) || 0,
      sort || "",
      filter || ""
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};
const deleteFile = async (req, res, next) => {
  try {
    const fileId = req.params.id;
    if (!fileId) {
      return res.status(200).json({
        status: "ERR",
        message: "The fileName is required",
      });
    }
    const response = await FileService.deleteFile(fileId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};

module.exports = {
  uploadFile,
  getDetailsFile,
  getAllFile,
  deleteFile,
};
