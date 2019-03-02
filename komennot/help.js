const config = require('../config.json');
exports.run = (client, message, params) => {
  if (!message.guild) {
    if (!params[0]) {
      const commandNames = Array.from(client.commands.keys());
      const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
      message.channel.send({
      embed: {
          color: 0xFFFFFF,
          author: {
            name: message.author.tag,
            icon_url: message.author.avatarURL
          },
          description: `**Komennot**\n\nTee \`\`${config.prefix}help (komento)\`\` jos tarvitset lisätietoja.\n\n${client.commands.map(c => `**${config.prefix}${c.help.name}** ${c.help.description}`).join('\n')}`,
          timestamp: new Date(),
          footer: {
            text: message.author.tag,
            icon_url: message.author.avatarURL
          }
      }
    });
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.channel.send({
        embed: {
            color: 0xFFFFFF,
            author: {
              name: message.author.tag,
              icon_url: message.author.avatarURL
            },
            description: `**Komento:** ${config.prefix}${command.help.name}\n**Kuvaus:** ${command.help.description}\n**Käyttö:**${command.help.usage}`,
            timestamp: new Date(),
            footer: {
              text: message.author.tag,
              icon_url: message.author.avatarURL
            }
        }
      });
    }
  }
  return;
}

  if (!message.channel.permissionsFor(client.user.id).has("EMBED_LINKS")) {
    return message.channel.send(`<:X_:498898724500799489> **|** ${message.author} Minulla ei ole riittäviä oikeuksia. \`\`EMBED_LINKS\`\``);
  }

  if (message.channel.permissionsFor(client.user.id).has("MANAGE_MESSAGES")) {
    message.delete();
  }

  if (!params[0]) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    message.channel.send({
      embed: {
          color: 0xFFFFFF,
          author: {
            name: message.author.tag,
            icon_url: message.author.avatarURL
          },
          description: `**Komennot**\n\nTee \`\`${config.prefix}help (komento)\`\` jos tarvitset lisätietoja.\n\n${client.commands.map(c => `**${config.prefix}${c.help.name}** ${c.help.description}`).join('\n')}`,
          timestamp: new Date(),
          footer: {
            text: message.guild.name,
            icon_url: message.guild.iconURL
          }
      }
  }).then(msgdel => {msgdel.delete(60000)});
    //      message.author.sendCode('asciidoc', `= Ohje =\n\n[Tarvitset roolin Bot Admin, että kaikki "Admin" komennot toimisivat. Lisätietoa komennolla ${config.prefix}ohje]\n\n= Komennot =\n\n[Tee ${config.prefix}help <komento> jos haluat lisätietoja]\n\n${client.commands.map(c => `${config.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n')}`);

  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.channel.send({
        embed: {
            color: 0xFFFFFF,
            author: {
              name: message.author.tag,
              icon_url: message.author.avatarURL
            },
            description: `**Komento:** ${config.prefix}${command.help.name}\n**Kuvaus:** ${command.help.description}\n**Käyttö:**${command.help.usage}`,
            timestamp: new Date(),
            footer: {
              text: message.guild.name,
              icon_url: message.guild.iconURL
            }
        }
    }).then(msgdel => {msgdel.delete(60000)});
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'apuva'],
};

exports.help = {
  name: 'help',
  description: 'Näyttää kaikki botin komennot',
  usage: ` ${config.prefix}help (komento)\n**Esimerkki:** ${config.prefix}help purge`
};
