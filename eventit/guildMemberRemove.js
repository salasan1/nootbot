const Discord = require('discord.js');
const config = require('../config.json');
module.exports = member => {
  const laheta = member.guild.channels.find('name', 'logs');
  if (!laheta) return;


const embed = new Discord.RichEmbed()
.setAuthor(`${member.user.tag} lähti`, member.user.avatarURL)
.setColor(0xf4bf42)
.setFooter(member.guild.name, member.guild.iconURL)
.setTimestamp()

laheta.send('', {embed} );
};
