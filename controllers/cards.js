const createError = require('http-errors');
const cardModel = require('../models/card');
const asyncHandler = require('../middlewares/asyncHandler');

const getCards = asyncHandler(async (req, res) => {
  const cards = await cardModel.find({});
  res.send(cards);
});

const deleteCard = asyncHandler(async (req, res, next) => {
  const card = await cardModel
    .findById(req.params.cardId)
    .orFail(() => next(createError(404, 'Карточка не найдена')));
  await cardModel.deleteOne(card);
  res.send({});
});

const createCard = asyncHandler(async (req, res) => {
  const newCard = {
    ...req.body,
    owner: req.user._id,
  };
  const createdCard = await cardModel.create(newCard);
  res.send(createdCard);
});

const likeCard = asyncHandler(async (req, res, next) => {
  const card = await cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true, runValidators: true },
  ).orFail(() => next(createError(404, 'Карточка не найдена')));
  res.send(card);
});

const dislikeCard = asyncHandler(async (req, res, next) => {
  const card = await cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true, runValidators: true },
  ).orFail(() => next(createError(404, 'Карточка не найдена')));
  res.send(card);
});

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
};
