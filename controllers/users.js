const {
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_CREATED,
} = require('node:http2').constants;
const createError = require('http-errors');
const userModel = require('../models/user');
const asyncHandler = require('../middlewares/asyncHandler');

const getUsers = asyncHandler(async (req, res) => {
  const users = await userModel.find({});
  res.send(users);
});

const getUserById = asyncHandler(async (req, res, next) => {
  const user = await userModel
    .findById(req.params.userId)
    .orFail(() => next(createError(HTTP_STATUS_NOT_FOUND, 'Пользователь не найден')));
  res.send(user);
});

const createUser = asyncHandler(async (req, res) => {
  const createdUser = await userModel.create(req.body);
  res.status(HTTP_STATUS_CREATED).send(createdUser);
});

const updateUserModule = async (userId, data) => {
  const user = await userModel.findByIdAndUpdate(
    userId,
    { $set: data },
    { new: true, runValidators: true },
  );
  return user;
};

const updateProfile = asyncHandler(async (req, res) => {
  const { name, about } = req.body;
  const user = await updateUserModule(req.user._id, { name, about });
  res.send(user);
});

const updateAvatar = asyncHandler(async (req, res) => {
  const { avatar } = req.body;
  const user = await updateUserModule(req.user._id, { avatar });
  res.send(user);
});

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
