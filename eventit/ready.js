const config = require('../config.json');
module.exports = client => {
	console.log('Valmis');
	client.user.setActivity(`${config.versio} | ${config.prefix}help`, { type: 'WATCHING' });
}
