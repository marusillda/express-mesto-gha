const { celebrate, Joi } = require('celebrate');

const validateRegistrationData = celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().uri(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }),
  },
);

const validateLoginData = celebrate(
  {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }),
  },
);

const validateProfileData = celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  },
);

const validateAvatarData = celebrate(
  {
    body: Joi.object().keys({
      avatar: Joi.string().uri(),
    }),
  },
);

module.exports = {
  validateRegistrationData,
  validateLoginData,
  validateProfileData,
  validateAvatarData,
};
