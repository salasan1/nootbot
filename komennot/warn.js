const Discord = require('discord.js');
const config = require('../config.json');
exports.run = (client, message, args) => {

  if (message.channel.permissionsFor(client.user.id).has("MANAGE_MESSAGES")) {
    message.delete();
  }

  if (!message.channel.permissionsFor(client.user.id).has("EMBED_LINKS")) {
    return message.channel.send(`<:X_:498898724500799489> **|** ${message.author} Minulla ei ole riittäviä oikeuksia. \`\`EMBED_LINKS\`\``);
  }

  if (!message.member.hasPermission("BAN_MEMBERS")) {
    return message.channel.send(`<:X_:498898724500799489> **|** ${message.author} Sinulla ei ole riittäviä oikeuksia. \`\`BAN_MEMBERS\`\``).then(msgdel => {msgdel.delete(10000)});
  };

  if (!message.mentions.users.first()) {
      return message.channel.send(`<:X_:498898724500799489> **|** ${message.author} Sinun pitää mainita joku.`).then(msgdel => {msgdel.delete(10000)});
  }



  let warnMember = message.guild.member(message.mentions.users.first());
  if (!warnMember) {
      return message.channel.send(`<:X_:498898724500799489> **|** ${message.author} Tätä henkilöä ei löydetty.`).then(msgdel => {msgdel.delete(10000)});
  }

  const embed = new Discord.RichEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setColor(0xffff00)
  .setDescription(`**Annettu:** ${warnMember.user.tag} (${warnMember.id})\n**Tyyppi:** Varoitus\n**Syy:** ${message.content.split(" ").slice(2).join(" ")}`)
  .setFooter(message.guild.name, message.guild.iconURL)
  .setTimestamp()

  message.channel.send(`<:Y_:418056607096766464> **|** ${message.author} 👌, Varoitus annettu käyttäjälle ${warnMember.user.tag}.`);

  warnMember.send({
      embed: {
          color: 0xffff00,
          author: {
            name: message.author.tag,
            icon_url: message.author.avatarURL
          },
          description: `**${message.author.tag}** varoitti sinua palvelimella **${message.guild.name}**\n**Syy:** ${message.content.split(" ").slice(2).join(" ")}`,
          timestamp: new Date(),
          footer: {
            text: message.guild.name,
            icon_url: message.guild.iconURL
          }
      }
  }).then(member => {});

  const laheta = message.guild.channels.find('name', 'logs');
  if (!laheta) return;
  laheta.send('', {embed} );
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['varoitus'],
};

exports.help = {
  name: 'warn',
  description: 'Varoita jäsentä',
  usage: ` ${config.prefix}warn <@henkilö> (syy)\n**Esimerkki:** ${config.prefix}warn @salasan1 mainostus`
};
