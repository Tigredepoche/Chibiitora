const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			aliases: ['ti'],
			requiredPermissions: ['MANAGE_GUILD'],
			description: 'Indique l\'id de l\'invitation la plus utilisé..'
		});
	}

	async run(msg) {
		const invites = await msg.guild.fetchInvites();
		const topTen = invites.filter(inv => inv.uses > 0).sort((a, b) => b.uses - a.uses).first(10);
		if (topTen.length === 0) throw 'There are no invites, or none of them have been used!';
		return msg.sendMessage(
			topTen.map(inv => `**${inv.inviter.username}**'s invite **${inv.code}** has **${inv.uses.toLocaleString()}** uses.`)
		);
	}

};
