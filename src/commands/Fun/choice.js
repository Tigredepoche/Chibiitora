const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['choose', 'decide'],

			description: 'Fait le choix entre plusieurs propositions.',
			usage: '<choices:str> [...]',
			usageDelim: '|'
		});
	}

	run(msg, choices) {
		return msg.reply(choices.length === 1 ?
			'You only gave me one choice, dummy.' :
			`I think you should go with "${choices[Math.floor(Math.random() * choices.length)]}"`);
	}

};
