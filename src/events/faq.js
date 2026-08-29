const {botPrefix} = require('../../config.json');
const {EmbedBuilder} = require('discord.js');
//faq perguntas frequentes

module.exports = {
    name: 'messageCreate',
    async execute(message) {
    if(message.author.bot) return;

   if(message.content === `${botPrefix}faq`) { //seta qualquer canal
    const embed = new EmbedBuilder()
    .setTitle("FAQ | GRACE-USP")
    .setFields(
        {name: "Quem somos nós?",  value: "O Grace é um projeto de extensão proveniente da USP que visa democratizar e incluir o ensino nas áreas STEM para jovens"},
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
    .setFooter({ text: "GRACE-USP", date: Date.now()})
    message.channel.send({embeds: [embed]})
    }
 }
}