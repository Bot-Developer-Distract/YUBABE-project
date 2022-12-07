// Đây là file hỗ trợ thu gọn cách các Schema Hoạt Động!
const overrideWithinDay = false
const moneySchema = require('../models/moneySchema')
const praySchema = require('../models/praySchema')
const bankSchema = require('../models/bankSchema')
const vipSchema = require('../models/vipSchema')
const animalSchema = require('../models/animalSchema')
const farmSchema = require('../models/farmSchema')
const zoopointSchema = require('../models/zoopointSchema')
const gemSchema = require('../models/gemSchema')
const buffSchema = require('../models/buffSchema')
const cooldownSchema = require('../models/cooldownSchema')
const userSchema = require('../models/userSchema')
const characterSchema = require('../models/characterSchema')
const CONFIG = require('../config/config.json')
const DO = require('../config/do.json')
const items = require('../config/item.json')
const client = require("../index.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()
const itemSchema = require('../models/itemSchema')
client.custom = async (id, types, args) => {
let res = ""
const customSchema = require("../models/customSchema")
  if (args) {
  const userId = args[0]
  const typed = args[1]
  let custom = await customSchema.findOne({authorid: userId, type: typed})
  if (!custom) {
    let newcus = new customSchema({
     authorid: userId,
     content: args.slice(2).join(" "),
     type: typed
    })
    await newcus.save()
 }
  else {
    custom.content = args.slice(2).join(" ")
    await custom.save()
  }
}
  else {
    let custom = await customSchema.findOne({authorid : id, type: types})
    if (!custom) return  res = false
    else if (custom) res = custom.content
  return res
  }
}
client.provip = async (message) => {
let vip = false
      let pro = false
      const provip = await vipSchema.findOne({ memberid: message.author.id })
      if (provip) {
        const date = await client.datepassport(message.author.id)
        const status = await client.checkpassport(date)
        let end = status.after
        if (!end && provip.type == `<:VIPPassport:988093810955411456>`) vip = true
        if (!end && provip.type == `<:ProPassport:988093838348410930>`) pro = true
      }
  return {vip: vip, pro: pro}
}
client.item = async (id, method, name, amount, type) => {
  let item = await itemSchema.findOne({ id: id, name: name })
  if (method == null) {
    if (!item) {
      let newitem = new itemSchema({
        id: id,
        name: name,
        quanlity: amount,
        type: type
      })
      await newitem.save()
      return item = amount
    }
    else return item = item.quanlity
  }
  else if (method == `cong`) {
    if (amount == null) amount = 1
    if (!item) {
      let newitem = new itemSchema({
        id: id,
        name: name,
        quanlity: amount,
        type: type
      })
      await newitem.save()
    }
    else {
      if (amount == null) amount = 1
      item.quanlity += amount
      await item.save()
      return item = item.quanlity
    }

  }
  else if (method == `tru`) {
    if (!item) return item = 0
    if (amount == null) amount = 1
    item.quanlity -= amount
    await item.save()
    return item = item.quanlity
  }
  return item
}
client.send = async (client, message, content, embeds) => {

  const yukii = client.users.cache.find(u => u.id == `896739787392819240`)
  let language = await db.get(`${message.guild.id}_languages`)
  const region = message.guild.preferredLocale
  if (!language) {
    if (region == "vi") await db.set(`${message.guild.id}_languages`, "vi")
    else await db.set(`${message.guild.id}_languages`, "en")
    await yukii.send(`${message.guild.name} đã được set Region **${message.guild.preferredLocale}**`)
  }
  let msg
  if (embeds && content) {
    if (language == "vi") {
      msg = await message.channel.send({ content: content[0], embeds: [embeds[0]] })
    }
    else if (language == "en") {
      msg = await message.channel.send({ content: content[1], embeds: [embeds[1]] })
    }
  }
  else if (embeds == null) {
    if (language == "vi") {
      msg = await message.channel.send(content[0])
    }
    else if (language == "en") {
      msg = await message.channel.send(content[1])
    }
  }
  else if (content == null) {
    if (language == "vi") {
      msg = await message.channel.send({ embeds: [embeds[0]] })
    }
    else if (language == "en") {
      msg = await message.channel.send({ embeds: [embeds[1]] })
    }
  }
  return msg
}
client.dms = async (client, message, user, content, embeds, attachment) => {

  const yukii = client.users.cache.find(u => u.id == `896739787392819240`)
  let language = await db.get(`${message.guild.id}_languages`)
  const region = message.guild.preferredLocale
  if (!language) {
    if (region == "vi") await db.set(`${message.guild.id}_languages`, "vi")
    else await db.set(`${message.guild.id}_languages`, "en")
    await yukii.send(`${message.guild.name} đã được set Region **${message.guild.preferredLocale}**`)
  }
  let msg
  if (embeds && content && attachment) {
    if (language == "vi") {
      msg = await user.send({ content: content[0], embeds: [embeds[0]], files: [attachment] })
    }
    else if (language == "en") {
      msg = await user.send({ content: content[1], embeds: [embeds[1]], files: [attachment] })
    }
  }
  else if (embeds == null && content && attachment) {
    if (language == "vi") {
      msg = await user.send({ content: content[0], files: [attachment] })
    }
    else if (language == "en") {
      msg = await user.send({ content: content[1], files: [attachment] })
    }
  }
  else if (content == null && embeds && attachment) {
    if (language == "vi") {
      msg = await user.send({ embeds: [embeds[0]], files: [attachment] })
    }
    else if (language == "en") {
      msg = await user.send({ embeds: [embeds[1]], files: [attachment] })
    }
  }
  else if (attachment == null && embeds && content) {
    if (language == "vi") {
      msg = await user.send({ content: content[0], embeds: [embeds[0]] })
    }
    else if (language == "en") {
      msg = await user.send({ content: content[1], embeds: [embeds[1]] })
    }
  }
  else if (content == null && embeds == null) {
    msg = await user.send({ files: [attachment] })
  }
  else if (content == null && attachment == null) {
    if (language == "vi") {
      msg = await user.send({ embeds: [embeds[0]] })
    }
    else if (language == "en") {
      msg = await user.send({ embeds: [embeds[1]] })
    }
  }
  else if (embeds == null && attachment == null) {
    if (language == "vi") {
      msg = await user.send({ content: content[0] })
    }
    else if (language == "en") {
      msg = await user.send({ content: content[1] })
    }
  }

  return msg
}
client.sendFile = async (client, message, content, attachments) => {

  const yukii = client.users.cache.find(u => u.id == `896739787392819240`)
  let language = await db.get(`${message.guild.id}_languages`)
  const region = message.guild.preferredLocale
  if (!language) {
    if (region == "vi") await db.set(`${message.guild.id}_languages`, "vi")
    else await db.set(`${message.guild.id}_languages`, "en")
    await yukii.send(`${message.guild.name} đã được set Region **${message.guild.preferredLocale}**`)
  }
  let msg
  if (attachments && content) {
    if (language == "vi") {
      msg = await message.channel.send({ content: content[0], files: [attachments] })
    }
    else if (language == "en") {
      msg = await message.channel.send({ content: content[1], files: [attachments] })
    }
  }
  else if (attachments == null) {
    if (language == "vi") {
      msg = await message.channel.send(content[0])
    }
    else if (language == "en") {
      msg = await message.channel.send(content[1])
    }
  }
  else if (content == null) {
    if (language == "vi") {
      msg = await message.channel.send({ files: [attachments] })
    }
    else if (language == "en") {
      msg = await message.channel.send({ files: [attachments] })
    }
  }

  return msg
}
client.reply = async (client, message, content, embeds) => {

  const yukii = client.users.cache.find(u => u.id == `896739787392819240`)
  let language = await db.get(`${message.guild.id}_languages`)
  const region = message.guild.preferredLocale
  if (!language) {
    if (region == "vi") await db.set(`${message.guild.id}_languages`, "vi")
    else await db.set(`${message.guild.id}_languages`, "en")
    await yukii.send(`${message.guild.name} đã được set Region **${message.guild.preferredLocale}**`)
  }
  let msg
  if (embeds && content) {
    if (language == "vi") {
      msg = await message.reply({ content: content[0], embeds: [embeds[0]] })
    }
    else if (language == "en") {
      msg = await message.reply({ content: content[1], embeds: [embeds[1]] })
    }
  }
  else if (embeds == null) {
    if (language == "vi") {
      msg = await message.reply(content[0])
    }
    else if (language == "en") {
      msg = await message.reply(content[1])
    }
  }
  else if (content == null) {
    if (language == "vi") {
      msg = await message.reply({ embeds: [embeds[0]] })
    }
    else if (language == "en") {
      msg = await message.reply({ embeds: [embeds[1]] })
    }
  }
  return msg

}
client.echo = async function echo(content, message) {
  let result;
  if (!content) result = "Bạn phải nhập gì đó"
  else result = content
  await message.channel.send(result)
}
client.hg = CONFIG.hatgiong
client.admins = CONFIG.admins
client.emo = DO.lenh
client.vukhi = items.vukhi
client.daren = items.daren
client.inv = items.tieuhao
client.e = CONFIG.emoji
client.activatepassport = (id, type) => {
  vipSchema.findOne({ memberid: id, type: type }, async (err, data) => {
    if (err) throw err
    if (data) {
      data.used = Date.now();
    } else {
      data = new vipSchema({ memberid: id, type: type, used: Date.now() })
    }
    data.save();
  }
  );
}
client.datepassport = (id) => new Promise(async ful => {
  const data = await vipSchema.findOne({ memberid: `${id}` });
  if (!data) return ful(null);
  ful(data.used);
})
client.checkpassport = function(date) {
  let timeout = date + 2629743830;
  let temp = Math.trunc(((timeout - Date.now())) / 1000);
  let seconds = temp % 60;
  temp = Math.trunc(temp / 60);
  let minutes = temp % 60
  temp = Math.trunc(temp / 60);
  let hours = temp % 24;
  temp = Math.trunc(temp / 24);
  let days = temp;

  /* If there is no data */
  if (!date) return { after: true, s: seconds, m: minutes, h: hours, d: days };
  let diff = Date.now() - timeout
  /* Not past midnight */
  if (diff <= 0) return { after: false, diff: diff, s: seconds, m: minutes, h: hours, d: days };
  else return { after: true, diff: diff, withinDay: (overrideWithinDay || false), s: seconds, m: minutes, h: hours, d: days };
}
client.sonho = function toSmallNum(array, count, digits) {
  var result = '';
  var num = count;
  if (count < 0) count = 0;
  for (i = 0; i < digits; i++) {
    var digit = count % 10;
    count = Math.trunc(count / 10);
    result = array.numbers[digit] + result;
  }
  return result;
}
client.checktienhg = async function(array, hg) {
  if (hg == array[0]) return result = 500
  if (hg == array[1]) return result = 500
  if (hg == array[2]) return result = 800
  if (hg == array[3]) return result = 800
  if (hg == array[4]) return result = 1000
  if (hg == array[5]) return result = 1000
  if (hg == array[6]) return result = 1500
  if (hg == array[7]) return result = 1500
  if (hg == array[8]) return result = 3000
  if (hg == array[9]) return result = 3000
  if (hg == array[10]) return result = 5000
  if (hg == array[11]) return result = 5000
  if (hg == array[12]) return result = 15000
  if (hg == array[13]) return result = 10000
  if (hg == array[14]) return result = 15000
  if (hg == array[15]) return result = 18000
}
client.addcs = async function(id, name, loaichiso, soluong) {
  const data = await characterSchema.findOne({ memberid: id });
  if (loaichiso == `sucmanh`) {
    data.sucmanh += soluong
    await data.save()
  } else if (loaichiso == `nhanhnhen`) {
    data.nhanhnhen += soluong
    await data.save()
  } else if (loaichiso == `triluc`) {
    data.triluc += soluong
    await data.save()
  } else if (loaichiso == `maluc`) {
    data.maluc += soluong
    await data.save()
  } else if (loaichiso == `hapdan`) {
    data.hapdan += soluong
    await data.save()
  } else if (loaichiso == `theluc`) {
    data.theluc += soluong
    await data.save()
  } else if (loaichiso == `exp`) {
    data.exp += soluong
    await data.save()
  } else if (loaichiso == `level`) {
    data.level += soluong
    await data.save()
  } else if (loaichiso == `hp`) {
    data.hp += soluong
    await data.save()
  } else if (loaichiso == `mana`) {
    data.mana += soluong
    await data.save()
  } else if (loaichiso == `def`) {
    data.def += soluong
    await data.save()
  } else if (loaichiso == `magicdef`) {
    data.magicdef += soluong
    await data.save()
  }
  if (!data) {

    return result = false
  }
  return result = true

}
client.trucs = async function(id, name, loaichiso, soluong) {
  const data = await characterSchema.findOne({ memberid: id });
  if (loaichiso == `sucmanh`) {
    data.sucmanh -= soluong
    await data.save()
  } else if (loaichiso == `nhanhnhen`) {
    data.nhanhnhen -= soluong
    await data.save()
  } else if (loaichiso == `triluc`) {
    data.triluc -= soluong
    await data.save()
  } else if (loaichiso == `maluc`) {
    data.maluc -= soluong
    await data.save()
  } else if (loaichiso == `hapdan`) {
    data.hapdan -= soluong
    await data.save()
  } else if (loaichiso == `theluc`) {
    data.theluc -= soluong
    await data.save()
  } else if (loaichiso == `exp`) {
    data.exp -= soluong
    await data.save()
  } else if (loaichiso == `level`) {
    data.level -= soluong
    await data.save()
  } else if (loaichiso == `hp`) {
    data.hp -= soluong
    await data.save()
  } else if (loaichiso == `mana`) {
    data.mana -= soluong
    await data.save()
  } else if (loaichiso == `def`) {
    data.def -= soluong
    await data.save()
  } else if (loaichiso == `magicdef`) {
    data.magicdef -= soluong
    await data.save()
  }
  if (!data) {
    return result = false
  }
  return result = true

}
client.yuker = async function(id) {
  const data = await userSchema.findOne({ memberid: id });
  if (!data) {
    return { status: false, name: `Người Dùng Vô Danh`, vip: `Chưa Đăng Ký`, pro: `Chưa Đăng Ký`, about: `Không Có Danh Hiệu`, description: `Không Có Giới Thiệu` }
  }
  else {
    return { status: true, name: data.membername, vip: data.vip, pro: data.pro, about: data.about, description: data.description }
  }
}
client.adduser = async function(id, name) {
  const data = await userSchema.findOne({ memberid: id });
  if (!data) {
    const add = new userSchema({
      memberid: id,
      membername: name,
      vip: `Chưa Đăng Ký`,
      pro: `Chưa Đăng Ký`,
      avatar: ``,
      about: `Nông Dân Chăm Chỉ`,
      description: `Người Bạn Thân Thiện Của Yubabe`,
    })
    add.save()
    return result = true
  }
  else return result = false
}
client.sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
client.timeout = (id, cmd) => {
  cooldownSchema.findOne({ key: `${id}.${cmd}` }, async (err, data) => {
    if (err) throw err
    if (data) {
      data.cooldown = Date.now();
    } else {
      data = new cooldownSchema({ key: `${id}.${cmd}`, cooldown: Date.now() })
    }
    data.save();
  }
  );
}
client.cd = (id, cmd) => new Promise(async ful => {
  const data = await cooldownSchema.findOne({ key: `${id}.${cmd}` });
  if (!data) return ful(null);
  ful(data.cooldown);
})
client.checkcd = function(date, cd) {
  let timeout = date + cd;
  let temp = Math.trunc(((timeout - Date.now())) / 1000);
  let seconds = temp % 60;
  temp = Math.trunc(temp / 60);
  let minutes = temp % 60
  temp = Math.trunc(temp / 60);
  let hours = temp % 24;
  temp = Math.trunc(temp / 24);
  let days = temp;

  /* If there is no data */
  if (!date) return { after: true, s: seconds, m: minutes, h: hours, d: days };
  let diff = Date.now() - timeout
  /* Not past midnight */
  if (diff <= 0) return { after: false, diff: diff, s: seconds, m: minutes, h: hours, d: days };
  else return { after: true, diff: diff, withinDay: (overrideWithinDay || false), s: seconds, m: minutes, h: hours, d: days };
}
client.newday = async function(date) {
  let now = new Date(Date.now() + 25200000);
  let midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(Date.now() + 25200000));

  /* Calculate time until midnight */
  let temp = Math.trunc(((midnight - now) + 86400000) / 1000);
  let seconds = temp % 60;
  temp = Math.trunc(temp / 60);
  let minutes = temp % 60
  temp = Math.trunc(temp / 60);
  let hours = temp % 24;
  temp = Math.trunc(temp / 24);
  let days = temp;

  /* If there is no data */
  if (!date) return { after: true, seconds: seconds, minutes: minutes, hours: hours, days: days, now };

  let pDate = new Date(date + 25200000);
  let diff = midnight - pDate;

  /* Not past midnight */
  if (diff <= 0) return { after: false, diff: diff, seconds: seconds, minutes: minutes, hours: hours, days: days, now };

  /* Within 1 day */
  else if (diff <= 172810000) return { after: true, diff: diff, withinDay: true, seconds: seconds, minutes: minutes, hours: hours, days: days, now };

  /* Over 1 full day */
  else return { after: true, diff: diff, withinDay: (overrideWithinDay || false), seconds: seconds, minutes: minutes, hours: hours, days: days, now };
}
//xem ngọc
client.gem = (memberid, typeS) => new Promise(async ful => {
  const data = await gemSchema.findOne({ memberid: memberid, typeS: typeS });
  if (!data) return ful(0);
  ful(data.quanlity);
})
//add ngọc
client.addgem = (memberid, types, quanlity, type) => {
  gemSchema.findOne({ memberid: memberid, typeS: types }, async (err, data) => {
    if (err) throw err
    if (data) {
      data.quanlity += quanlity;
      data.type = type
    } else {
      data = new gemSchema({ memberid: memberid, typeS: types, quanlity: quanlity, type: type })
    }
    data.save();
  }
  );
}
//trừ ngọc
client.trugem = (memberid, type, quanlity) => {
  gemSchema.findOne({ memberid, typeS: type }, async (err, data) => {
    if (err) throw err
    if (data) {
      data.quanlity -= quanlity;
    } else {
      return
    }
    data.save();
  }
  );
}
//xem buff
client.buff = (memberid, type) => new Promise(async ful => {
  const data = await buffSchema.findOne({ memberid: memberid, type: type });
  if (!data) return ful(0);
  ful(data.quanlity);
})
//add buff
client.addbuff = (memberid, type, quanlity, heso) => {
  buffSchema.findOne({ memberid, type }, async (err, data) => {
    if (err) throw err
    if (data) {
      data.quanlity += quanlity;
      data.heso = heso
    } else {
      data = new buffSchema({ memberid: memberid, quanlity: quanlity, type: type, heso: heso })
    }
    data.save();
  }
  );
}
//trừ buff
client.trubuff = (memberid, type, quanlity) => {
  buffSchema.findOne({ memberid, type }, async (err, data) => {
    if (err) throw err
    if (data) {
      data.quanlity -= quanlity;
    } else {
      return
    }
    data.save();
  }
  );
}
// XEM nông sản
client.grow = (id, name) => new Promise(async ful => {
  const data = await farmSchema.findOne({ memberid: id, name: name });
  if (!data) return ful(0);
  ful(data.quanlity);
})
//THÊM Nông sản KHI MUA HOẶC THU HOẠCH
client.addgrow = (id, name, quanlity, type) => {
  farmSchema.findOne({ memberid: id, name: name }, async (err, data) => {
    if (err) throw err
    if (data) {
      data.quanlity += quanlity;
    } else {
      data = new farmSchema({ memberid: id, name: name, quanlity: quanlity, type: type })
    }
    data.save();
  }
  );
}
//TRỪ nông sản
client.trugrow = (id, name, quanlity, type) => {
  farmSchema.findOne({ memberid: id, name: name }, async (err, data) => {
    if (err) throw err
    if (data) {
      data.quanlity -= quanlity;
    } else {
      return
    }
    data.save();
  }
  );
}
// cái này là hunt thú
client.animal = (id, name, quanlity, type) => {
  animalSchema.findOne({ id, name }, async (err, animals) => {
    if (err) throw err
    if (animals) {
      animals.quanlity += quanlity;
      await animals.save()
    } else {
      const addanimals = new animalSchema({ id: id, name: name, quanlity: quanlity, type: type })
      await addanimals.save()
    }

  }
  );
}
// cái này là bán thú
client.banthu = (name, quanlity) => {
  animalSchema.findOne({ name }, async (err, data) => {
    if (err) throw err
    if (data) {
      data.quanlity -= quanlity;
    } else {
      return
    }
    data.save();
  }
  );
}
//cái này là xem hạt giống

