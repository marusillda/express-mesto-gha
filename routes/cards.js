const router = require('express').Router(); // создали роутер
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const validateId = require('../middlewares/validateId');

router.get('/cards', getCards);

router.post('/cards', createCard);

router.delete('/cards/:cardId', [validateId, deleteCard]);
router.delete('/cards/:cardId/likes', [validateId, dislikeCard]);

router.put('/cards/:cardId/likes', [validateId, likeCard]);
module.exports = router; // экспортировали роутер
