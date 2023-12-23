const FileService = require("../services/FileService");
const uploadFile = async (req, res, next) => {
  let arrayFiles = req.files;
  try {
    if (arrayFiles.length > 0) {
      for (let i = 0; i < arrayFiles.length; i++) {
        const newFile = arrayFiles[i];
        var response = await FileService.uploadFile(newFile);
      }
      return res.status(404).json(response);
    }
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};

const getAllFile = async (req, res, next) => {
  try {
    const response = await FileService.getAllFile();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};

module.exports = {
  uploadFile,
  getAllFile,
};
