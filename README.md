## Bot de gerenciamento interno do GRACE-USP (GRACEBOT)

**GRACEBOT** é uma aplicação, bot em javascript para o Discord que visa o gerenciamento dos canais de voz para monitoria do GRACE-USP, facilitando o controle de entrada e saída e o tempo que o perfil permaneceu durante o evento, sendo um indicador crucial para presença, engajamento de alunas e mentores, assim como métricas estatísticas feitas pelo grupo interno.

Adicionalmente, há o recurso de ```boas-vindas``` já acolhendo e direcionando as alunas do que diz respeito a regras, curiosidades e perguntas-respostas do FAQ. 

## Estrutura de pastas

```
├── grace-bot/
│   ├── node_modules/
│   ├── src/
│   │   ├── assets/
|   |      └── thumbnail.png
|   | └── index.js
|   | └── commands.js
├── README.md
└── .gitignore
└── LICENSE
└── discloud.config
└── config.json
└── package.json 

```
## Lista de comandos

- ``!oi`` - Comando para verificar o bot
- ``!faq`` - Oferece informações importantes sobre o projeto, cursos, monitores e outros dados pertinentes.

### Funcionalidades

| Funcionalidades | Detalhes/Classes |
| :--- | :--- |
| oi | Comando que verifica o estado do bot e recebe contato da criadora em casos de dúvida, utiliza estrutura básica de envio de mensagem no caso de envio do comando  |
| Faq | Comando que utiliza estrutura de ``EmbedBuilder`` para um corpo de texto mais rico em detalhes |
| Contabilidade de frequência | Utilize ``Events.VoiceStateUpdate`` estabelece controle e conectividade com o bot através de estados que podem ser detectados quando um usuário entra ou sai, possibilitando o rastreio. Através de lógica, é possivel calcular o tempo de permanencia do usuário no canal de voz. Utiliza ``EmbedBuilder`` para fornecer mais detalhes no log que é disparado quando o usuário sai. |
| Boas vindas | Mensagem de boas vindas disparada quando um membro entra na comunidade, sendo possível com ``Events.GuildMemberAdd`` e ``EmbedBuilder`` para construção da mensagem de onboarding. |



## Pré Requisitos

- Node.js (*Versão 16.x ou superior*)
- npm 
- Conta Discord com permissões de **desenvolvedor**

## Setup 

1. **Clone o repositório** 

```
git clone https://github.com/MariaSinesio/GRACEBOT.git
cd repo
```

2. **Instale as dependências**

```
npm install
```

3. **Configure as variáveis de ambiente**

- Dentro de um .env, armazene todas as chaves e dados sensíveis. (*Caso não tenha, crie o arquivo*)
- Adicione as chaves necessárias, isso pode incluir `token`, `client_id`, `guild_id`.
4. **Rode localmente**

Para rodar em modo de desenvolvimento: 

```
npm run dev
```
ou
```
node app.js
```

*É preciso explicitar que essa aplicação é de uso interamente interno*

## Configuração dos canais

Para que o bot funcione corretamente em múltiplos servidores, ele depende de uma estrutura específica definida no arquivo config.json e da existência de canais com nomes exatos nos servidores do Discord, como dito anteriormente. 

Sendo assim, é necessário que tenha: 

``log`` -	**Canal onde o bot enviará registros de tempo de voz e entradas.**	

`` Welcome `` - **Destinado à recepção de novos membros com o Embed e GIF.**

### Importante

O bot precisa de permissões explícitas nele, como:

- **Ver Canal:** Para detectar eventos e membros.

- **Enviar Mensagens:** Para postar os registros.

- **Anexar Arquivos:** Fundamental para o envio do thumbnail.gif de boas-vindas.

- **Inserir Links:** Necessário para que os EmbedBuilder apareçam com formatação.

## Deploy

Atualmente utilizamos o [Discloud](https://discloud.com/) para hospedar a aplicação.

## Licença 

Esse repositório utiliza uma licença MIT. 