// cái này là xem zoo
client.zoo = (name) => new Promise(async ful => {
  const data = await animalSchema.findOne({ name });
  if (!data) return ful(0)
  ful(data.quanlity);
})
// check tiền
client.cash = (id) => new Promise(async ful => {
  const data = await moneySchema.findOne({ id });
  if (!data) return ful(0);
  ful(data.coins);
})
// add tiền
client.cong = (id, coins) => {
  moneySchema.findOne({ id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      data.coins += coins;
    } else {
      data = new moneySchema({ id, coins })
    }
    data.save();
  })
}
// trừ tiền
client.tru = (id, coins) => {
  moneySchema.findOne({ id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      data.coins -= coins;
    } else {
      data = new moneySchema({ id, coins: -coins })
    }
    data.save();
  })
}
// gửi tiền
client.tietkiem = (id, coins) => {
  bankSchema.findOne({ id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      data.coins += coins;
    } else {
      data = new bankSchema({ id, coins: +coins })
    }
    data.save();
  })
}
// rút tiền
client.ruttien = (id, coins) => {
  bankSchema.findOne({ id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      data.coins -= coins;
    } else {
      data = new bankSchema({ id, coins: -coins })
    }
    data.save();
  })
}
// check bank
client.bank = (id) => new Promise(async ful => {
  const data = await bankSchema.findOne({ id });
  if (!data) return ful(0);
  ful(data.coins);
})
// số pray
client.prayed = (id) => new Promise(async ful => {
  const data = await praySchema.findOne({ id });
  if (!data) return ful(0);
  ful(data.prays);
})
// cộng pray
client.pray = (id) => {
  praySchema.findOne({ id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      data.prays += 1;
    } else {
      data = new praySchema({ id, prays: 1 })
    }
    data.save();
  })
}
client.curse = (id) => {
  praySchema.findOne({ id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      data.prays -= 1;
    }
    else {
      data = new praySchema({ id, prays: -1 })
    }
    data.save();
  })

}
//cộng point zoo
client.addpoint = (zooid, quanlity) => {
  zoopointSchema.findOne({ zooid }, async (err, zoopoint) => {
    if (err) throw err
    if (zoopoint) {
      zoopoint.quanlity += quanlity;
    } else {
      zoopoint = new zoopointSchema({ zooid: zooid, quanlity: quanlity })
    }
    zoopoint.save();
  }
  );
}
//xem point zoo
client.zoopoint = (zooid) => new Promise(async ful => {
  const data = await zoopointSchema.findOne({ zooid });
  if (!data) return ful(0);
  ful(data.quanlity);
})
