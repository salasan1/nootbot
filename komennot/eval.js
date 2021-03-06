const config = require('../config.json');
const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
exports.run = (client, message, args) => {

    if (message.author.id !== config.ownerID) return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sudo'],
};

exports.help = {
  name: 'eval',
  description: 'Suorittaa komennon',
  usage: ` ${config.prefix}eval <args>`
};
