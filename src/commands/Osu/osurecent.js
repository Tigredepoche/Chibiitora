const { Command, Klasa, RichDisplay } = require('klasa');
const osu = require('node-osu');
const { MessageEmbed } = require('discord.js');
var randomColor = require('randomcolor'); // import the script

var osuApi = new osu.Api(process.env.TOKEN_OSU, {
    // baseUrl: sets the base api url (default: https://osu.ppy.sh/api)
    notFoundAsError: true, // Reject on not found instead of returning nothing. (default: true)
    completeScores: false // When fetching scores also return the beatmap (default: false)
})


module.exports = class extends Command {

    constructor(...args) {
        /**
         * Any default options can be omitted completely.
         * if all options are default, you can omit the constructor completely
         */
        super(...args, {
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            requiredPermissions: [],
            requiredSettings: [],
            aliases: ['recent', 'rc', 'osurecent','recentosu'],
            autoAliases: true,
            bucket: 1,
            cooldown: 3,
            promptLimit: 0,
            promptTime: 30000,
            deletable: false,
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            description: 'Donne le dernier play d\'un joueur.',
            extendedHelp: 'No extended help available.',
            usage: '',
            usageDelim: undefined,
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(message, [args]) {
        console.log(args)
        var color = randomColor(); // a hex code for an attractive color
        var execz = require('child_process').exec;

        osuApi.getUserRecent({u: message.args }).then((scores, beatmaps) => {
            // console.log(scores[0]);
            osuApi.getBeatmaps({b: scores[0]['beatmapId']}).then(beatmaps => {
                //console.log(beatmaps)
                var acc1 = ((scores[0]['counts']['300'])*300)+((scores[0]['counts']['100'])*100)+((scores[0]['counts']['50'])*50)+((scores[0]['counts']['miss'])*0)
                var acc2 = ((scores[0]['counts']['300']*1)+(scores[0]['counts']['100']*1)+(scores[0]['counts']['50']*1)+(scores[0]['counts']['miss']*1 ))
                var accresultat = ((acc1/(acc2*300))*100)
                var resultattoslice = parseFloat(accresultat).toFixed(2) 
        
                // F RANK OR SS S A B C D RANK
                if (scores[0]['rank'] === 'F') {
                    var imagerank = 'https://i.gyazo.com/e287cd257adf5a5817a5697405f22485.png'
                }
                else {
                    imagerank ='https://s.ppy.sh/images/'+ scores[0]['rank'] + '.png'
                }
        
                
                var embed = new MessageEmbed()
                .setTitle('Score récent de ' + message.args)
                .setImage('https://b.ppy.sh/thumb/' + beatmaps[0].beatmapSetId + 'l.jpg')
                .addField(beatmaps[0].title + '[' + beatmaps[0].version + ']+*' + scores[0]['mods'].filter(e => e !== 'FreeModAllowed'),'--')
                .setThumbnail(imagerank
                     )
                // .addField('PP', scores[0]['pp'] ,true)
                .addField('❯ Accuracy',resultattoslice + '%', true)
                .addField('❯ Max Combo',        
                + scores[0]['maxCombo'] + 'x/' + beatmaps[0].maxCombo + 'x',true)
                .addField('❯ Difficulty',
                + beatmaps[0]['difficulty']['rating'].slice(0, 4) + '☆', true)
                .addField('❯ Map stats',		 
                 ' AR'  + beatmaps[0]['difficulty'].approach 
                + ' OD' + beatmaps[0]['difficulty'].overall 
                + ' CS' + beatmaps[0]['difficulty'].size 
                + ' HP' + beatmaps[0]['difficulty'].drain
                ,true
                    )
                .setFooter('owo' )
                        .setURL('https://osu.ppy.sh/b/'+ scores[0].beatmapId)
                .setColor(color) 
        
            message.channel.send({embed});
    })})}

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
