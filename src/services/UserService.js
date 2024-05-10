const fs = require("fs-extra");
const User = require("../models/UserModel");
const { genneralAccessToken, genneralRefreshToken } = require("./jwtService");
const bcrypt = require("bcrypt");

const createUser = (newUser, image) => {
  return new Promise(async (resolve, reject) => {
    const { name, idLuxas, email, password, phone, isAdmin } = newUser;
    try {
      const checkEmail = await User.findOne({ email: email });
      const checkIdLuxas = await User.findOne({ idLuxas: idLuxas });
      if (checkEmail != null) {
        resolve({
          status: "ERR",
          message: "The Email Is Already Exist",
        });
      } else if (checkIdLuxas != null) {
        resolve({
          status: "ERR",
          message: "The Id Luxas Is Already Exist",
        });
      } else {
        const hash = bcrypt.hashSync(password, 10);
        const createdUser = await User.create({
          name,
          idLuxas,
          email,
          password: hash,
          phone,
          image: image.originalname,
          isAdmin,
        });
        if (createdUser) {
          resolve({
            status: "OK",
            message: "CREATE USER SUCCESS",
            data: createdUser,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      const comparePassword = bcrypt.compareSync(password, checkUser.password);
      if (!comparePassword) {
        resolve({
          status: "ERR",
          message: "The password or user is incorrect",
        });
      }
      const access_token = await genneralAccessToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });

      const refresh_token = await genneralRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });
      resolve({
        status: "OK",
        message: "SUCCESS",
        access_token,
        refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const updateUser = (id, data, newFile) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({ _id: id });
      const comparePassword = bcrypt.compareSync(
        data.password,
        checkUser.password
      );
      const directoryPath = __basedir + "/uploads/avatar/";
      const avatar = checkUser.image;
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The User is not defined",
        });
      }
      if (!comparePassword) {
        resolve({
          status: "ERR",
          message: "The password is incorrect",
        });
      }
      if (data.password === data.newPassword) {
        resolve({
          status: "ERR",
          message: "The password must be different new password",
        });
      }
      if (newFile && avatar) {
        fs.unlink(directoryPath + avatar, async (err) => {
          if (err) {
            resolve({
              status: "ERR",
              message: "Could not update avatar",
            });
          }
        });
        data.image = newFile.originalname;
      }
      for (let key in data) {
        if (key === "password") {
          data[key] = data.newPassword;
          break;
        }
      }
      const remove = (object, removeList = []) => {
        const result = { ...object };
        removeList.forEach((item) => {
          delete result[item];
        });
        return result;
      };
      const newData = remove(data, ["newPassword"]);
      const hash = bcrypt.hashSync(newData.password, 10);
      newData.password = hash;
      const updateUser = await User.findOneAndUpdate(checkUser, newData, {
        new: true,
      });
      resolve({
        status: "OK",
        message: "UPDATE USER SUCCESS",
        data: updateUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({ _id: id });

      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The User is not defined",
        });
      }
      await User.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "DELETE USER SUCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getAllUser = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalUser = await User.find().count();
      if (filter) {
        const filterName = filter[0];
        const allObjectFilter = User.find({
          [filterName]: { $regex: filter[1] },
        })
          .limit(limit)
          .skip(limit * page);
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: allObjectFilter,
          totalUser: totalUser,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalUser / limit),
        });
      }
      if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        const allUserSort = await User.find()
          .limit(limit)
          .skip(limit * page)
          .sort({ objectSort });
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: allUserSort,
          totalUser: totalUser,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalUser / limit),
        });
      }
      const allUser = await User.find()
        .limit(limit)
        .skip(limit * page);
      resolve({
        status: "OK",
        message: "GET ALL USER SUCCESS",
        data: allUser,
        totalUser: totalUser,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalUser / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getDetailsUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const detailsUser = await User.findOne({ _id: id });
      if (detailsUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      resolve({
        status: "OK",
        message: "GET USER SUCCESS",
        data: detailsUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const refreshToken = async (req, res) => {
  try {
    let token = req.headers.token.split(" ")[1];
    if (!token) {
      return res.status(200).json({
        status: "ERR",
        message: "The token is required",
      });
    }
    const response = await JwtService.refreshTokenJwtService(token);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
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
};
