const Discord = require("discord.js");
const client = new Discord.Client();
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI5NDUwOTAyNTgwNTIwNTUwNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTA5NTEwNDE3fQ.4FNzp-E5cZGVGKmRNVzU6JZtZPpCArbUzU-AZJ3XxU0', client);
const config = require('../config.json');
module.exports = (client, guild) => {
//  client.channels.get('320571459678371840').send(`:sob: **Palvelin lähti** :sob:\n**Nimi:** ${guild.name} (${guild.id})\n**Omistaja:** ${guild.owner.user.tag} (${guild.owner.user.id})\n**Käyttäjät:** ${guild.memberCount.toLocaleString()}\n**Yhteensä:** __${client.guilds.size.toLocaleString()}__ palvelinta.`);
  dbl.postStats(client.guilds.size);
  };
