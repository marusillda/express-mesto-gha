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
    .orFail(() => next(createError(404, 'Пользователь не найден')));
  res.send(user);
});

const createUser = asyncHandler(async (req, res) => {
  const createdUser = await userModel.create(req.body);
  res.send(createdUser);
});

const updateProfile = asyncHandler(async (req, res) => {
  const { name, about } = req.body;
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    { $set: { name, about } },
    { new: true, runValidators: true },
  );
  res.send(user);
});

const updateAvatar = asyncHandler(async (req, res) => {
  const { avatar } = req.body;
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    { $set: { avatar } },
    { new: true, runValidators: true },
  );
  res.send(user);
});

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
