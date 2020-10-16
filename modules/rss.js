let Parser = require('rss-parser');
let parser = new Parser();

const notifiers = [];

module.exports = {
    getRssNews: async function(url) {

        let feed = await parser.parseURL('https://forum.crossout.ru/index.php?/forum/20-novosti.xml/');
        console.log(feed.title);

        feed.items.forEach(item => {
            console.log(item.title + ':' + item.link)
        });

        return feed;
    }
}
