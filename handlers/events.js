const ascii = require("ascii-table");
const fs = require('node:fs');
const path = require('node:path');
module.exports = (client) => {
  const eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));
  let eventon = new ascii("Events");
  eventon.setHeading("Sự Kiện", "Trạng Thái");
  for (const file of eventFiles) {
    let pull = require(`../events/${file}`);
    if (pull.name) {
      eventon.addRow(file, "✅");
    }
    else {
      eventon.addRow(file, `error->missing a help.name,or help.name is not a string.`);
      continue;
    }

    const event = require(`../events/${file}`);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    }
    else {
      client.on(event.name, (...args) => event.execute(...args));
    }

  }

  console.log(eventon.toString().rainbow)
}