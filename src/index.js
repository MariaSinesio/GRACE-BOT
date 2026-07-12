const { Client, Events, GatewayIntentBits, EmbedBuilder, ActivityType, AttachmentBuilder, WelcomeChannel } = require('discord.js'); // Importa as classes necessárias
const fs = require('node:fs');
const path = require('node:path'); //nativo
const { token, logChannel, welcomeChannel, ceo, botPrefix, AUTO_ROLE_ID, spamChannel} = require('../config.json'); 

const client = new Client({ intents: [GatewayIntentBits.GuildVoiceStates,GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] }); // garante o funcionamento, ou seja,caches de guildas, canais e funções sejam preenchidos e estejam disponíveis para uso interno.

client.once('ready', () => {
  console.log('Bot está online!'); //Evento disparado quan o bot estiver onn
});

const users = new Map();
const channelLogs = logChannel; 
const channelWelcome = welcomeChannel;

// se o bot esiver on, a mensagem é disparada.
client.on('messageCreate', message => {
    if (message.content.toLowerCase() === `${botPrefix}oi`) {
        if (message.author.bot) return;
        message.channel.send(`Olá, ${message.author}! Sou o bot de gerenciamento do GRACE-USP :). Minha criadora é a <@${ceo}>, caso tenha dúvidas, entre em contato com ela! `)
    } 
})

// status do bot
client.once('ready', () => {
    console.log('Status funcionando!');

    client.user.setPresence({
        activities: [{ name: '🎶Gerenciando o Grace-usp. Digite !oi', 
            type: ActivityType.Watching }],
        status: 'online',
    });
});

// definição dos canais de logs
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content === `${botPrefix}canal`) {
        
        const channel = message.guild.channels.cache.find(c => c.name === channelLogs);

        if (channel) {
            await channel.send('Estarei mandando os logs para este chat!');
        } else {
            message.reply(`Não consegui encontrar um canal chamado "${channel}", por favor, crie um.`);
        }
    }
});


// evento de boas vindas
client.on(Events.GuildMemberAdd, async member => {
    console.log("Um novo usuário foi detectado");

    const channel = await member.guild.channels.cache.find(f => f.name === channelWelcome); //logchannelid
    const nameGuild = member.guild.name.slice(0, 21);

    if (channel) {
    const gifThumb = new AttachmentBuilder(path.join(__dirname, 'assets', 'thumbnail.gif'), { name: 'thumbnail.gif' }) //garantir que o caminho está correto
    const memberTotal = member.guild.memberCount;
    const embed = new EmbedBuilder()
    .setImage('attachment://thumbnail.gif')
    .setTitle(`Bem vinda a ${nameGuild} do Grace!❤️`)
    .setDescription(`Oi, ${member.user}! é um prazer tê-la aqui conosco. Pedimos que se **apresente** aos demais membros e aproveite sua jornada. Em casos de dúvida, entre em contato com algum monitor.\n
    Respeite sempre as regras do grupo e seja educada com os outros membros.\n
    Pedimos que olhe o canal de **FAQ** para tirar dúvidas ou escreva ${botPrefix}**faq** para acessar as perguntas mais frequentes. \n
    Fun Fact: Sabia que você se tornou o ${memberTotal}º membro do nosso grupo? Estamos muito felizes em te ter aqui! ☆*: (≧▽≦)o :*☆\n
    ⋅⊰⊱⋅ ──────────── ⋅⊰⊱⋅ ──────────── ⋅⊰⊱⋅ ──────────── ⋅⊰`)
    .setColor("Purple")
    .setFooter({ text: "GRACE-USP", date: Date.now()})
    channel.send({ embeds: [embed], files: [gifThumb] });
    }
})

//auto-role bem sucedido
client.on(Events.GuildMemberAdd, async member => {

    clientRole = member.guild.roles.cache.get(AUTO_ROLE_ID);

    if (clientRole) {
        await member.roles.add(clientRole);
    } else {
        console.log("Não foi possível adicionar esse cargo automaticamente!")
    }
})

//faq perguntas frequentes
client.on('messageCreate', message => {
    if(message.author.bot) return;

   if(message.content === `${botPrefix}faq`) { //seta qualquer canal
    const embed = new EmbedBuilder()
    .setTitle("FAQ | GRACE-USP")
    .setFields(
        { name: "Quem somos nós?",  value: "O Grace é um projeto de extensão proveniente da USP que visa democratizar e incluir o ensino nas áreas STEM para jovens"},
        {name: "Qual curso oferecemos atualmente?", value: "Curso de Desenvolvimento Web para meninas"},
        {name: "Como funciona as entregas das atividades?", value: "As atividades são entregues semanalmente, separadas por módulos."},
        {name: "Quais softwares serão usados para organização do curso?", value: "O acompanhamento pedagógico do curso será feito pelo Discord e conteúdos do curso serão disponibilizados no Google Classroom, inclusive as atividades."},
        {name: "Como funciona as monitorias?", value: "As monitorias acontecem todos os dias ao longo da semana, em horários diferentes, para que todas consigam participar. A participação é *obrigatória* e as alunas devem entrar pelo menos 1 vez por semana numa monitoria através dos canais de voz do Discord."},
        {name: "Como minha presença é contabilizada na monitoria?", value: "Ela é feita de forma automatizada através de um bot, por isso é importante a entrada no canal de voz."},
        {name: "Atrasei uma tarefa, e agora?", value: "O importante é a entrega efetiva das tarefas, mesmo que com atraso. A comunicação também é essencial, em casos de imprevistos, avise algum responsável da organização."},
        {name: "Quais são os horários/dias das monitorias?", value: "Esse tópico é disponibilizado pela organização, por isso, fique atenta(o) ao chat do Discord."},
        {name: "Como funciona as entregas das atividades?", value: "As atividades são entregues semanalmente, separadas por módulos."},
        {name: "Tenho uma dúvida! Posso tirar com qualquer monitor?", value: "Sim, pode! Pode enviar sua dúvida ao chat de dúvidas ou entrar em contato com um monitor da sua preferência."},
        {name: "O curso tem certificado?", value: "Sim, ao final do curso serão disponibilizados certificados a aqueles que entregaram as tarefas e tiveram 70% de presença, no mínimo."}

    )
    .setColor("Purple")
    message.channel.send({embeds: [embed]})
}
})

// canal de voz contabilização
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
                .setDescription(`${member.user.tag} ficou **${min} minuto(s)** no canal.`)
                .setThumbnail(member.user.displayAvatarURL())
                .setFields(
                    { name: 'Canal de voz:', value: oldState.channel.name, inline: true}
                )
                .setFields(
                    { name: 'Id do usuário:', value: member.id, inline: false},
                    { name: 'Nome de usuário no grupo:', value: member.displayName, inline: true},
                    { name: 'Canal de voz:', value: oldState.channel.name, inline: false}
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

// custom tp
client.on('messageCreate', async message => {
    if (message.author.bot) return;

    if (message.content === `${botPrefix}customtp`) {
        const embed = new EmbedBuilder()
        .setTitle('NÃO MANDE MENSAGEM AQUI!')
        .setDescription('Este canal é um chat isca afim de proteger o servidor e os usuários. Repito, NÃO mande mensagem aqui! Qualquer mensagem enviada resultará num **mute de 1 semana**.')
        .setColor('Purple')
        .setTimestamp();
        message.channel.send({ embeds: [embed]});
    }
})


// anti spam

client.login(token);


