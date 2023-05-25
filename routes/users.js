const router = require('express').Router(); // создали роутер
const {
  getUsers, getUserById, createUser, updateProfile, updateAvatar,
} = require('../controllers/users');
const validateId = require('../middlewares/validateId');

router.get('/users', getUsers);
router.get('/users/:userId', [validateId, getUserById]);

router.post('/users', createUser);

router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router; // экспортировали роутер
