const express = require('express');
const ctrl = require('../../controllers/contacts');
const router = express.Router()
const { validateBody, isValidId, authenticate } = require('../../middlewares');
const { schemas } = require('../../schemas/contactSchema');

router.get('/', authenticate, ctrl.getAllContacts);

router.get('/:contactId', authenticate, isValidId, ctrl.getContact)

router.post('/', authenticate, validateBody(schemas.emptyObjectSchema), validateBody(schemas.contactSchema), ctrl.addContactData)

router.delete('/:contactId', authenticate, isValidId, ctrl.deleteById)

router.put('/:contactId', authenticate, isValidId, validateBody(schemas.emptyObjectSchema), validateBody(schemas.contactSchema), ctrl.updateContactData)

router.patch('/:contactId/favorite', authenticate, isValidId, validateBody(schemas.emptyFavouriteSchema), validateBody(schemas.favoriteSchema), ctrl.updateContactFavourite)

module.exports = router
