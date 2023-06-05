const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_UNAUTHORIZED,
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
  const pwdHash = await bcrypt.hash(req.body.password, 10);
  const userData = { ...req.body, password: pwdHash };
  const createdUser = await userModel.create(userData);
  res.status(HTTP_STATUS_CREATED).send(createdUser);
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  const compareResult = await bcrypt.compare(password, user.password);
  if (!compareResult) {
    return next(createError(HTTP_STATUS_UNAUTHORIZED, 'Пользователь не авторизован'));
  }
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.send({ token });
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

const updateAvatar = asyncHandler(async (req, res, next) => {
  const { avatar } = req.body;
  const user = await updateUserModule(req.user._id, { avatar })
    .orFail(() => next(createError(HTTP_STATUS_UNAUTHORIZED, 'Пользователь не авторизован')));
  res.send(user);
});

module.exports = {
  getUsers,
  getUserById,
  createUser,
  loginUser,
  updateProfile,
  updateAvatar,
};
