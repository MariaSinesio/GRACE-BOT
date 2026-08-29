// const {AttachmentBuilder, Events} = require(discord.js);
// const {botPrefix} = require('../../config.json');
// const Canvas = require('@napi-rs/canvas');
// const request = require('undici');
// const {path} = require('../user.js');

// registerFont(path.join(__dirname, '../.fonts', 'LeagueSpartan-SemiBold.otf', {family: 'League Spartan'}))
// registerFont(path.join(__dirname, '../.fonts', 'LeagueSpartan-Regular.otf', {family: 'League Spartan'}))
// registerFont(path.join(__dirname, '../.fonts','LeagueSpartan-Medium.otf', {family: 'League Spartan'}))

//  module.exports = {
//     name: 'messageCreate',
// async execute(member) {

// 	if (member.content === `${botPrefix}profile`) {

// 	const canvas = Canvas.createCanvas(700, 240);
// 	const context = canvas.getContext('2d');
// 	const background = await Canvas.loadImage('../assets/background.png');


// 	context.drawImage(background, 0, 0, canvas.width, canvas.height);

// 	const { body } = await request(member.author.displayAvatarURL({ extension: 'jpg' }));
// 	const avatar = await Canvas.loadImage(await body.arrayBuffer());

// 	// const avatar = await Canvas.loadImage(member.author.displayAvatarURL({ extension: 'jpg' }));
//     context.text = "semibold 64px League Spartan"
//     context.fillStyle = '#ffffff';
//     context.fillText("Bem vinda,")

// 	context.drawImage(avatar, 25, 0, 200, canvas.height);

// 	const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });

// 	await member.channel.send({files: [attachment]});
//     }
//  }
// }

