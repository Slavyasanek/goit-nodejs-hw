const express = require('express');
const { validateBody, authenticate } = require('../../middlewares');
const { userSchema, subSchema } = require('../../schemas/userSchema');
const router = express.Router()
const { schemas } = require('../../schemas/contactSchema')
const ctrl = require('../../controllers/auth');

router.post('/register', validateBody(schemas.emptyObjectSchema), validateBody(userSchema), ctrl.register)

router.post('/login', validateBody(schemas.emptyObjectSchema
), validateBody(userSchema), ctrl.login)

router.post('/logout', authenticate, ctrl.logout)

router.get('/current', authenticate, ctrl.getCurrent)

router.patch('/', authenticate, validateBody(subSchema), ctrl.updateSubscription)

module.exports = router;