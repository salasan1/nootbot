const config = require('../config.json');
exports.run = function(client, message, args) {
  if (message.channel.type === 'text') message.reply("Lähetetään tukea. Se ilmestyy kohta yksityisviestillä.");
  if (args.length < 1) return message.author.send({
    embed: {
        color: 0xFFFFFF,
        description: `Tervetuloa NootBotin tuki sivuille!\n\n**Sisältö:**\n${config.prefix}tuki kutsu\n${config.prefix}tuki logit\n${config.prefix}tuki wiki\n${config.prefix}tuki lainaus`
    }
});
switch (args[0]) {

  case 'logit': {
    if (message.channel.type === 'text') return message.reply("Tämä komento toimii vain yksityisviestillä. Tee !tuki aloittaaksesi.");
    message.channel.send({
      embed: {
          color: 0xFFFFFF,
          description: `Kun teet tekstikanavan \`\`logs\`\` NootBot ilmoittaa sinne aina kun joku tulee, lähtee tai erotetaan palvelimesta.`
      }
  });
    break;
  }

  case 'kutsu': {
    if (message.channel.type === 'text') return message.author.send("https://discord.gg/RYHNKXm", {
		embed: {
			color: 0xFFFFFF,
			description: `Jos tämä tuki sivu ei riitä voit kysyä lisä apua meidän Discord palvelimeltamme.`
			}
			});

    message.channel.send("https://discord.gg/RYHNKXm", {
      embed: {
        color: 0xFFFFFF,
        description: `Jos tämä tuki sivu ei riitä voit kysyä lisä apua meidän Discord palvelimeltamme.`
      }
    });
    break;
  }

  case 'wiki': {
    if (message.channel.type === 'text') return message.reply("Tämä komento toimii vain yksityisviestillä. Tee !tuki aloittaaksesi.");
    message.channel.send('https://github.com/salasan1/nootbot/wiki');
    break;
  }

  case 'lainaus': {
    if (message.channel.type === 'text') return message.reply("Tämä komento toimii vain yksityisviestillä. Tee !tuki aloittaaksesi.");
    message.channel.send("Kuvakaappaukset: Kohta 1. https://i.imgur.com/HItdgMV.png. Kohta 3. (Käyttäjäasetukset) https://i.imgur.com/k0HGZyM.png (Ulkoasu) https://i.imgur.com/6zKeHz0.png (Kehittäjätila) https://i.imgur.com/thuDZdh.png", {
      embed: {
        color: 0xFFFFFF,
        description: `**HUOM!** lainaus toimii vain tietokoneilla, koska Discord ei ole lisännyt puhelimeen ID:n kopiointi nappia.\n\n:one: Tarvitset lainauksessa viestin tunnuksen eli ID:n. Viestin ID:n saa kun oikea klikkaat viestiä ja painat "[Kopioi tunniste](https://i.imgur.com/HItdgMV.png)". Jos sinulla ei ole "Kopioi tunniste" nappia hyppää kohtaan kolme.\n\n:two: Paina "Kopioi tunniste" nappia jotta saat liitettyä viestin ID:n. Nyt kirjoita chattiin jossa NootBot on \`\`${config.prefix}lainaa <ID>\`\`\n\n:three: Jotta saat "Kopioi tunniste" napin käyttöön mene [Käyttäjäasetukset](https://i.imgur.com/k0HGZyM.png) -> [Ulkoasu](https://i.imgur.com/6zKeHz0.png ) -> [Kehittäjätila](https://i.imgur.com/thuDZdh.png). Nyt voit hypätä kohtaan kaksi.`
      }
    });
    break;
  }

}
};

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ['support'],
};

exports.help = {
  name: 'tuki',
  description: 'Lyhyt botin ohjekirja',
  usage: ` ${config.prefix}tuki`
};
