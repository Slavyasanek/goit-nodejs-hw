const Joi = require('joi');

const contactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().integer().min(8).required()
})
module.exports = contactSchema