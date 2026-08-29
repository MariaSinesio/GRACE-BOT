//auto-role bem sucedido
const {AUTO_ROLE_ID} = require('../../config.json');

module.exports = {
 name: "guildMemberAdd",
 async execute(member) {
    const clientRole = member.guild.roles.cache.get(AUTO_ROLE_ID);

    if (clientRole) {
        await member.roles.add(clientRole);
    } else {
        console.log("Não foi possível adicionar esse cargo automaticamente!")
    }
 }
}