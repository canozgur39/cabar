const Discord = require("discord.js");
const { RichEmbed } = require("discord.js");
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const youtube = new YouTube("AIzaSyA5HyLl_vAY3Ykdv1w1NDFyvL3WXTTDIqs"); //apı key bölümü

exports.run = async (client, message, args) => {
  const queue = client.queue;

  var searchString = args.slice(0).join(" ");
  var url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
  var serverQueue = queue.get(message.guild.id);

  var voiceChannel = message.member.voiceChannel;

  const err0 = new RichEmbed()
    .setColor("#0f0f0f")
    .setDescription(
      `:x: **Bu komutu kullanabilmek için ses kanalında olmalısınız.**`
    );
  if (!voiceChannel) return message.channel.send(err0);
  const err05 = new RichEmbed()
    .setColor("#0f0f0f")
    .setDescription(`:x: Şu anda çalan bir müzik yok.`);
  if (!serverQueue) return message.channel.send(err05);
  const songSkip = new RichEmbed()
    .setColor("#0f0f0f")
    .setDescription(`Müzik başarıyla atlandı!`);
  serverQueue.connection.dispatcher.end("");
  message.channel.send(songSkip);
  if (!message.member.hasPermission("KİCK_MEMBERS"))
    return message.reply(
      ":x: **Bu komut ya ** `DJ` ** ya da **` Kanalları Yönet` ** adlı bir rolün olmasını gerektirir ** kullanma izni ** (botla yalnız kalmak da işe yarıyor))"
    );
};

exports.conf = {
  enabled: true,
  aliases: ["skip", "geç", "atla", "next"],
  permLevel: 0
};

exports.help = {
  name: "skip",
  description: "Sıradaki şarkıya geçer. Sırada şarkı yoksa şarkıyı kapatır.",
  usage: "skip"
};
