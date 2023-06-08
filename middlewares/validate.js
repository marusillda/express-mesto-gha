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
        .uri({
          scheme: [
            'http',
            'https',
          ],
        })
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
      avatar: Joi.string()
        .uri({
          scheme: [
            'http',
            'https',
          ],
        }),
    }),
  },
);

const validateCreateCardData = celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30),
      link: Joi.string()
        .required()
        .uri({
          scheme: [
            'http',
            'https',
          ],
        }),
    }),
  },
);

const validateUserIdParam = celebrate(
  {
    params: Joi.object().keys({
      userId: Joi.string()
        .guid({ separator: false })
        .required(),
    }),
  },
);

const validateCardIdParam = celebrate(
  {
    params: Joi.object().keys({
      cardId: Joi.string()
        .guid({ separator: false })
        .required(),
    }),
  },
);

module.exports = {
  validateRegistrationData,
  validateLoginData,
  validateProfileData,
  validateAvatarData,
  validateCreateCardData,
  validateUserIdParam,
  validateCardIdParam,
};
