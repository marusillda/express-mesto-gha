const router = require('express').Router(); // создали роутер
const {
  getUsers, getUserById, updateProfile, updateAvatar, getProfile,
} = require('../controllers/users');
const validateId = require('../middlewares/validateId');
const { validateProfileData, validateAvatarData } = require('../middlewares/validate');

router.get('/', getUsers);
router.get('/:userId', validateId, getUserById);
router.get('/me', getProfile);

router.patch('/me', validateProfileData, updateProfile);
router.patch('/me/avatar', validateAvatarData, updateAvatar);

module.exports = router; // экспортировали роутер
