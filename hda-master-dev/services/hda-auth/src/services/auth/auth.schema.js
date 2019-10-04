const Joi = require('joi');

const userSchema = Joi.object().keys({
    firstName: Joi.string().alphanum(),
    lastName: Joi.string().alphanum(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).token()
});

module.exports = userSchema;