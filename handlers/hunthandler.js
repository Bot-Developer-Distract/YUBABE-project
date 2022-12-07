const ascii = require("ascii-table");
const {AttachmentBuilder} = require("discord.js")
let table = new ascii("Commands");
table.setHeading("Lệnh", "Trạng Thái");
const C = ["🐛", "🪱", "🐞", "🐌", "🦋"]
const U = ["🐭", "🐰", "🐱", "🐶", "🦊"]
const R = ["🐓", "🐖", "🐏", "🐄", "🐃"]
const SR = ["🦎", "🐢", "🦂", "🐍", "🐊"]
const E = ["🐒", "🦛", "🐆", "🐅", "🐘"]
const P = [
  "<a:Ybutterfly:911682101005398058>",
  "<a:Yizumilacmong:929738419930808430>",
  "<:Ynth:930032493065801758>",
  "<:Ykhatrapboi:918082945686851615>",
  "<:be_non:918932737543503912>",
  "<a:Yu_meobaymau:944351775597674558>",
  "<:Yquyxu:941244934797799434>",
  "<a:GG_hongchuyen:911309645681946685>"
]
const G = [
  "<:G_naisungtam:974392899536056401>",
  "<:G_kilan:974392813095616542>",
  "<:G_gautruc:974392721106149466>",
  "<:G_cho:974392664445308958>",
  "<:G_chim:974392505317597194>",
  "<:G_caoden:974392590029959188>",
  "<:G_bachtuoc:974392970931470347>"
]
const D = [
  "<:D_Chimera:985411852542562344>",
  "<:D_Hydra:985411855927349298>",
  "<:D_Medusa:985411858557202513>",
  "<:D_Minotaur:985411860922761276>",
  "<:D_Pegasus:985411864324358184>"
]
const V = [
  "<a:V_Cinderella:988149859745943592>",
  "<a:V_Sonic:988149031291215914>",
  "<a:V_Vanellope:988148591669440615>",
  "<a:V_Belle:988150258066423858>",
  "<a:V_BossBaby:988147327292276756>",
  "<a:V_Mikey:994182093183655966>"
]
const buffSchema = require('../models/buffSchema')
const vipSchema = require('../models/vipSchema')
const zoopointSchema = require('../models/zoopointSchema')
const number = require('../config/nbxs.json');  
  let rate = 0
const {QuickDB} = require("quick.db")
const db = new QuickDB()
const BatThuThuong = async (client, message) => {
  let author = message.author.id
  const provip = await vipSchema.findOne({ memberid: message.author.id })
    let pro = false
    let vip = false
    let limit = 1000
    if (provip) {
      const date = await client.datepassport(message.author.id)
      const status = await client.checkpassport(date)
      let end = status.after
      if (!end && provip.type == `<:VIPPassport:988093810955411456>`) vip = true, limit = 50
      if (!end && provip.type == `<:ProPassport:988093838348410930>`) pro = true, limit = 75
      if (end) {
        await vipSchema.deleteOne({ memberid: message.author.id })
        await message.reply(`Passport của bạn đã hết hạn! Cảm ơn bạn đã đồng hành cùng tôi trong suốt tháng qua! <3`)
      }
    }
  let animal
  const buffs = await buffSchema.find({
        memberid: author
      })
  let heso = 1
  let x2 = false
  let lucky = false
  let digit = 0
  let buffmsg = `<:hunt:983135518357336134>`
  for (let b in buffs) {
        let buf = buffs[b]
        let type = buf.type
        let quanlity = buf.quanlity
        if (quanlity > 0 && type == 1) {
          heso = buf.heso;
          digit = Math.trunc(Math.log10(heso) + 1);
          let so1 = await client.sonho(number, heso, digit)
          buffmsg += `**x**${so1} : \`${quanlity - 1}\``;
          await client.trubuff(message.author.id, 1, 1)
        };
        if (quanlity > 0 && type == 2) {
          x2 = true
          buffmsg += `<:buffx2:983135005872111626> : \`${quanlity - 1}\``
          await client.trubuff(message.author.id, 2, 1)
        };
        if (quanlity > 0 && type == 3) {
          lucky = true
          buffmsg += `<:bufflucky:983135001300307968> : \`${quanlity - 1}\``
          await client.trubuff(message.author.id, 3, 1)
        }
        if (quanlity > 0 && type == 4) {
          heso = buf.heso
          x2 = true
          lucky = true
          digit = Math.trunc(Math.log10(heso) + 1);
          let so4 = await client.sonho(number, heso, digit)
          buffmsg += `**x**${so4} : \`${quanlity - 1}\` <:buffx2:983135005872111626> : \`${quanlity - 1}\` <:bufflucky:983135001300307968> : \`${quanlity - 1}\``
          await client.trubuff(message.author.id, 4, 1)
        };
      }
  const ar1 = chonthu(C, U, R, SR, E, P, G, D, V, lucky, pro, vip, heso, x2)
  let count = {}
  ar1.forEach(thu => {
    if (count[thu]) {
          count[thu] += 1
     return
        }
        count[thu] = 1
      })
  let point = 0
  for (let item in count) {
   let type = checkthu(C, U, R, SR, E, P, G, D, V, item)
   let cpoint = checkpoint(C, U, R, SR, E, P, G, D, V, item)
   point += cpoint * count[item]
   await client.animal(author, item, count[item], type)
      }
   await client.addpoint(message.author.id, point);
   animal = ar1.join(" ")
  return { animal, point, buffmsg, limit}
    }
