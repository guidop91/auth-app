const Joi = require('@hapi/joi');

// Password regular expression to enforce:
// - Length of 8-18 characters
// - At least one capital letter
// - At least one number
// - At least one special character
const lowercaseRE = /(?=.*?[a-z])/;
const uppercaseRE = /(?=.*?[A-Z])/;
const numberRE = /(?=.*?[0-9])/;
const specialCharRE = /(?=.*?[!"#\$%&'\(\)\*\+,-\.\/:;<=>\?@[\]\^_`\{\|}~])/;

const userSchema = Joi.object({
  name: Joi.string().min(5).required(),
  email: Joi.string().email().min(6).required(),
  password: Joi.string()
    .min(8)
    .max(18)
    .required()
    .pattern(lowercaseRE, 'necessary one lowercase character')
    .pattern(uppercaseRE, 'necessary one uppercase character')
    .pattern(numberRE, 'necessary one number')
    .pattern(specialCharRE, 'nessary one special char'),
});

const loginSchema = Joi.object({
  email: Joi.string().email().min(6).required(),
  password: Joi.string().min(8).required(),
});

const registerValidation = (userBody) => userSchema.validate(userBody);
const loginValidation = (loginBody) => loginSchema.validate(loginBody);

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
