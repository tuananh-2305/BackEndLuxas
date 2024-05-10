const UserService = require("../services/UserService");
const jwtService = require("../services/jwtService");

const createUser = async (req, res) => {
  try {
    const { name, isAdmin, idLuxas, email, password, phone } = req.body;
    const image = req.file;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const ischeckEmail = reg.test(email);
    if (!name || !isAdmin || !idLuxas || !email || !password || !phone) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required.",
      });
    } else if (!image) {
      return res.status(200).json({
        status: "ERR",
        message: "The image is required",
      });
    } else if (!ischeckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "The email is incorrect",
      });
    }
    const response = await UserService.createUser(req.body, image);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const ischeckEmail = reg.test(email);
    if (!email || !password) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required.",
      });
    } else if (!ischeckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "The email is incorrect",
      });
    }
    const response = await UserService.loginUser(req.body);
    const { refresh_token, ...newResponse } = response;
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: false,
      samesite: "strict",
    });
    return res.status(200).json(newResponse);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const dataUser = req.body;
    const newFile = req.file;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The UserId is required",
      });
    }
    const response = await UserService.updateUser(userId, dataUser, newFile);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The UserId is required",
      });
    }
    const response = await UserService.deleteUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};

const getAllUser = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await UserService.getAllUser(
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

const getDetailsUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The UserId is required",
      });
    }
    const response = await UserService.getDetailsUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refresh_token;
    if (!token) {
      return res.status(200).json({
        status: "ERR",
        message: "The token is required",
      });
    }
    const response = await jwtService.refreshTokenJwtService(token);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({
      status: "OK",
      message: "Logout Successfully",
    });
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailsUser,
  refreshToken,
  logoutUser,
};
