const router = require('express').Router(); // создали роутер
const {
  getUsers, getUserById, createUser, updateProfile, updateAvatar,
} = require('../controllers/users');
const validateId = require('../middlewares/validateId');

router.get('/', getUsers);
router.get('/:userId', [validateId, getUserById]);

router.post('/', createUser);

router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router; // экспортировали роутер
