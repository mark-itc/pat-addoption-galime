const Joi = require("joi");
// const imageExtension = require("joi-image-extension");

module.exports.createPetSchema = Joi.object().keys({
  type: Joi.string().required(),
  name: Joi.string().required(),
  status: Joi.string().required(),
  image: Joi.string().required(),
  height: Joi.number().required(),
  weight: Joi.number().required(),
  color: Joi.string().required(),
  bio: Joi.string().required(),
  hypoallergenic: Joi.boolean().required(),
  dietary: Joi.string().required(),
  breed: Joi.string().required(),
  userID: Joi.string(),
  image: Joi.any(),
});

module.exports.getAllPetsSchema = Joi.object().keys({
  skip: Joi.string(),
  limit: Joi.string(),
});

module.exports.updatePetSchema = Joi.object().keys({
  type: Joi.string(),
  name: Joi.string(),
  status: Joi.string(),
  image: Joi.string(),
  height: Joi.number(),
  weight: Joi.number(),
  color: Joi.string(),
  bio: Joi.string(),
  hypoallergenic: Joi.boolean(),
  dietary: Joi.string(),
  breed: Joi.string(),
  userId: Joi.string(),
});
