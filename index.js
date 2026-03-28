const { Client, Events, GatewayIntentBits, EmbedBuilder } = require('discord.js'); // Importa as classes necessárias
const fs = require('node:fs');
const path = require('node:path'); //nativo
const { token, logChannel, botPrefix } = require('./config.json'); 

const client = new Client({ intents: [GatewayIntentBits.GuildVoiceStates,GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] }); // garante o funcionamento, ou seja,caches de guildas, canais e funções sejam preenchidos e estejam disponíveis para uso interno.
client.once('ready', () => {
  console.log('Bot está online!'); //Evento disparado quan o bot estiver onn
});

const users = new Map();
const logChannelId = logChannel; 

client.on('messageCreate', message => {
    if (message.content.toLowerCase() === `${botPrefix}oi`) {
        if (message.author.bot) return;
        message.channel.send(`Olá, ${message.author}! Sou o bot de gerenciamento do GRACE-USP :)`)
    } 
})


client.on(Events.VoiceStateUpdate, async (oldState, newState) => {
    const member = newState.member;
    if (!member || member.user.bot) return; 

    if (!oldState.channelId && newState.channelId) {
        users.set(member.id, Date.now());
        console.log(`${member.user.tag} entroou`);
}

if (oldState.channelId && !newState.channelId) {
        const startTime = users.get(member.id);
        console.log(`${member.user.tag} saiuu`);
        if (startTime) {
            const endTime = Date.now();
            const durationMs = endTime - startTime;

            const min = Math.floor(durationMs / 60000);

            if(logChannel) {
                const embed = new EmbedBuilder()
                .setTitle('Registro do tempo no canal de voz')
                .setDescription(`${member.user.tag} ficou ${min} minuto(s) no canal`)
                .setThumbnail(member.user.displayAvatarURL())
                .setFields(
                    { name: 'Canal de voz:', value: oldState.channel.name, inline: true}
                )
                .setFields(
                    { name: 'Id do usuário:', value: member.id, inline: false},
                    { name: 'Nome de usuário no grupo:', value: member.displayName, inline: true}
                )
                .setColor("Purple")
                .setTimestamp();

                const channelfetch = await client.channels.fetch(logChannelId);
                channelfetch.send({ embeds: [embed]});
            }
             users.delete(member.id);
        }
    }
});

client.login(token);