const Captcha = async (client, message) => {
  
  const provip = await vipSchema.findOne({ memberid: message.author.id })
    let pro = false
    let vip = false
    let limit = 100
    if (provip) {
      const date = await client.datepassport(message.author.id)
      const status = await client.checkpassport(date)
      let end = status.after
      if (!end && provip.type == `<:VIPPassport:988093810955411456>`) vip = true, limit = 50
      if (!end && provip.type == `<:ProPassport:988093838348410930>`) pro = true, limit = 75
      if (end) {
        await vipSchema.deleteOne({ memberid: message.author.id })
        await message.reply(`Passport của bạn đã hết hạn! Cảm ơn bạn đã đồng hành cùng tôi trong suốt tháng qua! <3`)
      }
    }
    const a = Math.floor(Math.random() * 500)
    const b = Math.floor(Math.random() * 500)
    if (a + b < limit) {
      function randomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return 'rgb(' + r + ',' + g + ',' + b + ')';
      }
      const Canvas = require('canvas');
      const Char_array = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      const Char_length = Char_array.length;
      const canvasW = 150; // rộng
      const canvasH = 50; // cao
      const canvas = Canvas.createCanvas(canvasW, canvasH);
      const context = canvas.getContext('2d');
      // Background
      context.beginPath();
      context.rect(0, 0, canvasW, canvasH);
      context.fillStyle = '#000000'; // background màu đen
      context.fill();
      context.closePath();
      // End background
      const captchaLength = 6; // Best, max: 7 (độ dài captcha)
      const stringNumber = 3; // số đường kẻ
      const dotCount = 30; // số chấm nhiễu
      const result = []; // array chứa kết quả captcha (dạng ['a', 'b', 'c' ])
      for (let i = 0; i < captchaLength; i++) {
        const sIndex = Math.floor(Math.random() * Char_length);
        const sDeg = (Math.random() * 30 * Math.PI) / 180;
        const cTxt = Char_array[sIndex];
        result[i] = cTxt.toLowerCase();
        const x = 10 + i * 20;
        const y = 20 + Math.random() * 8;
        context.font = 'bold 23px noto'; // Font family custom
        context.translate(x, y);
        context.rotate(sDeg);
        context.fillStyle = randomColor();
        context.fillText(cTxt, 0, 0);
        context.rotate(-sDeg);
        context.translate(-x, -y);
      }
      for (let i = 0; i < stringNumber; i++) {
        context.strokeStyle = randomColor();
        context.beginPath();
        context.moveTo(Math.random() * canvasW, Math.random() * canvasH);
        context.lineTo(Math.random() * canvasW, Math.random() * canvasH);
        context.stroke();
      }
      for (let i = 20; i < dotCount; i++) {
        context.strokeStyle = randomColor();
        context.beginPath();
        const x = Math.random() * canvasW;
        const y = Math.random() * canvasH;
        context.moveTo(x, y);
        context.lineTo(x + 1, y + 1);
        context.stroke();
      }
      const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), 'profile-image.png'); const content = result.join('')
      let messagess = [
        `<@${message.author.id}>, bạn có 50 giây, hãy nhập CAPTCHA bên dưới!`,
        `<@${message.author.id}>, you have 50 seconds, please type the Captcha below!`
      ]
      await client.sendFile(client, message, messagess, attachment).catch(e => console.log(e))
      const filter = m => m.author.id === message.author.id && m.content.toLowerCase() == content
      const collector = message.channel.createMessageCollector({ filter, time: 50_000 });
      collector.on('collect', async m => {
        await db.set(`${message.author.id}_oncaptcha2`, true)
        if (m.content.toLowerCase() == content) {
          let messagess = [
            `<@${message.author.id}>, bạn đã nhập đúng, bạn có thể sử dụng bot tiếp!`,
            `<@${message.author.id}>, you have done your captcha, you can continue!`
          ]
          await client.send(client, message, messagess, null).catch(e => console.log(e))
        }
      });
      collector.on('end', async collected => {
        await db.set(`${message.author.id}_oncaptcha2`, false)
        if (collected.size > 0) {
          let messagess = [
            `<@${message.author.id}>, cảm ơn bạn đã nhập Captcha!`,
            `<@${message.author.id}>,thank for doing captcha!`
          ]
          await client.send(client, message, messagess, null).catch(e => console.log(e))
        }
        else if (collected.size < 1) {
          const banned = new BanSchema({ memberid: message.author.id, guildid: message.guild.id })
          banned.save()
          let messagess = [
            `**${message.author.username}**! Bạn đã bị BAN vì treo auto! Xin hãy liên lạc tại server support : https://discord.gg/yuland
với screenshot để được xem xét gỡ ban!`,
            `**${message.author.username}**! You have been banned cause of type error or not doing captcha! If you think this is a problem, please contact us at : https://discord.gg/yuland
with screenshot for unbanning!`
          ]
          await client.send(client, message, messagess, null).catch(e => console.log(e))
        }
      });
            }
}

