module.exports.run = async (bot, message, args, data) => {
    const reason = args.slice(1).join(" "),
        rUser = await message.mentions.members.first() || message.guild.members.cache.get(bot.toNum(args[0]))
    if (!args[0]) return bot.sendErrEmbed(new global.MessageEmbed(), '💾 Укажите пользователя через @', message);
    if (!rUser) return bot.sendErrEmbed(new global.MessageEmbed(), '❌ Пользователь не найден.', message);
    if (!reason) return bot.sendErrEmbed(new global.MessageEmbed(), '🧾 Укажите текст жалобы', message);
    message.react('✅');
    message.react('📮');
    message.author.send(`**Ваш репорт на ${user} успешно отправлен. Ожидайте если понадобится c вами свяжутся.**`);
    let reportsChannel = await message.guild.channels.cache.get(data.Guild.reportChannel)
    if (!reportsChannel) {
        reportsChannel = await message.guild.channels.create(`👮‍reports-channel`, {
            type: 'text'
        })
        await global.Collection.Guild.upsertOne({
            GuildId: message.guild.id
        }, {
            reportChannel: reportsChannel.id
        })
        await reportsChannel.overwritePermissions([{
          id: message.guild.roles.cache.get(e => e == '@everyone'),
            allow: ["VIEW_CHANNEL"],
            deny: ["CONNECT"]
        }]);
        await reportsChannel.setPosition(1);
    }
    await reportsChannel.send(
        new global.MessageEmbed()
            .setColor('#36393f')
            .addField(`Новая жалоба.`, `**${message.author} Пожаловался на: ${rUser}**`)
            .addField(`Текст жалобы:`, reason)
    )
    message.delete()
    global.addMark(true, '⚜️', data.User, message);
};
module.exports.help = {
    name: 'report',
    aliases: ['rep', 'репорт', 'помогите'],
    description: 'Пожаловаться на участника',
    category: 'Модерирование',
    usages: {
        'report @User#0001 Text.': 'Отправит жалобу на @User#0001 Mодераторам.',
        'report @User#0001 Плохо себя ведет.': 'Отправит жалобу на @User#0001 Mодераторам (Плохо себя ведет.)'
    }
};