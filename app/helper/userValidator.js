const Joi = require("joi");

const userValidation = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required(),
  token: Joi.string().required(),
});

module.exports = userValidation;
