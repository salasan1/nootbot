const { version } = require('discord.js');
const Discord = require('discord.js');
const moment = require("moment");
require("moment-duration-format");
const config = require('../config.json');
exports.run = function(client, message, args) {

  if (!message.guild) {
    const embed = new Discord.RichEmbed()
    .setColor(0xFFFFFF)
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setTimestamp()
    .setFooter(message.author.tag, message.author.avatarURL)

    .addField(`\u200bRAM`, `\u200b${(process.memoryUsage().heapUsed/1024/2014).toFixed(2)} MB / 1024 MB`, true)
    .addField(`\u200bViive`, `\u200b${Date.now() - message.createdTimestamp}ms`, true)
    .addField(`\u200bPäälläoloaika`, `\u200b${moment.duration(client.uptime, "milliseconds").format("d[pv], h[t], m[m], s[s]")}`, true)

    .addField(`\u200bPalvelimet`, `\u200b${client.guilds.size.toLocaleString()}`, true)
    .addField(`\u200bKäyttäjät`, `\u200b${client.users.size.toLocaleString()}`, true)
    .addField(`\u200bKanavat`, `\u200b${client.channels.size.toLocaleString()}`, true)

    .addField(`\u200bNode`, `\u200b${process.version}`, true)
    .addField(`\u200bDiscord.js`, `\u200bv${version}`, true)
    .addField(`\u200bNootbot versio`, `\u200b${config.versio}`, true);


  message.channel.send('', {embed} );
    return;
  }

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
  .setFooter(message.guild.name, message.guild.iconURL)

  .addField(`\u200bRAM`, `\u200b${(process.memoryUsage().heapUsed/1024/2014).toFixed(2)} MB / 1024 MB`, true)
  .addField(`\u200bViive`, `\u200b${Date.now() - message.createdTimestamp}ms`, true)
  .addField(`\u200bPäälläoloaika`, `\u200b${moment.duration(client.uptime, "milliseconds").format("d[pv], h[t], m[m], s[s]")}`, true)

  .addField(`\u200bPalvelimet`, `\u200b${client.guilds.size.toLocaleString()}`, true)
  .addField(`\u200bKäyttäjät`, `\u200b${client.users.size.toLocaleString()}`, true)
  .addField(`\u200bKanavat`, `\u200b${client.channels.size.toLocaleString()}`, true)

  .addField(`\u200bNode`, `\u200b${process.version}`, true)
  .addField(`\u200bDiscord.js`, `\u200bv${version}`, true)
  .addField(`\u200bNootbot versio`, `\u200b${config.versio}`, true);


message.channel.send('', {embed} );

  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['list'],
};

exports.help = {
  name: 'stats',
  description: 'Näyttää botin statsit',
  usage: ` ${config.prefix}stats`
};
