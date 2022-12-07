const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js')
const client = require('../index.js')
const BanSchema = require('../models/BanSchema')
const { QuickDB } = require('quick.db')
const db = new QuickDB()
module.exports = {
  name: 'messageCreate',
  async execute(message) {
    let prefix = await db.get(`${message.guildId}_prefix1`)
    let defaultprefix = "yu"
    if (!prefix) prefix = defaultprefix
    if (message.mentions.users.find(u => u.id == client.user.id)) {
      if (message.author.bot) return
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setAuthor({ name: "Made By YwY", url: "https://discord.gg/yuland", iconUrl: client.user.defaultAvatarURL })
            .setDescription(`Prefix : **${prefix.toUpperCase()}**. **Yu** always available!`)
        ]
      })
    }
    if (
      !message.content.toLowerCase(defaultprefix).startsWith(defaultprefix)
      && !message.content.toLowerCase(prefix).startsWith(prefix)
      || message.author.bot
    ) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const args2 = message.content.slice(defaultprefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase()
    const cmd2 = args2.shift().toLowerCase()
    if (cmd.length === 0 || cmd2.length === 0) return;
    let command =
      client.tcommands.get(cmd) || client.tcommands.get(cmd2) ||
      client.tcommands.find((command) => command.aliases && command.aliases.includes(cmd)) || client.tcommands.find((command) => command.aliases && command.aliases.includes(cmd2));
    if (command) {
      const lang = await db.get(`${message.guild.id}_languages`)
      let oncaptcha = await db.get(`${message.author.id}_oncaptcha2`);
      if (oncaptcha == true && lang == "vi") return message.reply(`Bạn không thể sử dụng lệnh khi đang có captcha`)
      if (oncaptcha == true && lang == "en") return message.reply(`You cannot using bot while in captcha!`)
      const ban = await BanSchema.findOne({ memberid: message.author.id })
      if (ban) {
        if (ban.memberid == message.author.id) return
      }
      else {
        if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.AttachFiles)) return message.reply(`Tôi chưa có quyền gửi Ảnh!`)
        if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.EmbedLinks)) return message.reply(`Tôi chưa có quyền gửi Embed Link!`)
        if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.UseExternalEmojis)) return message.reply(`Tôi chưa có quyền gửi emoji bên ngoài server!`)
        let timeout = command.cooldown
        let lastused = await db.get(`CD${command.name}_${message.author.id}`)
        let used = client.checkcd(lastused, timeout)
        let canUse = used.after
        if (!canUse) {
          const delays = [
            `${client.emo.fail} | **${message.author.username}**, ${command.cderror}, hãy chờ : \`${used.h + `:` + used.m + `:` + used.s}s\` để tiếp tục ${command.use}`,
            `${client.emo.fail} | **${message.author.username}**, ${command.cderror2}, please wait : \`${used.h + `:` + used.m + `:` + used.s}s\` to continue ${command.use2}`
          ]
          const delay = await client.send(client, message, delays, null).catch((e) => console.log(e))
          await client.sleep(timeout - (Date.now() - lastused))
          await delay.delete()
        }
        else {
          let a = await db.get(`${message.channel.id}_${command.name}`)
          const success = [
            `:x: | Lệnh đã bị vô hiệu hóa tại ${message.channel.name} ! `,
            `:x: | This commands has been disabled at ${message.channel.name} ! `
          ]
          if (a == `false`) return client.reply(client, message, success, null).then(async msg => {
            await client.sleep(4000)
            await msg.delete()
          })
          await db.set(`CD${command.name}_${message.author.id}`, Date.now())
          await command.run(client, message, args).catch((e) => console.log(e));
        };
      }
    }
  }
}
