const Canvas = require('@napi-rs/canvas');
const { GlobalFonts} = require('@napi-rs/canvas');
const { request } = require('undici');
const path = require('node:path');

GlobalFonts.registerFromPath(path.join(__dirname, '../.fonts', 'LeagueSpartan-SemiBold.ttf'), 'League Spartan semibold')
GlobalFonts.registerFromPath(path.join(__dirname, '../.fonts', 'LeagueSpartan-Regular.ttf'), 'League Spartan regular')
GlobalFonts.registerFromPath(path.join(__dirname, '../.fonts','LeagueSpartan-Medium.ttf'), 'League Spartan medium')



async function gerarImagemPerfil(member) {

    const canvas = Canvas.createCanvas(700, 240);
    const context = canvas.getContext('2d');

    const background = await Canvas.loadImage(path.join(__dirname, '../assets/background.png'));

    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    const { body } = await request(member.displayAvatarURL({ extension: 'jpg' }));
    const avatar = await Canvas.loadImage(await body.arrayBuffer());

    // // top 
    // context.font = "regular 14px League Spartan"
    // context.fillStyle = "#ffffff";
    // context.fillText("GRACE-ICMC-USP", 216, 63);

    context.save();
    context.beginPath();

    context.arc(123.5, 120.5, 74.5, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();

    context.drawImage(avatar, 49, 46, 149, 149);
    context.restore();


    context.textBaseline = 'top';
    context.fillStyle = '#FFFFFF';

    context.font = "500 14px 'League Spartan regular'";
    context.fillStyle = "#ffffff";
    context.fillText("GRACE-ICMC-USP", 225, 63);

    context.font = "600 64px 'League Spartan semibold'";
    context.fillText("Bem-vinda,", 225, 85);

    context.font = "500 36px 'League Spartan regular'";
    context.fillText(member.user.username, 225, 140);

    context.font = "500 14px 'League Spartan regular'";
    context.fillStyle = "#ffffff";
    context.fillText("grace.icmc.usp.br", 551, 195);
    

    return canvas.encode('png');
}


module.exports = { gerarImagemPerfil };


// 	context.drawImage(background, 0, 0, canvas.width, canvas.height);

// 	const { body } = await request(message.author.displayAvatarURL({ extension: 'jpg' }));
// 	const avatar = await Canvas.loadImage(await body.arrayBuffer());

//     console.log("Passou segunda etapa");

// 	// const avatar = await Canvas.loadImage(member.author.displayAvatarURL({ extension: 'jpg' }));
//     context.font = "semibold 64px League Spartan"
//     context.fillStyle = '#ffffff';
//     context.fillText(`Bem vinda, ${message.author.username}`, 216, 83); 

// 	context.drawImage(avatar, 25, 0, 200, canvas.height);

//     console.log("Até aqui tudo certo");

// 	const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });

// 	await message.channel.send({files: [attachment]});
//     }
//  }
// }

