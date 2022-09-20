// const fs = require("fs/promises");

const contacts = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.list();
      console.table(allContacts);
      break;

    case "get":
      const oneContact = await contacts.get(id);
      console.log(oneContact);
      break;

    case "add":
      const newContact = await contacts.add({ name, email, phone });
      console.log(newContact);
      break;

    case "remove":
      // ... id
      const removeContact = await contacts.remove(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

(async () => {
  await invokeAction(argv);
})();
