const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

var prefix = ayarlar.prefix;

module.exports = client => {
  var dinliyor = ["+yardım Botun Komutlarını Gösterir.", "+p ile Müzik Açabilirsiniz.", "made by can", "Use Code : CQN-WRLD"]; //Oynuyor kısmı

  setInterval(function() {
    var random = Math.floor(Math.random() * (dinliyor.length - 0 + 1) + 0);

    client.user.setActivity(dinliyor[random], "Made by Can");
  }, 2 * 2500);

  console.log(
    `[${moment().format("YYYY-MM-DD HH:mm:ss")}] BOT: Aktif, Komutlar yüklendi!`
  );
  console.log(
    `[${moment().format("YYYY-MM-DD HH:mm:ss")}] BOT: ${
      client.user.username
    } ismi ile giriş yapıldı!`
  );
  client.user.setStatus("online");
  client.user.setActivity(
  );
  console.log(
    `[${moment().format("YYYY-MM-DD HH:mm:ss")}] BOT: Oyun ismi ayarlandı!`
  );
};
