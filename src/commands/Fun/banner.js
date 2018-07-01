const { Command } = require('klasa');
const figletAsync = require('util').promisify(require('figlet'));

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Creer une bannière ascii à partir du message indiqué.',
			usage: '<banner:str>'
		});
	}

	async run(msg, [banner]) {
		return msg.sendCode('', await figletAsync(banner));
	}

};