module.exports = {Captcha, BatThuThuong}
function chonthu(thuC, thuU, thuR, thuSR, thuE, thuP, thuG, thuD, thuV, lucky, pro, vip, heso, double) {

  let arr = []
  let number = []
  //dưới mỗi vòng lặp, thêm dòng number[i] = r3, nhớ thêm bên dưới r3 cho r3 thành văn bản nha = `${}`
  let hesothat = heso
  if (double) hesothat = heso * 2
  //4 logic khi hunt thú :
  if (lucky) {//logic khi chỉ dùng gem03
    for (var i = 0; i < hesothat; i++) {
      let r1 = Math.floor(Math.random() * 10000)
      let r2 = Math.floor(Math.random() * 10000)
      let r3 = r1 + r2
      number[i] = `${r3}`
      if (r3 <= 450) arr[i] = thuD[Math.floor(Math.random() * thuD.length)]
      else if (r3 <= 2000 && r3 > 450) arr[i] = thuSR[Math.floor(Math.random() * thuSR.length)]
      else if (r3 <= 7000 && r3 > 2000) arr[i] = thuU[Math.floor(Math.random() * thuU.length)]
      else if (r3 <= 10000 && r3 > 7000) arr[i] = thuR[Math.floor(Math.random() * thuR.length)]
      else if (r3 <= 18000 && r3 > 10000) arr[i] = thuC[Math.floor(Math.random() * thuC.length)]
      else if (r3 <= 19500 && r3 > 18000) arr[i] = thuE[Math.floor(Math.random() * thuE.length)]
      else if (r3 <= 20000 && r3 > 19500) arr[i] = thuG[Math.floor(Math.random() * thuG.length)]
      else arr[i] = thuC[Math.floor(Math.random() * thuC.length)]
    }
  }
  else if (pro) {
    for (var i = 0; i < hesothat; i++) {
      let r1 = Math.floor(Math.random() * 10000)
      let r2 = Math.floor(Math.random() * 10000)
      let r3 = r1 + r2
      number[i] = `${r3}`
      if (r3 <= 450) arr[i] = thuP[Math.floor(Math.random() * thuP.length)]
      else if (r3 <= 3000 && r3 > 450) arr[i] = thuSR[Math.floor(Math.random() * thuSR.length)]
      else if (r3 <= 7000 && r3 > 3000) arr[i] = thuU[Math.floor(Math.random() * thuU.length)]
      else if (r3 <= 10000 && r3 > 7000) arr[i] = thuR[Math.floor(Math.random() * thuR.length)]
      else if (r3 <= 17000 && r3 > 10000) arr[i] = thuC[Math.floor(Math.random() * thuC.length)]
      else if (r3 <= 18000 && r3 > 17000) arr[i] = thuE[Math.floor(Math.random() * thuE.length)]
      else arr[i] = thuC[Math.floor(Math.random() * thuC.length)]
    }
  }
  else if (vip) {
    for (var i = 0; i < hesothat; i++) {
      let r1 = Math.floor(Math.random() * 10000)
      let r2 = Math.floor(Math.random() * 10000)
      let r3 = r1 + r2
      number[i] = `${r3}`
      if (r3 <= 450) arr[i] = thuV[Math.floor(Math.random() * thuV.length)]
      else if (r3 <= 900 && r3 > 450) arr[i] = thuP[Math.floor(Math.random() * thuP.length)]
      else if (r3 <= 2000 && r3 > 900) arr[i] = thuSR[Math.floor(Math.random() * thuSR.length)]
      else if (r3 <= 7000 && r3 > 2000) arr[i] = thuU[Math.floor(Math.random() * thuU.length)]
      else if (r3 <= 10000 && r3 > 7000) arr[i] = thuR[Math.floor(Math.random() * thuR.length)]
      else if (r3 <= 18000 && r3 > 10000) arr[i] = thuC[Math.floor(Math.random() * thuC.length)]
      else if (r3 <= 20000 && r3 > 18000) arr[i] = thuE[Math.floor(Math.random() * thuE.length)]
      else arr[i] = thuC[Math.floor(Math.random() * thuC.length)]
    }
  }
  else if (pro && lucky) {//logic khi dùng gem03 và propassport

    for (var i = 0; i < hesothat; i++) {
      let r1 = Math.floor(Math.random() * 10000)
      let r2 = Math.floor(Math.random() * 10000)
      let r3 = r1 + r2
      number[i] = `${r3}`
      if (r3 <= 1000) arr[i] = thuP[Math.floor(Math.random() * thuP.length)]
      else if (r3 <= 2000 && r3 > 1000) arr[i] = thuG[Math.floor(Math.random() * thuG.length)]
      else if (r3 <= 3000 && r3 > 2000) arr[i] = thuSR[Math.floor(Math.random() * thuSR.length)]
      else if (r3 <= 8000 && r3 > 3000) arr[i] = thuU[Math.floor(Math.random() * thuU.length)]
      else if (r3 <= 10000 && r3 > 8000) arr[i] = thuR[Math.floor(Math.random() * thuR.length)]
      else if (r3 <= 17000 && r3 > 10000) arr[i] = thuC[Math.floor(Math.random() * thuC.length)]
      else if (r3 <= 19000 && r3 > 17000) arr[i] = thuE[Math.floor(Math.random() * thuE.length)]
      else if (r3 <= 20000 && r3 > 19000) arr[i] = thuD[Math.floor(Math.random() * thuD.length)]
      else arr[i] = thuC[Math.floor(Math.random() * thuC.length)]

    }
  }
  else if (vip && lucky) {
    for (var i = 0; i < hesothat; i++) {
      let r1 = Math.floor(Math.random() * 10000)
      let r2 = Math.floor(Math.random() * 10000)
      let r3 = r1 + r2
      number[i] = `${r3}`
      if (r3 <= 700) arr[i] = thuV[Math.floor(Math.random() * thuV.length)]
      else if (r3 <= 1500 && r3 > 700) arr[i] = thuP[Math.floor(Math.random() * thuP.length)]
      else if (r3 <= 2500 && r3 > 1500) arr[i] = thuG[Math.floor(Math.random() * thuG.length)]
      else if (r3 <= 3500 && r3 > 2500) arr[i] = thuSR[Math.floor(Math.random() * thuSR.length)]
      else if (r3 <= 8000 && r3 > 3500) arr[i] = thuU[Math.floor(Math.random() * thuU.length)]
      else if (r3 <= 10000 && r3 > 8000) arr[i] = thuR[Math.floor(Math.random() * thuR.length)]
      else if (r3 <= 18000 && r3 > 10000) arr[i] = thuC[Math.floor(Math.random() * thuC.length)]
      else if (r3 <= 19500 && r3 > 18000) arr[i] = thuE[Math.floor(Math.random() * thuE.length)]
      else if (r3 <= 20000 && r3 > 18500) arr[i] = thuD[Math.floor(Math.random() * thuD.length)]
      else arr[i] = thuC[Math.floor(Math.random() * thuC.length)]

    }
  }
  else {//logic khi ko dùng gì cả
    for (var i = 0; i < hesothat; i++) {
      let r1 = Math.floor(Math.random() * 10000)
      let r2 = Math.floor(Math.random() * 10000)
      let r3 = r1 + r2
      number[i] = `${r3}`
      if (r3 <= 1000) arr[i] = thuE[Math.floor(Math.random() * thuE.length)]
      else if (r3 <= 2000 && r3 > 1000) arr[i] = thuC[Math.floor(Math.random() * thuC.length)]
      else if (r3 <= 7000 && r3 > 2000) arr[i] = thuU[Math.floor(Math.random() * thuU.length)]
      else if (r3 <= 11000 && r3 > 7000) arr[i] = thuR[Math.floor(Math.random() * thuR.length)]
      else if (r3 <= 16000 && r3 > 11000) arr[i] = thuC[Math.floor(Math.random() * thuC.length)]
      else if (r3 <= 18000 && r3 > 16000) arr[i] = thuSR[Math.floor(Math.random() * thuSR.length)]
      else arr[i] = thuC[Math.floor(Math.random() * thuC.length)]

    }
  }
  console.log(`PRO : ${pro} || VIP : ${vip}
LUCKY : ${lucky} || HESO : ${heso} || DOUBLE : ${double} 
${arr}
${number}`)

  //CHAY CODE
  return arr
            }
function checkthu(c, u, r, sr, e, p, g, d, v, thu) {

  if (c.includes(thu)) result = `C`
  if (u.includes(thu)) result = `U`
  if (r.includes(thu)) result = `R`
  if (sr.includes(thu)) result = `SR`
  if (e.includes(thu)) result = `E`
  if (p.includes(thu)) result = `P`
  if (g.includes(thu)) result = `G`
  if (d.includes(thu)) result = `D`
  if (v.includes(thu)) result = `V`
  return result
}
function checkpoint(c, u, r, sr, e, p, g, d, v, thu) {
  if (c.includes(thu)) result = 1
  if (u.includes(thu)) result = 2
  if (r.includes(thu)) result = 5
  if (sr.includes(thu)) result = 10
  if (e.includes(thu)) result = 20
  if (p.includes(thu)) result = 1000
  if (g.includes(thu)) result = 75
  if (d.includes(thu)) result = 175
  if (v.includes(thu)) result = 5000
  return result
}