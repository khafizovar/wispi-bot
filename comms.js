const config = require('./config.json'); // Подключаем файл с параметрами и информацией
const Discord = require('discord.js'); // Подключаем библиотеку discord.js
const prefix = config.prefix; // «Вытаскиваем» префикс

const clearHandler = require('./comms_handlers/clear');
// Команды //

function ping(robot, mess, args) {
    mess.channel.send('Pong!');
}


// Список команд //

var comms_list = [{
    name: "ping",
    out: ping,
    about: "Тестовая команда пинга"
}, {
    name:  "clear",
    out: clearHandler,
    about: "Команда удаления нескольких сообщений"
}];

// Name - название команды, на которую будет реагировать бот
// Out - название функции с командой
// About - описание команды

module.exports.comms = comms_list;
