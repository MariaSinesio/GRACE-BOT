## Bot de gerenciamento interno do GRACE-USP (GRACEBOT)

**GRACEBOT** é uma aplicação, bot em javascript para o Discord que visa o gerenciamento dos canais de voz para monitoria do GRACE-USP. 

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

Não basta o canal existir, o bot precisa de permissões explícitas nele, como:

- **Ver Canal:** Para detectar eventos e membros.

- **Enviar Mensagens:** Para postar os registros.

- **Anexar Arquivos:** Fundamental para o envio do thumbnail.gif de boas-vindas.

- **Inserir Links:** Necessário para que os EmbedBuilder apareçam com formatação.

## Deploy

Atualmente utilizamos o [Discloud](https://discloud.com/) para hospedar a aplicação.

## Licença 

Esse repositório utiliza uma licença MIT. 

