"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const config_1 = tslib_1.__importDefault(require("./config"));
const { prefix } = config_1.default;

const commands = {
    'help': {
        description: 'Directory of available commands',
        format: 'help'
    },
    'test': {
        description: 'Checks connectivity with Discord\'s servers.',
        format: 'test'
    },
    'say': {
        aliases: ['repeat'],
        description: 'Repeats whatever is said.',
        format: 'say <message>'
    }
};


// help
function helpCommand(message) {
    const footerText = "Requested by "+message.author.tag;
    const footerIcon = message.author.displayAvatarURL();
    const embed = new discord_js_1.MessageEmbed()
        .setTitle('HELP MENU')
        .setColor('#5865F2')
        .setFooter({ text: footerText, iconURL: footerIcon })
        .setDescription('Sadly, **MuxDay** (the bot) is not ready for public consumption yet. If you have early access, congrats! Stay tuned for more updates and features');
    /* for (const commandName of Object.keys(commands)) {
        const command = commands[commandName];
        let desc = command.description + '\n\n';
        if (command.aliases)
            desc += `**Aliases :** ${command.aliases.join(', ')}\n`;
        desc += '𝗲𝘅𝗮𝗺𝗽𝗹𝗲:\n```\n' + prefix + command.format + '```';
        embed.addField(commandName, desc, false);
        
    };
    /* const embed = new discord_js_1.MessageEmbed()
			.setColor('#5865F2')
			.setTitle('HELP MENU')
			.setDescription('Sadly, **MuxDay** (the bot) is not ready for public consumption yet. If you have early access, congrats! Stay tuned for more updates and features');
		const row = new discord_js_1.MessageActionRow()
    .addComponents(
				new discord_js_1.MessageButton()
					.setCustomId('website')
					.setLabel('Website')
          .setURL('https://muxday.muxsites.com/posts/discordbot/')
					.setStyle('LINK'),
        new discord_js_1.MessageButton()
          .setCustomId('twitch')
          .setLabel('Twitch')
          .setURL('https://twitch.tv/muxday')
          .setStyle('LINK'),
        new discord_js_1.MessageButton()
          .setCustomId('contact')
          .setLabel('Contact')
          .setStyle('LINK')
          .setURL('https://discord.com/invite/RUVPF75')
          .setDisabled('true'),
			);
    return ({ content: '', ephemeral: true, embeds: [embed], components: [row] }); */
    return embed;
};
exports.default = helpCommand;
//# sourceMappingURL=commands.js.map