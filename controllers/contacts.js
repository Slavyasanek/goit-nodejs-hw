const { ctrlWrapper, HttpError } = require('../helpers');
const { Contact } = require('../schemas/contactSchema')

const getAllContacts = async (__, res, _) => {
    const result = await Contact.find();
    res.status(200).json(result);
}

const getContact = async (req, res, _) => {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) {
        throw HttpError(404, "Not found");
    }
    res.status(200).json(contact)
}

const addContactData = async (req, res, _) => {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
}

const deleteById = async (req, res, _) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId)
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: 'Contact deleted successfully' })
}

const updateContactData = async (req, res, _) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.status(200).json(result)
}

const updateContactFavourite = async (req, res, _) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
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
    updateContactData: ctrlWrapper(updateContactData),
    updateContactFavourite: ctrlWrapper(updateContactFavourite)
}