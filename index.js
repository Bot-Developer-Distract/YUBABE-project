const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
require('colors')
const token = process.env.token
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildVoiceStates,
  ],
  partials: [
    Partials.Message,
    Partials.Reaction,
    Partials.User,
    Partials.Channel,
    Partials.GuildMember,
    Partials.ThreadMember,
    Partials.GuildScheduledEvent,
  ],
  allowedMentions: { parse: ['users', 'roles'], repliedUser: true }
});
module.exports = client
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
  console.log(`Đã tải Event ${event.name}`)
}
client.commands = new Collection();
client.tcommands = new Collection();
client.aliases = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}
const ascii = require("ascii-table");
let table = new ascii("HANDLERS");
table.setHeading("Trợ Năng", "Trạng Thái");
client.categories = fs.readdirSync(path.resolve('handlers'));
["commands", "functions", "events"].forEach(handlers => {
  table.addRow(handlers, `✅`);
  require(path.resolve(`handlers/${handlers}`)); (client)
});
console.log(table.toString().brightYellow)

const db = require('quick.db')
const { join } = require("path")

client.on('ready', () => {
  // console log case
  {
    console.log("┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓")
    console.log("┃                                         ┃")
    console.log("┃   LostArk bot đã sẵn sàng hoạt động!    ┃")
    console.log("┃                                         ┃")
    console.log("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛")
  }

  // activity case
  setInterval(() => {
    const statuses = [
      `yuhelp | John Week  ♌#8686`,
      `LostArk đã 3 tuổi! | c/help`,
      `The Backroom | yuhelp`,
      `${client.guilds.cache.size} sever | yuhelp`,
      `In Coding | yuhelp`,
    ]

    const status = statuses[Math.floor(Math.random() * statuses.length)]
    client.user.setActivity(status, { type: "PLAYING"})
  }, 2000)
})

// Login to Discord with your client's token
process.on("unhandledRejection", (reason, p) => {
  console.log(reason, p)
})
process.on("uncaughtException", (err, origin) => {
  console.log(err, origin)
})

client.login("MTAwNTY4Nzc1OTY4MTM1OTg4Mw.GUj31H.pr1Q89DnMvs-8apPTL_eYnCnfatIcfOMKkt9oE");