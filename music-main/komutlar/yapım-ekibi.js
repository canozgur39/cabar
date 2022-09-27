const Discord = require("discord.js");

exports.run = (client, message, args) => {
  var embed = new Discord.RichEmbed()

    .setTitle(`Can'ın Music Botu`)
    .setAuthor(`Bot Bilgi`, message.author.avatarURL)
    .setColor("RANDOM")
    .setThumbnail(client.user.avatarURL)
    .addField(` **Botun Kullanıcı Sayısı**`, client.users.size)
    .addField(` **Botun Olduğu Sunucu Sayısı**`, client.guilds.size)
    .addField(` **Bottaki Komut Sayısı**`, client.commands.size)
    .addField(
      ` **Bot Kurucu / Yapımcı / Geliştirici **`,
      `<@353461160537751552>`,
      true
    )
    .setTimestamp();
  message.channel.sendEmbed(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["information", "bilgi", "yapımekibi", "invite"],
  permLevel: 0
};

exports.help = {
  name: "botyapımekibi",
  description: "Yapım Ekibini Gösterir",
  usage: "botbilgi"
};
