const fs = require('fs/promises');
const { nanoid } = require('nanoid');
const path = require('path');
const contactsPath = path.join(__dirname, 'contacts.json');

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath)
    return JSON.parse(contacts)
  } catch (error) {
    return error;
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactToFind = contacts.find(({ id }) => id === contactId);
  return contactToFind || null;
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const contactToFind = contacts.findIndex(({ id }) => id === contactId);
    if (contactToFind === -1) return null;
    const [updatedContacts] = contacts.splice(contactToFind, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, 0, 2));
    return updatedContacts;
  } catch (error) {
    return error;
  }
}

async function addContact(contact) {
  try {
    const {name, email, phone} = contact;
    const newContact = { id: nanoid(), name, email, phone };
    const contacts = await listContacts();
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, 0, 2));
    return newContact;
  } catch (error) {
    return error;
  }
}

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const contactToFind = contacts.findIndex(({ id }) => id === contactId);
    if (contactToFind === -1) return null;
    contacts[contactToFind] = { id: contactId, ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[contactToFind]
  } catch (error) {
    return error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
