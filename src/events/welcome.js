// evento de boas vindas
const {AttachmentBuilder, EmbedBuilder} = require('discord.js');
const {channelWelcome, path} = require('../user.js');
const {botPrefix} = require('../../config.json')

module.exports = {
  name: 'guildMemberAdd',
async execute(member) {
    console.log("Um novo usuário foi detectado");

    const channel = await member.guild.channels.cache.find(f => f.name === channelWelcome); //logchannelid
    const nameGuild = member.guild.name.slice(0, 21);

    if (channel) {
    const gifThumb = new AttachmentBuilder(path.join(__dirname, '../assets', 'thumbnail.gif'), { name: 'thumbnail.gif' }) //garantir que o caminho está correto
    const memberTotal = member.guild.memberCount;
    const embed = new EmbedBuilder()
    .setImage('attachment://thumbnail.gif')
    .setTitle(`Bem vinda a ${nameGuild} do Grace!❤️`)
    .setDescription(`Oi, ${member.user}! é um prazer tê-la aqui conosco! Pedimos que se **apresente** aos demais membros e em casos de dúvida, entre em contato com algum monitor ou organização.
    \nPedimos que olhe o canal de <#1525580993627426856> para tirar dúvidas ou escreva ${botPrefix}**faq** para acessar o template de perguntas-frequentes.
    \n Visite o canal de <#1540355097811222568> para visualizar os avisos gerais emitidos pela organização.
    \n Fun Fact: Sabia que você se tornou o ${memberTotal}º membro do nosso grupo? Estamos muito felizes em te ter aqui! (≧▽≦)\n`)
    .setColor("Purple")
    .setFooter({ text: "GRACE-USP", date: Date.now()})
    channel.send({ embeds: [embed], files: [gifThumb] });
    }
  }
}
