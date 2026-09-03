const { Client, GatewayIntentBits} = require('discord.js'); // Importa as classes necessárias
const fs = require('node:fs');
const path = require('node:path');
const {token} = require('../config.json');

const client = new Client({ 
    intents: [GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent, 
        GatewayIntentBits.GuildMembers] }); // garante o funcionamento, ou seja,caches de guildas, canais e funções sejam preenchidos e estejam disponíveis para uso interno.

const pathEvent = path.join(__dirname, 'events');
const endFiles = fs.readdirSync(pathEvent).filter(file => file.endsWith('.js'));

for (const file of endFiles) {
    const files = path.join(pathEvent, file);
    const event = require(files);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(token);

// feito com auxilio de ia

// Decidi modularizar o código por uma questão simples, além de evitar um index gigante conforme o crescimento do porgrama, também evito o consumo de "lixo" na memória, algo que é consumido de forma desnecessária, mostrando eficiencia.

// Como eu tinha bem definido a arquitetura que eu iria seguir e algum conhecimento no que eu estava fazendo, foi relativamente simples reorganizar o código, separando em escopos.

// Unica questão que vi foi a leitura de arquivos e separação de variáveis de estado, onde tive que avaliar melhor minha lógica.



