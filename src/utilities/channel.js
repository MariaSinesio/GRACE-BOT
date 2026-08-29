// definição dos canais de logs
const { botPrefix} = require('../config.json');
const { channelLogs} = require('./user.js'); // importamos, trazemos para dentro

module.exports = {
    name: 'messageCreate', // nome do evento 
    async execute(message) { // executa a função quando for disparado 
    if (message.author.bot) return;

    if (message.content === `${botPrefix}canal`) {
        
        const channel = message.guild.channels.cache.find(c => c.name === channelLogs);

        if (channel) {
            await channel.send('Estarei mandando os logs para este chat!');
        } else {
            message.reply(`Não consegui encontrar um canal chamado "${channel}", por favor, crie um.`);
        }
    }
}
}
