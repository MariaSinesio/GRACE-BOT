const {EmbedBuilder} = require('discord.js');
const {channelLogs, users} = require('../user.js');


// canal de voz contabilização
module.exports = {
    name: "voiceStateUpdate",
    async execute (oldState, newState, client) {
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
 }
}