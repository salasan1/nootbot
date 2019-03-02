const Discord = require('discord.js');
const config = require('../config.json');
const snekfetch = require('snekfetch');
exports.run = (client, message, args) => {

  if (message.guild) {
    if (message.channel.permissionsFor(client.user.id).has("MANAGE_MESSAGES")) {
      message.delete();
    }

    if (!message.channel.permissionsFor(client.user.id).has("EMBED_LINKS")) {
        return message.channel.send(`<:X_:498898724500799489> **|** ${message.author} Minulla ei ole riittäviä oikeuksia. \`\`EMBED_LINKS\`\``);
    }

    message.reply(`Haetaan koiraa...`).then(mes => {
      snekfetch.get("http://dog.ceo/api/breeds/image/random").then(r => {
        let embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setImage(r.body.message)
        .setColor(0xFFFFFF)
        .setFooter(message.guild.name, message.guild.iconURL)
        .setTimestamp()
        mes.edit({
          embed
        })
      }).catch(console.error);
    });
    return;
  }

  message.reply(`Haetaan koiraa...`).then(mes => {
    snekfetch.get("http://dog.ceo/api/breeds/image/random").then(r => {
      let embed = new Discord.RichEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setImage(r.body.message)
      .setColor(0xFFFFFF)
      .setFooter(message.author.tag, message.author.avatarURL)
      .setTimestamp()
      mes.edit({
        embed
      })
    }).catch(console.error);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['dog'],
};

exports.help = {
  name: 'koira',
  description: 'Etsii satunnaisen koirakuvan',
  usage: ` ${config.prefix}koira`
};
