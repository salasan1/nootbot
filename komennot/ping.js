const config = require('../config.json');
exports.run = (client, message, args) => {

  if (message.guild) {
    if (message.channel.permissionsFor(client.user.id).has("MANAGE_MESSAGES")) {
      message.delete();
    }

    if (!message.channel.permissionsFor(client.user.id).has("EMBED_LINKS")) {
      return message.channel.send(`<:X_:498898724500799489> **|** ${message.author} Minulla ei ole riittäviä oikeuksia. \`\`EMBED_LINKS\`\``);
    }

    message.channel.send({
      embed: {
        color: 0xFFFFFF,
        author: {
          name: message.author.tag,
          icon_url: message.author.avatarURL
        },
        description: `Tämä kesti yhteensä \`\`${Date.now() - message.createdTimestamp + Math.round(client.ping)}ms\`\`\nAPI:n viive \`\`${Math.round(client.ping)}ms\`\``,
        timestamp: new Date(),
        footer: {
          text: message.guild.name,
          icon_url: message.guild.iconURL
        }
      }
    });
    return;
  }

  message.channel.send({
    embed: {
      color: 0xFFFFFF,
      author: {
        name: message.author.tag,
        icon_url: message.author.avatarURL
      },
      description: `Tämä kesti yhteensä \`\`${Date.now() - message.createdTimestamp + Math.round(client.ping)}ms\`\`\nAPI:n viive \`\`${Math.round(client.ping)}ms\`\``,
      timestamp: new Date(),
      footer: {
        text: message.author.tag,
        icon_url: message.author.avatarURL
      }
    }
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['pong'],
};

exports.help = {
  name: 'ping',
  description: 'Näyttää botin ja palvelimen välisen viiveen',
  usage: ` ${config.prefix}ping`
};
