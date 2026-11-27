# Contribuindo

O **GRACE** foi criado originalmente para atender às necessidades do GRACE-ICMC-USP e é mantido de forma independente, porém também se trata de um projeto open source, ajustes de código, reporte de bugs, novas funcionalidades ou qualquer tipo de ajuda é muito bem-vinda, mesmo se tratando de um projeto com um propósito específico.

## Código de conduta

Mantenha um ambiente respeitoso e colaborativo. Críticas devem ser sempre construtivas e focadas no código ou nas ideias. Comportamentos ofensivos, spam ou desrespeito não serão tolerados. Qualquer problema pode ser reportado diretamente a mim em `miasinesio@gmail.com`.

## Rodando o projeto localmente

Você vai precisar de **Node.js v20+**, **Git** e um bot de testes criado no [Discord Developer Portal](https://discord.com).

1. **Faça um fork e clone o repositório:**
   ```
   git clone https://github.com/MariaSinesio/GRACE-BOT.git
   cd GRACE-BOT
   ```
2. **Instale as dependências:**
   ```
   npm install
   ```
3. **Configure as variáveis de ambiente:**
    Crie um `.env` e preencha `DISCORD_TOKEN`, `CLIENT_ID` e `GUILD_ID` e demais variáveis conforme a necessidade.
4. **Inicie o bot em desenvolvimento:**
   ```
   npm run dev
   ```

## Como contribuir

1. **Abra uma Issue antes de grandes mudanças:** Como o bot atende fluxos específicos do servidor, abra um issue detalhando a questão antes de qualquer coisa.

2. **Crie uma branch:**
   ```
   git checkout -b feat/nome-da-melhoria
   ```

3. **Mantenha o padrão do código:**
   * Organize comandos com `SlashCommandBuilder` em `src/utilities/`.
   * Valide permissões e trate erros para evitar quedas do processo.

4. **Abra um Pull Request:** Descreva o que foi feito e como testá-la no Discord.

## Licença

Este projeto é distribuído sob a licença **MIT** — fique à vontade para estudar, adaptar para o seu próprio grupo ou contribuir de volta com melhorias.

