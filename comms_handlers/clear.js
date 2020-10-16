module.exports = (mess) => {
    // TODO Добавить проверку прав пользователя
    const arggs = mess.content.split(' ').slice(1); // Все аргументы за именем команды с префиксом
    const amount = arggs.join(' '); // Количество сообщений, которые должны быть удалены
    if (!amount) return mess.channel.send('Вы не указали, сколько сообщений нужно удалить!'); // Проверка, задан ли параметр количества
    if (isNaN(amount)) return mess.channel.send('Это не число!'); // Проверка, является ли числом ввод пользователя

    if (amount > 100) return mess.channel.send('Вы не можете удалить 100 сообщений за раз'); // Проверка, является ли ввод пользователя числом больше 100
    if (amount < 1) return mess.channel.send('Вы должны ввести число больше чем 1'); // Проверка, является ли ввод пользователя числом меньше 1

    async function delete_messages() { // Объявление асинхронной функции

        await mess.channel.messages.fetch({
            limit: amount
        }).then(messages => {
            mess.channel.bulkDelete(messages)
            mess.channel.send(`Удалено ${amount} сообщений!`)
        })
    };
    delete_messages(); // Вызов асинхронной функции
}
