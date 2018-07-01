const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['catfact', 'kittenfact'],
			description: 'Vous donne un catfact ( en anglais ).'
		});
	}

	async run(msg) {
		const fact = await fetch('https://catfact.ninja/fact')
			.then(response => response.json())
			.then(body => body.fact);
		return msg.sendMessage(`📢 **Catfact:** *${fact}*`);
	}

};
