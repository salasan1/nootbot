const config = require('../config.json');
exports.run = function(client, message, args) {

  if (!message.guild.members.get(client.user.id).hasPermission("EMBED_LINKS")) {
    return message.channel.send(`<:X_:498898724500799489> **|** ${message.author} Minulla ei ole riittäviä oikeuksia. \`\`EMBED_LINKS\`\``);
}
  if (!message.guild.members.get(message.author.id).hasPermission("MANAGE_MESSAGES")) {
    return message.channel.send(`<:X_:498898724500799489> **|** ${message.author} Sinulla ei ole riittäviä oikeuksia. \`\`MANAGE_MESSAGES\`\``).then(msgdel => {msgdel.delete(10000)});
  };

  message.channel.send({
      embed: {
          color: 0xFFFFFF,
          author: {
            name: message.author.tag,
            icon_url: message.author.avatarURL
          },
          description: `${message.content.split(" ").slice(1).join(" ")}`,
          timestamp: new Date(),
          footer: {
            text: message.guild.name,
            icon_url: message.guild.iconURL
          }
      }
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['embed'],
};

exports.help = {
  name: 'say',
  description: 'Toistaa mitä sanot',
  usage: ` ${config.prefix}say <teksti>\n**Esimerkki:** ${config.prefix}say Moi maailma`
};
