const {botPrefix, ceo} = require('../../config.json');

// se o bot esiver on, a mensagem é disparada.
module.exports = {
    name: 'messageCreate',
    async execute(message) {
    if (message.content.toLowerCase() === `${botPrefix}oi`) {
        if (message.author.bot) return;
        message.channel.send(`Olá, ${message.author}! Sou o bot de gerenciamento do GRACE-USP :). Minha criadora é a <@${ceo}>, em caso de dúvidas ou feedback, pode entrar em contato com ela!`)
    } 
 }
}