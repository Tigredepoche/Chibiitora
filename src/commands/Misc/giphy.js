const { Command } = require('klasa');
var giphy = require('giphy-api')( process.env.GIPHY_KEY' );

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['gif'],
			description: 'Envoie un gif'
		});
	}

	async run(msg) {
		giphy.random(msg.content).then(function (res) {
			msg.reply(res['data']['url'])
	})
}

};
