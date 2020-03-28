module.exports.run = async (bot, message) => {
  if (!message.member.hasPermission("MANAGE_CHANNELS")) return;
  let embed = new global.MessageEmbed()
    .setColor("46DFFF")
    .setTitle("Статистика.");
  const data = {
    ChannelBotCount: null,
    ChannelUsersCount: null,
    ChannelVoiceOnline: null
  };
  const id = message.guild.roles.cache.find(e => e.name == "@everyone")
  await message.guild.channels.create(`🤖Количество ботов: ${message.guild.members.cache.filter(m => m.user.bot).size}`,{ type: "voice" })
    .then(channel => {
      data.ChannelBotCount = channel.id;
      channel.overwritePermissions([{
        id,
        allow: ['VIEW_CHANNEL'],
        deny: ["CONNECT"]
      }]);
      channel.setPosition(1);
    });
  await message.guild.channels.create(`👥Всего участников: ${message.guild.memberCount}`, {type: "voice"}).then(channel => {
      data.ChannelUsersCount = channel.id;
      channel.overwritePermissions([{
        id,
        allow: ['VIEW_CHANNEL'],
        deny: ["CONNECT"]
      }]);
      channel.setPosition(1);
    });
  await message.guild.channels.create(`🔊Голосовой онлайн: ${message.guild.members.cache.filter(m => m.voice.channel).size}`,{ type: "voice" }).then(channel => {
      data.ChannelVoiceOnline = channel.id;
      channel.overwritePermissions([{
        id,
        allow: ['VIEW_CHANNEL'],
        deny: ["CONNECT"]
      }]);
      channel.setPosition(1);
    });
  await global.Collection.Guild.upsertOne({ GuildId: message.guild.id }, data);
  embed.addField(message.author.tag, "**Статистика была успешно создана.**");
  message.channel.send(embed);
};
module.exports.help = {
  name: "createstats",
  aliases: [
    "createstats",
    "addstats",
    "channelstats",
    "voiceonline",
    "голосовойонлайн"
  ],
  description: "Создает статистику сервера из каналов на вашем сервере.",
  usages: { createstats: "Создать статистику." },
  category: "Настройка"
};