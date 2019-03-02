module.exports = client => {
	console.log(`Reconnecting at ${new Date()}`);
	client.user.setActivity(`${config.versio} | ${config.prefix}help`, { type: 'WATCHING' });
};
