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

  if (!message.guild.members.get(client.user.id).hasPermission("KICK_MEMBERS")) {
    return message.channel.send(`<:X_:498898724500799489> **|** ${message.author} Minulla ei ole riittäviä oikeuksia. \`\`KICK_MEMBERS\`\``);
  }

  if (!message.mentions.users.first()) {
      return message.channel.send(`<:X_:498898724500799489> **|** ${message.author} Sinun pitää mainita joku.`).then(msgdel => {msgdel.delete(10000)});
  }



  let kickMember = message.guild.member(message.mentions.users.first());
  if (!kickMember) {
      return message.channel.send(`<:X_:498898724500799489> **|** ${message.author} Tätä henkilöä ei löydetty.`).then(msgdel => {msgdel.delete(10000)});
  }

  const embed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setColor(0xff8300)
    .setDescription(`**Annettu:** ${kickMember.user.tag} (${kickMember.id})\n**Tyyppi:** Potku\n**Syy:** ${message.content.split(" ").slice(2).join(" ")}`)
    .setFooter(message.guild.name, message.guild.iconURL)
    .setTimestamp()

//    message.channel.send('', {embed} );

  kickMember.send({
      embed: {
          color: 0xff8300,
          author: {
            name: message.author.tag,
            icon_url: message.author.avatarURL
          },
          description: `**${message.author.tag}** potki sinut palvelimelta **${message.guild.name}**\n**Syy:** ${message.content.split(" ").slice(2).join(" ")}`,
          timestamp: new Date(),
          footer: {
            text: message.guild.name,
            icon_url: message.guild.iconURL
          }
      }
  });

  kickMember.kick({reason: `Antaja: ${message.author.tag}. Syy: ${message.content.split(" ").slice(2).join(" ")}`}).then(() => {
    message.channel.send(`<:Y_:418056607096766464> **|** ${message.author} 👌, Potkut annettu käyttäjälle ${kickMember.user.tag}.`);

    const laheta = message.guild.channels.find('name', 'logs');
    if (laheta) {
      laheta.send('', {embed} );
    }


    }).catch(err => {
      message.channel.send(`<:X_:498898724500799489> **|** ${message.author} En voinnut potkia tätä käyttäjää.`).then(msgdel => {msgdel.delete(10000)});
    });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['potki'],
};

exports.help = {
  name: 'kick',
  description: 'Potki jäseniä',
  usage: ` ${config.prefix}kick <@henkilö> (syy)\n**Esimerkki:**\n${config.prefix}warn @salasan1 mainostus`
};
