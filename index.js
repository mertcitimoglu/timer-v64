const { Client, GatewayIntentBits } = require('discord.js');
const http = require('http');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    console.log('Bot hazır!');
});

client.on('messageCreate', message => {
    if (message.content.startsWith('!time')) {
        const args = message.content.split(' ');
        const totalMinutes = parseInt(args[1]); // dakika olarak
        const note = args.slice(2).join(' ') || 'No note provided';

        if (!isNaN(totalMinutes)) {
            let remainingMinutes = totalMinutes;

            message.channel.send(`Countdown started for ${totalMinutes} minutes. Note: ${note}`);

            const countdownInterval = setInterval(() => {
                if (remainingMinutes > 0) {
                    message.channel.send(`Remaining: ${remainingMinutes} minutes. Note: ${note}`);
                    remainingMinutes--;
                } else {
                    clearInterval(countdownInterval);
                    message.channel.send('Finish! 🎉');
                }
            }, 60000); // Her dakika

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
