const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Joi = require('joi');
const { handleMongooseError } = require('../helpers')

const contact = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
        match: /^\(\d{3}\) \d{3}-\d{4}$/,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
}, { versionKey: false })

contact.post("save", handleMongooseError);

const contactSchema = Joi.object({
    name: Joi.string().required().label('name'),
    email: Joi.string().email().required().label("email"),
    phone: Joi.string().pattern(/^\(\d{3}\) \d{3}-\d{4}$/).min(8).required().label("phone").messages({ "string.pattern.base": 'phone doesn`t match pattern. Example, (000) 000-0000' }),
    favorite: Joi.boolean()
}).messages({
    "any.required": `missing required {{#label}} field`
}).min(1).required()

const emptyObjectSchema = Joi.object().min(1).required().messages({ "object.min": 'missing fields' })

const favoriteSchema = Joi.object({
    favorite: Joi.boolean().required().messages({ "any.required": 'missing field favourite' })
}).length(1).required()

const emptyFavouriteSchema = Joi.object().min(1).required().messages({ "object.min": 'missing field favourite' })

const Contact = mongoose.model("contact", contact);

const schemas = {
    contactSchema, emptyObjectSchema, favoriteSchema, emptyFavouriteSchema
}

module.exports = { Contact, schemas}