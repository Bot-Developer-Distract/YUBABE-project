const { Collection, EmbedBuilder } = require('discord.js')
const client = require("../index.js")
module.exports = {
  name: 'interactionCreate',
  execute(interaction) {
    
    if (interaction.isCommand()) {
      const slashcommand = client.commands.get(interaction.commandName);

      if (!slashcommand) return;

      try {
        slashcommand.execute(interaction);
      } catch (error) {
        console.error(error);
        interaction.reply({ content: 'Đã có lỗi xảy ra khi truy xuất lệnh này!', ephemeral: true });
      }
      console.log(`${interaction.user.tag} # ĐÃ DÙNG LỆNH SLASH ${(interaction.commandName).toUpperCase()} TẠI ${(interaction.guild.name).toUpperCase()}.`);
    }
    else if (interaction.isSelectMenu()) {
      let options = interaction.values;
      const funny = options[0]
      if (funny === 'first') {
        const embed1 = new EmbedBuilder()
          .setThumbnail(`https://media.discordapp.net/attachments/942015852310577162/983698397452193872/59b3e7c9da97700f3e629fe73714f1b2.webp`)
          .setDescription(`🐱 **Animals** - (2)\n\`hunt\`, \`zoo\`\n\n● [Support Server](${`https://discord.gg/yuland`})\n● Bán Thú : \`Ysell <thu | t | a | animal> [C,U,R,SR,E,P,G] [số lượng | all (nếu bán bằng ICON)]\` | \`Ysell thu all\`\n● Bán Nhẫn : \`Ysell <nhan | ring | r> <ID Nhẫn>\`\n● Bán Nông Sản : \`Ysell <nongsan | ns | hg | hatgiong> <Tên hoặc ID> <số lượng | all>\` | \`Ysell ns all\``)
          .addFields({ name: `Cách Dùng : Yhunt`, value: `Săn thú, rút gọn : \`h\`` })
          .addFields({ name: `Cách dùng : Yzoo`, value: `Xem zoo, rút gọn : \`z\`` })
          .setColor("#303037")
          .setFooter({ text: "Cảm ơn bạn đã chọn Yubabe", URL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
          .setTimestamp()
        interaction.reply({ embeds: [embed1], ephemeral: true })
        return
      }

      else if (funny === 'second') {
        const embed2 = new EmbedBuilder()
          .setThumbnail(`https://media.discordapp.net/attachments/942015852310577162/983698397452193872/59b3e7c9da97700f3e629fe73714f1b2.webp`)
          .setDescription(`📛 **Config** - (2) \`enable\`, \`disable\`\n\n● [Support Server](${`https://discord.gg/yuland`})`)
          .addFields(
            { name: `Cách Dùng : \`Ydisable + command\``, value: `Vô hiệu lệnh trong channel, rút gọn : \`ds, dc\`` },
            { name: `Cách dùng : \`Yenable + command\``, value: `Kích hoạt lệnh trong channel, rút gọn : \`en, ec\`` },
            { name: "● Các lệnh có thể sẽ chưa hoàn thiện hoặc bị mất khi reset bot", value: "Bọn mình sẽ cố gắng sửa chữa nhanh nhất !" }
          )
          .setColor('#303037')
          .setFooter({ text: "Cảm ơn bạn đã chọn Yubabe", URL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
          .setTimestamp()
        interaction.reply({ embeds: [embed2], ephemeral: true })
        return
      }

      else if (funny === 'fourth') {
        const embed3 = new EmbedBuilder()
          .setThumbnail(`https://media.discordapp.net/attachments/942015852310577162/983698397452193872/59b3e7c9da97700f3e629fe73714f1b2.webp`)
          .setDescription(`🌾 **Farm** - (7)\n\`ruong\`, \hatgiong\`, \`trongcay\`, \`thuhoach\`,\`nuoi\`\n\n● [Support Server](${`https://discord.gg/yuland`})`)
          .addFields({ name: `● Nếu là người chơi mới, bạn gõ \`Yruong\` để nhận field`, value: `● Sau đó mua hạt giống theo ID và trồng cây bằng lệnh \`Ytc lua\`.\nBạn có thể xem ID bằng lệnh Yruong, id có thể là tên trái cây!` })
          .addFields({ name: `Cách Dùng : \`Yruong\``, value: `Xem các cây trồng hoặc thú nuôi bạn đang nuôi-trồng, rút gọn : \`field, r\`` })
          .addFields({ name: `Cách Dùng : \`Yhatgiong\``, value: `Xem các nông sản bạn nuôi-trồng để bán, hiện tại bot đang bảo trì tính năng sell hạt giống, rút gọn : \`crop, hg\`` })

          .addFields({ name: `Cách Dùng : \`Ytrongcay + id || Ythuhoach + id || Ynuoi + ga/bo/heo\``, value: `Trồng cây, thu hoạch và cho thú ăn, bạn có thể mua cám heo, cỏ và thóc bằng lệnh Ybuy + co/thoc/camheo + soluong, rút gọn : \`Ytc, Yth, Yn\`` })
          .setColor('#303037')
          .setFooter({ text: "Cảm ơn bạn đã chọn Yubabe", URL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
          .setTimestamp()
        interaction.reply({ embeds: [embed3], ephemeral: true })
        return

      }

      else if (funny === 'fifth') {

        const embed4 = new EmbedBuilder()
          .setThumbnail(`https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif`)
          .setDescription(`🎮 **Fun** - (5)\n\`slot\`, \`cophieu\`, \`coinflip\`, \`cothay\`, \`pray\`\n\n● [Support Server](${`https://discord.gg/yuland`})`)
          .addFields({ name: "● Cách dùng : `Yslot + <tiền đặt> | Ycp + <tiền đặt> | Ycf + <tiền đặt> <n/u> | Ypray | Ycothay + <câu hỏi>`", value: `Chơi cổ phiếu, coinflip, slot, pray và đặt câu hỏi!` })
          .setColor('#303037')
          .setFooter({ text: "Cảm ơn bạn đã chọn Yubabe", URL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
          .setTimestamp()
        interaction.reply({ embeds: [embed4], ephemeral: true })
        return

      }

      else if (funny === 'third') {

        const embed5 = new EmbedBuilder()
          .setThumbnail(`https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif `)
          .setDescription(`💴 **Economy** - (7)\n\`cash\`, \`bank\`, \`guitietkiem\`, \`ruttien\`, \`daily\`, \`give\`\n\n● [Support Server](${`https://discord.gg/yuland`})`)
          .addFields({ name: "● Cách dùng : `Ycash | Ydaily`", value: `Xem tiền bạn đang có và nhận tiền daily, rút gọn : \`Ybal, Ycash, Ymoney, Ycoin\`` })
          .addFields({ name: "● Cách dùng : `Ybank`", value: `Xem tiền bạn đang có trong ngân hàng, hãy check DMS, bot sẽ inb riêng cho bạn!` })
          .addFields({ name: "● Cách dùng : `Ytietkiem + tiền | Yruttien + tiền`", value: `Gửi tiết kiệm hoặc rút tiền từ bank! Rút gọn : \`tk, gtk, rt, rut\`, hãy check DMS, bot sẽ inb riêng cho bạn!` })
          .addFields({ name: "● Cách dùng : `Ygive + <user> + <số tiền>`, lệnh khác : `ct, tf`", value: `Give tiền cho người khác.` })

          .setColor('#303037')
          .setFooter({ text: "Cảm ơn bạn đã chọn Yubabe", URL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
          .setTimestamp()
        interaction.reply({ embeds: [embed5], ephemeral: true })
        return

      }

      else if (funny === 'sixth') {
        const embed6 = new EmbedBuilder()
          .setThumbnail(`https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif `)
          .setDescription(`📦 **Inventory** - (3)\n\`inventory\`, \`use\`, \`sell\`,\`buy\`\n\n● [Support Server](${`https://discord.gg/yuland`})`)
          .addFields({ name: "● Cách dùng : `Yinventory`", value: `Xem kho vật phẩm bạn đang có (ngọc, cần câu, nhà, nhẫn), lệnh khác \`inv, kho\`` })
          .addFields({ name: "● Cách dùng : `Yuse + id`", value: `Dùng ngọc, xem ID ngọc trong Inventory` })
          .addFields({ name: "● Cách dùng : `Ysell`", value: `Hiện tại bạn có thể bán thú, nhẫn : \`Ysell <thu | nhan> <all | icon thú | loại thú>\` , lệnh khác : s, thu, nhan có thể thay bằng : animal, a, t và n, r, ring` })
          .setColor('#303037')
          .setFooter({ text: "Cảm ơn bạn đã chọn Yubabe", URL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
          .setTimestamp()
        interaction.reply({ embeds: [embed6], ephemeral: true })
        return
      }

      else if (funny === 'seventh') {
        const embed6 = new EmbedBuilder()
          .setThumbnail(`https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif `)
          .setDescription(`💰 Shop - (2)\n\`buy\`,\`shop\`\n\n● [Support Server](${`https://discord.gg/yuland`})`)
          .addFields({ name: "● Cách dùng : `Ybuy + ID`", value: `Bạn có thể mua nhẫn với các ID : 001,002,003,004,005, các loại cần câu : cc1,cc2,cc3, các loại thức ăn thú nuôi : co, thoc, camheo` })
          .addFields({ name: "● Cách dùng : `Yshop`", value: `Truy cập vào danh sách các item trong tiệm tạp hóa YUBABE để mua!` })
          .addFields({ name: "● Cách dùng : `Ybuy + <ID> + [số lượng]`", value: `Mua các item trong tiệm tạp hóa YUBABE!` })
          .setColor('#303037')
          .setFooter({ text: "Cảm ơn bạn đã chọn Yubabe", URL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
          .setTimestamp()
        interaction.reply({ embeds: [embed6], ephemeral: true })
        return
      }

      else if (funny === 'eighth') {
        const embed6 = new EmbedBuilder()
          .setThumbnail(`https://cdn.discordapp.com/emojis/951586992897024060.png`)
          .setDescription(`💟 Marry - (5)\n\`anhcuoi\`,\`lyhon\`,\`marry\`,\`promise\`,\`together\`\n\n● [Support Server](${`https://discord.gg/yuland`})`)
          .addFields({ name: "● Cách dùng : `Yanhcuoi + link`", value: `Thay đổi ảnh nền cho embed marry` })
          .addFields({ name: "● Cách dùng : `Ymarry + tag + ID nhẫn`", value: `Cưới một người, bạn có thể gõ Ymarry sau khi kết hôn để xem Bằng Chứng Đính Hôn của mình!` })
          .addFields({ name: "● Cách dùng : `Ylyhon`", value: `Ý nghĩa như tên...` })
          .addFields({ name: "● Cách dùng : `Yloihua + lời hứa`", value: `Set lời hứa trên EMBED` })
          .addFields({ name: "● Cách dùng : `Yloveyou`", value: `Cày điểm thân mật` })
          .setColor('#303037')
          .setFooter({ text: "Cảm ơn bạn đã chọn Yubabe", URL: `https://media.discordapp.net/attachments/978011752610557972/983700981961343026/919967569287446568.gif` })
          .setTimestamp()
        interaction.reply({ embeds: [embed6], ephemeral: true })
        return
      }
      else return
    }
  }
};