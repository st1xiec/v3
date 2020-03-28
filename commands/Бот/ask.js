const Discord = module.require('discord.js');
module.exports.run = async (bot, message, args) => {
    try {
  
        if (!message.member.hasPermission('BAN_MEMBERS')) return;
        let rUser = message.guild.member(message.mentions.users.first() || bot.users.get(args[0]) || message.guild.members.get(args[0]));
        let embed = new Discord.RichEmbed()
            .setTitle(`Ответ на репорт от Администратора/Куратора:  ${message.author.tag} `)
            .setColor('RANDOM');
        if (!args[0] || !rUser) { bot.sendErrEmbed(embed, '💁‍Укажите участника через @', true, message); }
        let ot = args.slice(1).join(" ");
        embed.setDescription(`**${ot}**`);
        await rUser.send(embed);
        embed.setDescription(`**Сообщение доставлено: ${rUser.user.tag}**`);
        await message.channel.send(embed);
    } catch (err) {
        bot.logsErr(err)
    }
};
module.exports.help = {
    name: 'ask',
    description: 'Команда для Куратора/Модератора для ответа вам "Участнику сервера"',
    aliases: ['вдуплить', `ask`, 'сказатьему'],
    category: "Инструменты",
    usages: { '!ask #user0001 text': 'Отправит #user0001 в личные сообщения text' },
}; 