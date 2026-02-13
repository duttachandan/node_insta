const Joi = require("joi");

const CommentsValidation = Joi.object({
  Comment: Joi.string().required(),
  user: Joi.string().required(),
});

module.exports = CommentsValidation;
