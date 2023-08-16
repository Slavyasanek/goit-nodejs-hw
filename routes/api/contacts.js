const express = require('express');
const ctrl = require('../../controllers/contacts');
const router = express.Router()
const { validateBody } = require('../../middlewares');
const { contactSchema } = require('../../schemas');

router.get('/', ctrl.getAllContacts);

router.get('/:contactId', ctrl.getContact)

router.post('/', validateBody(contactSchema), ctrl.addContactData)

router.delete('/:contactId', ctrl.deleteById)

router.put('/:contactId', validateBody(contactSchema), ctrl.updateContactData)

module.exports = router
