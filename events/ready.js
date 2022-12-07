const { EventEmitter } = require('node:events');
const { setTimeout, setInterval } = require('node:timers');
const { writeFile, readFile, access } = require('node:fs/promises');
const mongoose = require('mongoose');
const mongo_url = process.env.mongo_url
module.exports = {
  name: 'ready',
  once: true,
 async execute(client) {
    mongoose.connect("mongodb+srv://rlx:rlx@rlx1.qqf2i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(console.log(`Đã kết nối với MONGODB`));
    console.log(`Đã sẵn sàng! Đăng nhập CODE dưới tên ${client.user.tag}`);
  }
}


