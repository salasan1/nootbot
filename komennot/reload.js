const config = require('../config.json');
exports.run = (client, message, args) => {
  if (message.author.id !== config.ownerID) return;

  if (message.channel.permissionsFor(client.user.id).has("MANAGE_MESSAGES")) {
    message.delete();
  }

  let command;
  if (client.commands.has(args[0])) {
    command = args[0];
  } else if (client.aliases.has(args[0])) {
    command = client.aliases.get(args[0]);
  }
  if (!command) {
    return message.channel.send(`Komentoa ei löydetty: ${args[0]}`);
  } else {
    message.channel.send(`Ladataan: ${command}`)
      .then(m => {
        client.reload(command)
          .then(() => {
            m.edit(`Onnistui.`);
          })
          .catch(e => {
            m.edit(`Latauksessa tuli ongelmia: ${command}\n\`\`\`${e.stack}\`\`\``);
          });
      });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['lataa'],
};

exports.help = {
  name: 'reload',
  description: 'Lataa tiedoston, jos sitä on muutettu',
  usage: ` ${config.prefix}reload <komento>`
};
