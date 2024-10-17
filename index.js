const { Client, GatewayIntentBits } = require('discord.js');
const http = require('http'); // HTTP modülünü ekleyelim

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    console.log('Bot hazır!');
});

client.on('messageCreate', message => {
    if (message.content.startsWith('!countdown')) {
        const args = message.content.split(' ');
        const time = parseInt(args[1]); // dakika olarak
        const note = args.slice(2).join(' ') || 'No note provided';

        if (!isNaN(time)) {
            message.channel.send(`Countdown started for ${time} minutes. Note: ${note}`);
            setTimeout(() => {
                message.channel.send(`Countdown ended! Note: ${note}`);
            }, time * 60000);
        } else {
            message.channel.send('Please provide a valid number of minutes.');
        }
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);

// Basit bir HTTP sunucusu ekleyelim
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot is running!\n');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
