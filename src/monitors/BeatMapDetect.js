const { Monitor } = require('klasa');
const { MessageEmbed } = require('discord.js');
var randomColor = require('randomcolor'); // import the script
const Nodesu = require('nodesu');

const api = new Nodesu.Client(process.env.TOKEN_OSU,);

module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, {
            name: "bm",
            enabled: true,
            ignoreBots: true,
            ignoreSelf: true,
            ignoreOthers: false

        });
    }

    async run(msg) {
        var color = randomColor(); // a hex code for an attractive color
        var IDbeatmap = (msg.content).slice(21, 28)
        if(msg.content.startsWith('https://osu.ppy.sh/b/')){
            // console.log('/b/')

            //Api call to get map data
        api.beatmaps
        .getByBeatmapId(IDbeatmap)
        .then(beatmaps=> {
            //console.log(beatmaps[0])
        
        // If Else statements are mainly made for fun ( viva private joke )
        if (beatmaps[0]['creator'] === 'Sotarks') {
            var creatormessage = 'Various Artists - Songs Compilation'
        }
        else if (beatmaps[0]['creator'] === 'Monstrata') {
            var creatormessage = 'Le village caché du pp farming !'
        }
        else if (beatmaps[0]['creator'] === 'Jean-Michel Jr') {
            var creatormessage = 'Vive le mappeur de Magic System'
        } 
        else if (beatmaps[0]['creator'] === 'codeS') {
            var creatormessage = 'Mais je reconnais, c\'est Roses Epicurean !'
        } else(creatormessage = 'owo')

        // Creating Embed 
        var embed = new MessageEmbed()
        .setTitle(beatmaps[0]['artist'] + ' - ' + beatmaps[0]['title'] + '[' + beatmaps[0]['version'] + ']', ' (map by' + beatmaps[0]['creator'] + ')'  )
        .addField('❯ Star Rating', beatmaps[0]['difficultyrating'].slice(0,4) ,true)
        .addField('❯ Stats', 'AR' + beatmaps[0]['diff_approach'] + ' OD' + beatmaps[0]['diff_overall'] + ' CS' + beatmaps[0]['diff_size'] + ' HP' + beatmaps[0]['diff_drain'], true)
        .addField('❯ Max Combo', beatmaps[0]['max_combo']+ 'x', true)
        .addField('❯ BPM', beatmaps[0]['bpm'], true)
        .addField('❯ Length', Math.floor(beatmaps[0]['total_length']/60) + 'm' + Math.floor(beatmaps[0]['total_length']%60) +'s' + ' (*' + Math.floor(beatmaps[0]['hit_length']/60) + 'm' + Math.floor(beatmaps[0]['hit_length']%60) +'s' + (' drain*)'),true)
    
        .setFooter(creatormessage)
        .setURL('https://osu.ppy.sh/b/'+ beatmaps[0].beatmap_id)
        .setColor(color) 
        .setThumbnail('https://b.ppy.sh/thumb/' + beatmaps[0].beatmapset_id + 'l.jpg')
       
        //post embed to channel
        msg.channel.send({embed});
    
    
    })
        }
}

    }

