const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Fait sonner la cloche (🔔) du shame sur une personne au choix.',
			usage: '<user:user>'
		});
	}

	run(msg, [user]) {
		return msg.sendMessage(`🔔 SHAME 🔔 ${user} 🔔 SHAME 🔔`);
	}

};
