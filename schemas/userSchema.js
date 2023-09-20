const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Joi = require('joi');
const { handleMongooseError } = require('../helpers')

const subscriptionValues = ["starter", "pro", "business"];

const user = new Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: subscriptionValues,
        default: "starter"
    },
    token: String,
    avatarURL: String,
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    },
}, { versionKey: false })

user.post("save", handleMongooseError);

const userSchema = Joi.object({
    email: Joi.string().required().label("email").email().messages({ "any.required": "missing email value" }),
    password: Joi.string().required().min(6).required().messages({
        "string.min": "Minimum length of password 6",
        "any.required": "missing password value"
    }),
    subscription: Joi.string().valid(...subscriptionValues)
})

const subSchema = Joi.object({
    subscription: Joi.string().valid(...subscriptionValues).required().messages({ "any.only": "Subscription can be only a type of starter, business or pro" })
}).length(1).required()

const emailSchema = Joi.object({
    email: Joi.string().required().label("email").email().messages({ "any.required": "missing email value" }),
})

const User = mongoose.model("user", user)

module.exports = { User, userSchema, subSchema, emailSchema };