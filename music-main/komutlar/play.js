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

  const embed = new RichEmbed()
    .setColor("#0f0f0f")
    .setTitle("Açmamı İstediğin Müziğin Adını Girmelisin.")
    .setDescription("Örneğin ; !p Küllenen Aşk ");
  if (!args[0]) return message.channel.send(embed);

  const voiceChannelAdd = new RichEmbed()
    .setColor("#0f0f0f")
    .setDescription(
      `:x: **Bu komutu kullanabilmek için ses kanalında olmalısınız**`
    );
  if (!voiceChannel) return message.channel.send(voiceChannelAdd);

  var permissions = voiceChannel.permissionsFor(client.user);
  if (!permissions.has("CONNECT")) {
    const warningErr = new RichEmbed()
      .setColor("#0f0f0f")
      .setDescription(
        `:x: Herhangi bir ses kanalına katılmak için yeterli iznim yok.`
      );
    return message.channel.send(warningErr);
  }
  if (!permissions.has("SPEAK")) {
    const musicErr = new RichEmbed()
      .setColor("#0f0f0f")
      .setDescription(
        `:x: Müziği açamıyorum / şarkı çalamıyorum çünkü kanalda konuşma iznim yok veya mikrofonum kapalı.`
      );
    return message.channel.send(musicErr);
  }
  if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
    var playlist = await youtube.getPlaylist(url);
    var videos = await playlist.getVideos();
    for (const video of Object.values(videos)) {
      var video2 = await youtube.getVideoByID(video.id);
      await handleVideo(video2, message.message, voiceChannel, true);
    }
    const PlayingListAdd = new RichEmbed()
      .setColor("#0f0f0f")
      .setDescription(
        `[${playlist.title}](https://www.youtube.com/watch?v=${playlist.id}) added to the playlist of the song!`
      );
    return message.channel.send(PlayingListAdd);
  } else {
    try {
      var video = await youtube.getVideo(url);
    } catch (error) {
      try {
        var videos = await youtube.searchVideos(searchString, 10);

        var r = 1;

        var video = await youtube.getVideoByID(videos[r - 1].id);
      } catch (err) {
        console.error(err);
        const songNope = new RichEmbed()
          .setColor("#0f0f0f")
          .setDescription(`:x: Aradığınız adla hiçbir şarkı bulunamadı!`);
        return message.channel.send(songNope);
      }
    }
    return handleVideo(video, message, voiceChannel);
  }

  async function handleVideo(video, message, voiceChannel, playlist = false) {
    var serverQueue = queue.get(message.guild.id);

    var song = {
      id: video.id,
      title: video.title,
      durationh: video.duration.hours,
      durationm: video.duration.minutes,
      durations: video.duration.seconds,
      url: `https://www.youtube.com/watch?v=${video.id}`,
      thumbnail: `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`,
      requester: message.author.tag
    };
    if (!serverQueue) {
      var queueConstruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 100,
        playing: true
      };
      queue.set(message.guild.id, queueConstruct);

      queueConstruct.songs.push(song);

      try {
        var connection = await voiceChannel.join();
        queueConstruct.connection = connection;
        play(message.guild, queueConstruct.songs[0]);
      } catch (error) {
        console.error(`:x: HATA ses kanalına giremedim : ${error}`);
        queue.delete(message.guild.id);
        return message.channel.send(
          `:x: ERROR ses kanalına giremedim: ${error}`
        );
      }
    } else {
      serverQueue.songs.push(song);

      if (playlist) return undefined;

      const songListBed = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(
          `[${song.title}](https://www.youtube.com/watch?v=${song.id}) added to queue!`
        );
      return message.channel.send(songListBed);
    }
    return undefined;
  }
  function play(guild, song) {
    var serverQueue = queue.get(guild.id);

    if (!song) {
      serverQueue.voiceChannel.leave();
      voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }

    const dispatcher = serverQueue.connection
      .playStream(ytdl(song.url))
      .on("end", reason => {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
      })
      .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);

    let y = "";
    if (song.durationh === 0) {
      y = `${song.durationm || 0}:${song.durations || 0}`;
    } else {
      y = `${song.durationh || 0}:${song.durationm || 0}:${song.durations ||
        0}`;
    }

    const playingBed = new RichEmbed()
      .setColor("#0f0f0f")
      .setAuthor(`Şimdi Çalıyor`, song.thumbnail)
      .setDescription(`[${song.title}](${song.url})`)
      .addField("Şuanda oynatılan müziğin süresi", `${y}`, true)
      .addField("Şarkıyı açan kullanıcı", `${song.requester}`, true)
      .setThumbnail(song.thumbnail);
    serverQueue.textChannel.send(playingBed);
  }
};

exports.conf = {
  enabled: true,
  aliases: ["p", "play", "oynat", "çal"],
  permLevel: 0
};

exports.help = {
  name: "play",
  description:
    "Belirttiğiniz şarkıyı bulunduğunuz sesli kanalda çalar/oynatır.",
  usage: "p"
};
