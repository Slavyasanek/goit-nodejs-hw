const Joi = require('joi');

const contactSchema = Joi.object({
    name: Joi.string().required().label('name'),
    email: Joi.string().email().required().label("email"),
    phone: Joi.number().integer().min(8).required().label("phone")
}).messages({
    "any.required": `missing required {{#label}} field`
}).min(1).required()

const emptyObjectSchema = Joi.object().min(1).required().messages({"object.min": 'missing fields'})

module.exports = {contactSchema, emptyObjectSchema}