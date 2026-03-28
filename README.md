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
- Adicione as chaves necessárias, isso inclui `token`, `client_id`, `guild_id`, entre outros.

4. **Rode localmente**

Para rodar em modo de desenvolvimento: 

```
npm run dev
```
ou
```
node app.js
```

[^1]: É preciso explicitar que essa aplicação é de uso interamente interno.

## Licença 

Esse repositório utiliza uma licença MIT. 

