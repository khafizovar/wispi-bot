const Discord = require("discord.js");
const config = require("./config.json");
const comms = require("./comms.js"); // Подключаем файл с командами для бота

const rssModule = require("./modules/rss");

const wispi = new Discord.Client();
const prefix = config.PREFIX;


wispi.on("message", function(msg) {
    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return;
    if (msg.author.username != wispi.user.username && msg.author.discriminator != wispi.user.discriminator) {

        const comm = msg.content.trim() + " ";
        const comm_name = comm.slice(0, comm.indexOf(" "));
        const messArr = comm.split(" ");
        for (comm_count in comms.comms) {
            var comm2 = prefix + comms.comms[comm_count].name;
            if (comm2 == comm_name) {
                comms.comms[comm_count].out(wispi, msg, messArr);
            }
        }
    }
});

wispi.on("ready", async (message) => {
    console.log('Wi-bot is ready!');
    /* client.channels.cache.forEach((value, key, map) => {
        if(value.name === 'news') {
            rssModule.getRssNews().
        }
    });*/
    const newsChannel = wispi.channels.cache.find((value, key, map) => {
        return value.name === 'news'; //&& value.type.equals(ChannelType.text);
    });
    if (newsChannel) {
        (await rssModule.getRssNews()).items.forEach(item => {
            newsChannel.send(item.title + ':' + item.link);
        });
    }
});
wispi.login(config.BOT_TOKEN);
