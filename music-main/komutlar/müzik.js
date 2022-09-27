const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
var prefix = ayarlar.prefix;
exports.run = function(client, message) {
  const embed = new Discord.RichEmbed()
    .setColor("#FF0")
    .setTitle("⭐ Can'ın Music Botu Komutları")
    .setTimestamp()
    .addField("⭕ +oynat", prefix + "p yazarakta başlatabilirsiniz.")
    .addField(
      "⭕ +geç",
      prefix + "skip Şeklinde Sıradaki Şarkıya Geçebilirsiniz."
    )
    .addField(
      "⭕ +durdur",
      prefix + "stop Şarkıyı Kapatırsınız ve Botun Bağlantısını Kesersin."
    )
    .addField(
      "⭕ Botu sunucunuza eklemek istiyorsanız Yetkililere Dm Yoluyla Ulaşın."
    )
    .setFooter("⚡ 2020 Can'ın Music Botu", client.user.avatarURL)
    .setTimestamp()
    .setThumbnail(client.user.avatarURL);
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["help", "yardım", "müzik", "muzik", "komutlar"],
  permLevel: 0
};

exports.help = {
  name: "müzik",
  description: "Tüm komutları gösterir.",
  usage: "müzik"
};
