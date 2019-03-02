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

  if (!message.guild.members.get(client.user.id).hasPermission("BAN_MEMBERS")) {
    return message.channel.send(`<:X_:498898724500799489> **|** ${message.author} Minulla ei ole riittäviä oikeuksia. \`\`BAN_MEMBERS\`\``);
  }

  if (!message.mentions.users.first()) {
      return message.channel.send(`<:X_:498898724500799489> **|** ${message.author} Sinun pitää mainita joku.`).then(msgdel => {msgdel.delete(10000)});
  }



  let banMember = message.guild.member(message.mentions.users.first());
  if (!banMember) {
      return message.channel.send(`<:X_:498898724500799489> **|** ${message.author} Tätä henkilöä ei löydetty.`).then(msgdel => {msgdel.delete(10000)});
  }

  const embed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setColor(0xff1900)
    .setDescription(`**Annettu:** ${banMember.user.tag} (${banMember.id})\n**Tyyppi:** Porttikielto\n**Syy:** ${message.content.split(" ").slice(2).join(" ")}`)
    .setFooter(message.guild.name, message.guild.iconURL)
    .setTimestamp()


  banMember.send({
      embed: {
          color: 0xff1900,
          author: {
            name: message.author.tag,
            icon_url: message.author.avatarURL
          },
          description: `**${message.author.tag}** antoi sinulle porttikiellon palvelimelle **${message.guild.name}**\n**Syy:** ${message.content.split(" ").slice(2).join(" ")}`,
          timestamp: new Date(),
          footer: {
            text: message.guild.name,
            icon_url: message.guild.iconURL
          }
      }
  });

  banMember.ban({reason: `Antaja: ${message.author.tag}. Syy: ${message.content.split(" ").slice(2).join(" ")}`}).then(() => {
    message.channel.send(`<:Y_:418056607096766464> **|** ${message.author} 👌, Porttikielto annettu käyttäjälle ${banMember.user.tag}.`);

    const laheta = message.guild.channels.find('name', 'logs');
    if (laheta) {
      laheta.send('', {embed} );
    }


    }).catch(err => {
      message.channel.send(`<:X_:498898724500799489> **|** ${message.author} En voinnut antaa porttikieltoa tälle käyttäjälle.`).then(msgdel => {msgdel.delete(10000)});
    });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['porttikielto'],
};

exports.help = {
  name: 'ban',
  description: 'Porttikiellä jäseniä',
  usage: ` ${config.prefix}ban <@henkilö> (syy)\n**Esimerkki:** ${config.prefix}ban @salasan1 mainostus`
};
