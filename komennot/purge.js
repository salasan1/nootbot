const config = require('../config.json');
exports.run = (client, message, args) => {

  if (message.channel.permissionsFor(client.user.id).has("MANAGE_MESSAGES")) {
    message.delete();
  }

  if (!message.channel.permissionsFor(client.user.id).has("EMBED_LINKS")) {
    return message.channel.send(`<:X_:498898724500799489> **|** ${message.author} Minulla ei ole riittäviä oikeuksia. \`\`EMBED_LINKS\`\``);
  }

  if (!message.channel.permissionsFor(message.author.id).has("MANAGE_MESSAGES")) {
    return message.channel.send(`<:X_:498898724500799489> **|** ${message.author} Sinulla ei ole riittäviä oikeuksia. \`\`MANAGE_MESSAGES\`\``).then(msgdel => {msgdel.delete(10000)});
  };

  if (args.length < 1) return message.reply("Et kertonut monta viestiä haluat pois!");
  const messagecount = parseInt(args.join(' '));
  if (messagecount < 101 && messagecount > 1) {
    message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
    message.reply(`Poistettu ${messagecount} viestiä!`).then(msgdel => {msgdel.delete(15000)});
  } else {
    return message.channel.send(`<:X_:498898724500799489> **|** ${message.author} Viestejä voi poistaa vain 2-100kpl.`).then(msgdel => {msgdel.delete(15000)});
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['clear', 'prune', 'poista', 'delete'],
};

exports.help = {
  name: 'purge',
  description: 'Poistaa määritetyn määrän viestejä',
  usage: ` ${config.prefix}purge <1-100>\n**Esimerkki:** ${config.prefix}purge 10`
};
