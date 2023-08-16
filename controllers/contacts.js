const contacts = require('../models/contacts');
const { ctrlWrapper, HttpError } = require('../helpers');

const getAllContacts = async (__, res, _) => {
    const result = await contacts.listContacts();
    res.status(200).json(result);
}

const getContact = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await contacts.getContactById(contactId)
    if (!contact) {
        throw HttpError(404, "Not found");
    }
    res.status(200).json(contact)
}

const addContactData = async (req, res, _) => {
    const contact = await contacts.addContact(req.body);
    res.status(201).json(contact);
}

const deleteById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: 'Contact deleted successfully' })
}

const updateContactData = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body)
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.status(200).json(result)
}

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    addContactData: ctrlWrapper(addContactData),
    deleteById: ctrlWrapper(deleteById),
    getContact: ctrlWrapper(getContact),
    updateContactData: ctrlWrapper(updateContactData)
}