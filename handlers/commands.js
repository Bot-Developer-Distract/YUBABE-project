const {
  readdirSync
} = require("fs");
const ascii = require("ascii-table");
let table = new ascii("Commands");
table.setHeading("Lệnh", "Trạng Thái");

const client = require("../index.js")
 
  try {
    readdirSync("./textcommands/").forEach((dir) => {
      const commands = readdirSync(`./textcommands/${dir}/`).filter((file) => file.endsWith(".js"));
      for (let file of commands) {
        let pull = require(`../textcommands/${dir}/${file}`);

        if (pull.name) {
          client.tcommands.set(pull.name, pull);
          table.addRow(file, "✅");
        } else {
          table.addRow(file, `❌`);
          console.log(pull)
          continue;
        }
        if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
      }
    });
    console.log(table.toString().rainbow);
  }
  catch (e) {
    console.log(String(e.stack))
  }
