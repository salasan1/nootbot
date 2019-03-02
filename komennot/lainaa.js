const Discord = require('discord.js');
const moment = require("moment");
require("moment-duration-format");
const config = require('../config.json');
exports.run = (client, message, args) => {

  if (message.channel.permissionsFor(client.user.id).has("MANAGE_MESSAGES")) {
    message.delete();
  }

  if (!message.channel.permissionsFor(client.user.id).has("EMBED_LINKS")) {
      return message.channel.send(`<:X_:498898724500799489> **|** ${message.author} Minulla ei ole riittäviä oikeuksia. \`\`EMBED_LINKS\`\``);
  }
  const id = message.content.split(' ')[1];
  const text = message.content.split(' ').slice(2).join(' ');
  if (!id) return message.reply(`Viestin ID puuttuu.\nSaat viestin ID:n menemällä \`\`Asetukset -> Ulkoasu -> Edistynyt -> Kehittäjätila (Päälle)\`\` https://i.imgur.com/TwjqCjU.png. Sitten kopioi viestin ID ja laita se \`\`${config.prefix}lainaa 361900546467966464\`\` https://i.imgur.com/V3XLSLn.png.`);
  message.channel.fetchMessages({
      around: id,
      limit: 1
  }).then(msg => {
      const thatMsg = msg.first();
      const Time = moment(thatMsg.createdAt).fromNow()
      let embed = new Discord.RichEmbed()
          .setColor(0xFFFFFF)
          .setAuthor(thatMsg.author.tag, thatMsg.author.displayAvatarURL)
          .setDescription(thatMsg.content)
          .setFooter(`Noin ${Time} | Kanavalla #${thatMsg.channel.name} `, message.guild.iconURL);
      message.channel.send(text, {
          embed
      })
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['q'],
};

exports.help = {
  name: 'lainaa',
  description: 'Lainaa toisen viestiä',
  usage: ` ${config.prefix}lainaa <id>\n**Esimerkki:** ${config.prefix}lainaa 412959486089887763`
};
