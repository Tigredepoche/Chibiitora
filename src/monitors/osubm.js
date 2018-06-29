const { Monitor } = require('klasa');

module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, {
            name: 'yourMonitorName',
            enabled: true,
            ignoreBots: true,
            ignoreSelf: true,
            ignoreOthers: true
        });
    }

    run(msg) {
        console.log(msg)
        // This is where you place the code you want to run for your monitor
        if(msg === 'owo'){
            console.log('o fking o')
        }
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};