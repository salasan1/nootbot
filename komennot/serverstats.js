const Discord = require('discord.js');
const config = require('../config.json');
exports.run = (client, message, args) => {

  if (message.channel.permissionsFor(client.user.id).has("MANAGE_MESSAGES")) {
    message.delete();
  }
  
  if (!message.channel.permissionsFor(client.user.id).has("EMBED_LINKS")) {
    return message.channel.send(`<:X_:498898724500799489> **|** ${message.author} Minulla ei ole riittäviä oikeuksia. \`\`EMBED_LINKS\`\``);
  }
  let embed = new Discord.RichEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setColor('0xFFFFFF')
  .addField('Omistaja', `${message.guild.owner.user.tag}`, true)
  .addField('Omistajan ID', `${message.guild.owner.id}`, true)
  .addField('Jäsenet', `${message.guild.memberCount - message.guild.members.filter(m=>m.user.bot).size} + ${message.guild.members.filter(m=>m.user.bot).size} bottia`, true)
  .addField('Sijainti', message.guild.region, true)
  .addField('Luotu', message.guild.createdAt.toLocaleString(), true)
  .addField('Roolit', message.guild.roles.size, true)
  .setFooter(message.guild.name, message.guild.iconURL)
  .setTimestamp()
  message.channel.send({embed}).catch(e => console.error(e));

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sstats'],
};

exports.help = {
  name: 'serverstats',
  description: ' Palvelimen statsit',
  usage: ` ${config.prefix}serverstats`
};
