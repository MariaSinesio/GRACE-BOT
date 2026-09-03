const { ActivityType} = require('discord.js');
// status do bot
module.exports = {
    name: 'ready',
    ready:true, //roda apenas uma vez
    async execute(client) {
    console.log('Status funcionando!');

    client.user.setPresence({
        activities: [{ name: 'Em manutenção  ͙͘͡★ grace.icmc.usp', 
            type: ActivityType.Custom }],
        status: 'dnd',
    });
    }
}

// 🎶Gerenciando o Grace-usp. Digite !oi