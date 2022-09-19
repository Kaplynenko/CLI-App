const patch = require("path");
const contactsPath = patch.resolve("./db/contacts.json");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const list = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

async function get(contactId) {
  const contact = await list();
  const id = String(contactId);
  const result = contact.find((item) => item.id === id);
  return result || null;
}

async function remove(contactId) {
  const contacts = await list();
  const id = String(contactId);
  const index = contacts.findIndex((item) => item.id == id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function add({ name, email, phone }) {
  const contacts = await list();
  const newContact = {
    id: nanoid(5),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}
module.exports = {
  list,
  get,
  add,
  remove,
};
