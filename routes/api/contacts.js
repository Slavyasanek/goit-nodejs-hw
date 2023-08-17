const express = require('express');
const ctrl = require('../../controllers/contacts');
const router = express.Router()
const { validateBody, isValidId } = require('../../middlewares');
const { schemas } = require('../../schemas/contactSchema');

router.get('/', ctrl.getAllContacts);

router.get('/:contactId', isValidId, ctrl.getContact)

router.post('/', validateBody(schemas.emptyObjectSchema), validateBody(schemas.contactSchema), ctrl.addContactData)

router.delete('/:contactId', isValidId, ctrl.deleteById)

router.put('/:contactId', isValidId, validateBody(schemas.emptyObjectSchema), validateBody(schemas.contactSchema), ctrl.updateContactData)

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.emptyObjectSchema), validateBody(schemas.favoriteSchema), ctrl.updateContactFavourite)

module.exports = router
