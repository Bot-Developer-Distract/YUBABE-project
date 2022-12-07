
const { SlashCommandBuilder, } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ywyinfo')
    .setDescription('Trả lời cho bạn thông tin về User hoặc Server!')
    .addSubcommand(subcommand =>
      subcommand
        .setName('user')
        .setDescription('Info about a user')
        .addUserOption(option => option.setName('user').setDescription('Người Bạn Muốn Xem Thông Tin')))
    .addSubcommand(subcommand =>
      subcommand
        .setName('server')
        .setDescription('Thông tin về server')),
  async execute(interaction) {
    if (interaction.options.getSubcommand() === 'user') {
      const user = interaction.options.getUser('target');
      if (user) {
        await interaction.reply(`Username: ${user.username}\nID: ${user.id}`);
      } else {
        await interaction.reply(`Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`);
      }
    } else if (interaction.options.getSubcommand() === 'server') {
      await interaction.reply(`Server name: ${interaction.guild.name}
Total members: ${interaction.guild.memberCount}
Owner : <@${interaction.guild.ownerId}>`);
    }
  }
}