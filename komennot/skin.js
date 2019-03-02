const Discord = require('discord.js');
const config = require('../config.json');
const snekfetch = require('snekfetch');
exports.run = (client, message, args) => {
  if (!message.guild.members.get(client.user.id).hasPermission("EMBED_LINKS")) {
      return message.reply("Minulla ei ole oikeuksia. ``Upota linkkejä``")
}

  const word = args.join(' ');
    if (word.length < 1 || word.length > 32) {
      return message.reply('Enintään 32 merkkiä vähintään yksi merkki.');
    }

  message.channel.send(`Haetaan pelaajaa \`\`${message.content.split(" ").slice(1).join(" ")}\`\`...`).then(mes => {
          snekfetch.get(`https://api.mojang.com/users/profiles/minecraft/${message.content.split(" ").slice(1).join(" ")}`).then(uuid => {
            snekfetch.get(`https://api.mojang.com/user/profiles/${uuid.body.id}/names`).then(nimi => {

          let embed = new Discord.RichEmbed()
              .setImage(`https://crafatar.com/renders/body/${uuid.body.id}`)
              .addField(`Pelaaja`, `${uuid.body.name}`, true)
              .addField(`UUID`, `${uuid.body.id}`, true) // https://api.mojang.com/users/profiles/minecraft/froad
              .setThumbnail(`https://crafatar.com/avatars/${uuid.body.id}`)
              .setColor(Math.floor(Math.random() * 16777215) + 0)
          mes.edit({
              embed
          })
        }).catch(console.error)
      }).catch(console.error);
  });
};

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ['skini'],
};

exports.help = {
  name: 'skin',
  description: 'Minecraft skinin katsominen',
  usage: ` ${config.prefix}skin <pelaaja>\n**Esimerkki:** ${config.prefix}skin salasan1`
};
