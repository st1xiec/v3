module.exports.run = async (bot, message, args) => {
    const rUser = await message.mentions.users.first() || bot.users.cache.get(bot.toNum(args[0])),
        embed = new global.MessageEmbed().setTitle(`Ответ разработчика.`).setColor('#36393f');
    if (!args[0]) return bot.sendErrEmbed(embed, '💁‍Укажи пользователя!', message);
    if (!rUser) return bot.sendErrEmbed(embed, 'Пользователь не найден!', message);
    embed.setDescription(`**${args.slice(1).join(" ")}**`);
    await rUser.send(embed);
    embed.setDescription(`**Сообщение доставлено: \`${rUser.tag}\`**`);
    message.channel.send(embed);
};
module.exports.help = {
    name: 'reply',
    description: 'Команда разработчиков, для ответа вам.',
    aliases: ['ot', 'ответить'],
    owneronly: true,
    category: "Разработка",
    usages: {
        'reply @User#0001 Text': 'Отправит пользователю `@User#0001` в личные сообщения: `Text`',
    },
};