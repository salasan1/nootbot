const reqEvent = (event) => require(`../eventit/${event}`)
module.exports = client => {
	client.on('ready', () => reqEvent('ready')(client));
	client.on('reconnecting', () => reqEvent('reconnecting')(client));
	client.on('disconnect', () => reqEvent('disconnect')(client));
	client.on('message', reqEvent('message'));
	client.on('guildMemberAdd', member => reqEvent('guildMemberAdd')(member));
	client.on('guildMemberRemove', member => reqEvent('guildMemberRemove')(member));
	client.on('guildCreate', guild => reqEvent('guildCreate')(client, guild));
	client.on('guildDelete', guild => reqEvent('guildDelete')(client, guild));
};
