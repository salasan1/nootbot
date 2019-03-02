const Discord = require('discord.js');
const config = require('../config.json');
module.exports = member => {
  const laheta = member.guild.channels.find('name', 'logs');
  if (!laheta) return;


const embed = new Discord.RichEmbed()
.setAuthor(`${member.user.tag} liittyi`, member.user.avatarURL)
.setColor(0x4cff4c)
.setFooter(member.guild.name, member.guild.iconURL)
.setTimestamp()

laheta.send('', {embed} );
};
