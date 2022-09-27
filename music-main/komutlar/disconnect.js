const Discord = require("discord.js");
const { RichEmbed } = require("discord.js");
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const youtube = new YouTube("AIzaSyA5HyLl_vAY3Ykdv1w1NDFyvL3WXTTDIqs"); // apı key bölümü

exports.run = async (client, message, args) => {
  const queue = client.queue;

  var searchString = args.slice(0).join(" ");
  var url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
  var serverQueue = queue.get(message.guild.id);

  var voiceChannel = message.member.voiceChannel;

  const err1 = new RichEmbed()
    .setColor("#0f0f0f")
    .setDescription(
      `:x: **Bu komutu kullanabilmek için ses kanalında olmalısınız.**`
    );
  if (!voiceChannel) return message.channel.send(err1);
  const err2 = new RichEmbed()
    .setColor("#0f0f0f")
    .setDescription(`:x: Şu anda çalan şarkı yok.`);
  if (!serverQueue) return message.channel.send(err2);
  serverQueue.songs = [];
  const songEnd = new RichEmbed()
    .setColor("#0f0f0f")
    .setDescription(`:mailbox_with_no_mail: Başarıyla müzik kapatıldı!`);
  serverQueue.connection.dispatcher.end("");
  message.channel.send(songEnd);
};

exports.conf = {
  enabled: true,
  aliases: ["stop", "durdur", "kapat", "exit"],
  permLevel: 0
};

exports.help = {
  name: "disconnect",
  description: "Botu Kanaldan Çıkartır ve Şarkıyı Kapatır.",
  usage: "stop"
};
