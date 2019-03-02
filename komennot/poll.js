const Discord = require('discord.js');
const config = require('../config.json');
exports.run = (client, message, args) => {

  if (message.channel.permissionsFor(client.user.id).has("MANAGE_MESSAGES")) {
    message.delete();
  }

  if (!message.channel.permissionsFor(client.user.id).has("EMBED_LINKS")) {
      return message.channel.send(`<:X_:498898724500799489> **|** ${message.author} Minulla ei ole riittäviä oikeuksia. \`\`EMBED_LINKS\`\``);
  }

  const embed = new Discord.RichEmbed()
  .setColor(0xFFFFFF)
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setTimestamp()
  .setDescription(`${message.content.split(" ").slice(1).join(" ")}`)
  .setFooter(message.guild.name, message.guild.iconURL)

  message.channel.send('', {embed} ).then(msg => {
    msg.react('👍').then(() => {
      msg.react('👎')
    });
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['vote'],
};

exports.help = {
  name: 'poll',
  description: 'Tekee äänestyksen.',
  usage: ` ${config.prefix}poll <kysymys>\n**Esimerkki:** ${config.prefix}poll onko tää päivitys siisti?`
};
