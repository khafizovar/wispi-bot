const Discord = require("discord.js");
const config = require("./config.json");
const comms = require("./comms.js"); // Подключаем файл с командами для бота

const rssModule = require("./modules/rss");

const client = new Discord.Client();
const prefix = config.PREFIX;


client.on("message", function(message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (msg.author.username != client.user.username && msg.author.discriminator != client.user.discriminator) {

        const comm = msg.content.trim() + " ";
        const comm_name = comm.slice(0, comm.indexOf(" "));
        const messArr = comm.split(" ");
        for (comm_count in comms.comms) {
            var comm2 = prefix + comms.comms[comm_count].name;
            if (comm2 == comm_name) {
                comms.comms[comm_count].out(robot, msg, messArr);
            }
        }
    }
});

client.on("ready", async (message) => {
    console.log('Wi-bot is ready!');
    /* client.channels.cache.forEach((value, key, map) => {
        if(value.name === 'news') {
            rssModule.getRssNews().
        }
    });*/
    const newsChannel = client.channels.cache.find((value, key, map) => {
        return value.name === 'news'; //&& value.type.equals(ChannelType.text);
    });
    if (newsChannel) {
        (await rssModule.getRssNews()).items.forEach(item => {
            newsChannel.send(item.title + ':' + item.link);
        });
    }
});
client.login(config.BOT_TOKEN);
