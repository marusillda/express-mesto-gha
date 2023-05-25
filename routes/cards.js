const router = require('express').Router(); // создали роутер
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const validateId = require('../middlewares/validateId');

router.get('/', getCards);

router.post('/', createCard);

router.delete('/:cardId', [validateId, deleteCard]);
router.delete('/:cardId/likes', [validateId, dislikeCard]);

router.put('/:cardId/likes', [validateId, likeCard]);
module.exports = router; // экспортировали роутер
