const Joi = require("joi");

module.exports.singup = Joi.object().keys({
  email: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required(),
  bio: Joi.string(),
  isAdmin: Joi.boolean().required(),
  phone: Joi.string(),
  pets: Joi.object(),
  savedPets: Joi.object(),
});

module.exports.login = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});
