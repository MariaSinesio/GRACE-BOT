const { Client, Events, GatewayIntentBits, EmbedBuilder, ActivityType, AttachmentBuilder, WelcomeChannel } = require('discord.js'); // Importa as classes necessárias
const fs = require('node:fs');
const path = require('node:path'); //nativo
const { token, logChannel, botPrefix } = require('../config.json'); 

const client = new Client({ intents: [GatewayIntentBits.GuildVoiceStates,GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] }); // garante o funcionamento, ou seja,caches de guildas, canais e funções sejam preenchidos e estejam disponíveis para uso interno.

client.once('ready', () => {
  console.log('Bot está online!'); //Evento disparado quan o bot estiver onn
});

const users = new Map();
const channelLogs = logChannel; 
const channelWelcome = welcomeChannel;

client.on('messageCreate', message => {
    if (message.content.toLowerCase() === `${botPrefix}oi`) {
        if (message.author.bot) return;
        message.channel.send(`Olá, ${message.author}! Sou o bot de gerenciamento do GRACE-USP :)`)
    } 
})

client.once('ready', () => {
    console.log('Status funcionando!');

    client.user.setPresence({
        activities: [{ name: '🎶Gerenciando o Grace-usp. Digite !oi', 
            type: ActivityType.Watching }],
        status: 'online',
    });
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content === `${botPrefix}canal`) {
        
        const channel = message.guild.channels.cache.find(c => c.name === channelLogs);

        if (channel) {
            await channel.send('Estarei mandando os logs para este chat!');
        } else {
            message.reply(`Não consegui encontrar um canal chamado "${channel}".`);
        }
    }
});


client.on(Events.GuildMemberAdd, member => {
    console.log("Um novo usuário foi detectado");

    const channel = member.guild.channels.cache.find(channelWelcome); //logchannelid

    if (channel) {
    const gifThumb = new AttachmentBuilder(path.join(__dirname, 'assets', 'thumbnail.gif'), { name: 'thumbnail.gif' }) //garantir que o caminho está correto
    const memberTotal = member.guild.memberCount;
    const embed = new EmbedBuilder()
    .setImage('attachment://thumbnail.gif')
    .setTitle('Bem vinda ao Grace-usp!❤️')
    .setDescription(`Oi, ${member.user}! é um prazer tê-la aqui conosco. Pedimos que se apresente aos demais membros e aproveite sua jornada. Em casos de dúvida, entre em contato com algum monitor.\n
    Respeite sempre as regras do grupo e seja educada com os outros membros.\n
    Fun Fact: Sabia que você se tornou o membro número ${memberTotal} do nosso grupo? Estamos muito felizes em te ter aqui! ☆*: (≧▽≦)o :*☆
    ⋅⊰⊱⋅ ──────────── ⋅⊰⊱`)
    .setColor("Purple")
    channel.send({ embeds: [embed], files: [gifThumb] });
    }
})

client.on(Events.VoiceStateUpdate, async (oldState, newState) => {
    const member = newState.member;
    const guild = newState.guild;

    if (!member || member.user.bot) return; 

    if (!oldState.channelId && newState.channelId) {
        users.set(member.id, Date.now());
        console.log(`${member.user.tag} entrou`);
}

if (oldState.channelId && !newState.channelId) {
        const startTime = users.get(member.id);
        console.log(`${member.user.tag} saiu`);
        if (startTime) {
            const endTime = Date.now();
            const durationMs = endTime - startTime;

            const min = Math.floor(durationMs / 60000);

            if(channelLogs) {
                const embed = new EmbedBuilder()
                .setTitle('Registro do tempo no canal de voz')
                .setDescription(`${member.user.tag} ficou ${min} minuto(s) no canal.`)
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

                const channelfetch = await guild.channels.cache.find(c => c.name === channelLogs); //usa-se find
                channelfetch.send({ embeds: [embed]});
            }
             users.delete(member.id);
        }
    }
});

client.login(token);
