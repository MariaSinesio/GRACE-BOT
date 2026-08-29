 const { logChannel, welcomeChannel} = require('../config.json');


 const path = require('node:path'); //nativo
 const users = new Map();
 const channelLogs = logChannel; 
 const channelWelcome = welcomeChannel;

 module.exports = { users, channelLogs, channelWelcome, path}; // Aqui estamos exportanto essas variaveis para podermos usar em outros lugares
// o nome desse tipo de coisa que eu fiz, onde temos o map que guarda dados reais na memoria se chama singleton, logo,  ele pode ser acessado de qualquer lugar do código