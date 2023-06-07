const { celebrate, Joi } = require('celebrate');

const validateRegistrationData = celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string()
        .min(2)
        .max(30)
        .default('Жак-Ив Кусто'),
      about: Joi.string()
        .min(2)
        .max(30)
        .default('Исследователь'),
      avatar: Joi.string()
        .uri()
        .default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required()
        .min(6),
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

const validateCreateCardData = celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().uri(),
    }),
  },
);

module.exports = {
  validateRegistrationData,
  validateLoginData,
  validateProfileData,
  validateAvatarData,
  validateCreateCardData,
};
