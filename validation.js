const Joi = require('@hapi/joi');

const userSchema = Joi.object({
  name: Joi.string().min(5).required(),
  email: Joi.string().email().min(6).required(),
  password: Joi.string().min(6).required(),
});

const registerValidation = (userBody) => userSchema.validate(userBody);

module.exports.registerValidation = registerValidation;
