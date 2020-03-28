module.exports.run = async (bot, message) => {
  const { body } = await global.superagent.get(`https://random.dog/woof.json`);
  message.channel.send(new global.MessageEmbed().setColor("#fadbc8").setImage(body.url));
};
module.exports.help = {
    name: 'neko',
    aliases: ['дефкасушами', 'неко', 'нэко'],
    description: 'Получает фотографию девочки с ушками.',
    usages: { 'neko': 'Показывает вам эту деффку.' },
    category: "Развлечения"
}; 