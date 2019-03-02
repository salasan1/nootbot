const ubl = require("../data/userbl.json")
const config = require('../config.json');
module.exports = message => {
  let client = message.client;

  if (message.author.bot) return;

  if (!message.content.startsWith(config.prefix)) return;
  let command = message.content.split(' ')[0].slice(config.prefix.length);
  let params = message.content.split(' ').slice(1);

  if (ubl.includes(message.author.id)) return;

  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }

  if (cmd && !message.guild && cmd.conf.guildOnly) {
    return message.channel.send("Tätä komentoa voi käyttää vain palvelimilla. https://discordapp.com/oauth2/authorize?client_id=294509025805205504&scope=bot&permissions=271707142");
  }

  if (cmd && !cmd.conf.enabled) {
    if (message.guild) {
      if (message.channel.permissionsFor(client.user.id).has("MANAGE_MESSAGES")) {
        message.delete();
      }
      return message.channel.send("Tämä komento on disabloitu.").then(msgdel => {msgdel.delete(5000)});
    } else {
      return message.channel.send("Tämä komento on disabloitu.");
    }
  }

  if (cmd) {
    cmd.run(client, message, params);
  }
};
