"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const path = require('path');
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const config_1 = tslib_1.__importDefault(require("./config"));
const commands_1 = tslib_1.__importDefault(require("./commands"));
const { intents, prefix, token } = config_1.default;
const client = new discord_js_1.Client({
    intents,
    presence: {
        status: 'online',
        activities: [{
                name: `${prefix}help`,
                type: 'LISTENING'
            }]
    }
});
var server = "";
client.on('ready', () => {
    console.log(`Logged in as: ${client.user?.tag}`);
});
console.log("╭─━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━─╮");
console.log(" LIVE CHAT LOG - See the Serverwise Logs For Details");
console.log("╰─━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━─╯");

function logwrite(msg, server, chatroom) {
/* 𝐎𝐏𝐄𝐍𝐈𝐍𝐆 𝐀 𝐅𝐈𝐋𝐄 𝐯𝟎𝟏
fs.open('Serverwise/'+String(server)+'/'+String(chatroom)+'/'+'_MESSAGES.log','a+');*/
/* 𝐎𝐏𝐄𝐍𝐈𝐍𝐆 𝐀 𝐅𝐈𝐋𝐄 𝐯𝟎𝟐
fs.open('Serverwise/'+String(server)+'/'+String(chatroom)+'/'+'_MESSAGES.log','a+',function (err, f) {
   if (err) {
      return console.error(err);
});*/
/*/ 𝐂𝐇𝐄𝐂𝐊𝐈𝐍𝐆 𝐈𝐅 𝐓𝐇𝐄 𝐃𝐈𝐑𝐄𝐂𝐓𝐎𝐑𝐘 𝐄𝐗𝐈𝐒𝐓𝐒
if (fs.existsSync(path.join(__dirname, 'Serverwise/'+String(server)+'/'+String(chatroom)+'/'+'MESSAGES.log'))) {
fs.appendFile('Serverwise/'+String(server)+'/'+String(chatroom)+'/'+'MESSAGES.log', msg+'\n', err => {
  if (err) {
    console.error(err);
  }
});
} else { */
fs.mkdirSync('Serverwise/'+String(server)+'/'+String(chatroom)+'/', { recursive: true });
fs.appendFileSync('Serverwise/'+String(server)+'/'+String(chatroom)+'/'+'MESSAGES.log', msg+'\n', function (err) {
  if (err) throw err;
});
};
//};

/*fs.open('Serverwise/'+String(server)+'/'+String(chatroom)+'/'+'_MESSAGES.log', 'a+', function (err, f) {
  console.log('Saved!');
});
fs.appendFileSync('Serverwise/'+String(server)+'/'+String(chatroom)+'/'+'_MESSAGES.log',msg);
fs.close
  /*fs.appendFileS(content, err => {
  if (err) {
    console.error(err);
  }
  // message/activity logged!
});*/

client.on('memberJoin', async (member) => {
  console.log('Member: ', member, " joined!");
});
client.on('memberRemove', async (member) => {
  console.log('Member: ', member, 'left/removed!');
});
client.on('guildRoleCreate', async (role) => {
  console.log('Role:', role, 'created!');
});
client.on('guildRoleDelete', async (role) => {
  console.log("Role:", role, "deleted!");
});
client.on('guildChannelCreate', async (channel) => {
  console.log("Channel: " + String(channel) + " created!" );
});
client.on('guildChannelDelete', async (channel) => {
  console.log("Channel: " + String(channel) + " deleted!");
});
client.on('guildChannelUpdate', async (channel) => {
  console.log("Channel: " + String(channel) + " updated!");
});
/* OBSOLETE METHOD OF TRIGGERING MESSAGE EVENT
client.on("message", async (message) => {
  const channel = message.channel;
  if (server = channel.guild) {
    server = channel.guild;  
  } else {
    console.log("Message sent in DMs");
    server = '_privatemsg_'
  console.log(message.author, "said:", message.content, "-- Time:", stats.ctime());
  };
}); */

client.on('messageCreate', async (message) => {
    if (message.author.bot)
        return;
    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).split(' ');
        const command = args.shift();
        
        switch (command) {
            
            case 'test':
                const msg = await message.reply('Pinging...');
                await msg.edit(`Received! Current latency is  ${Date.now() - msg.createdTimestamp}ms.`);
                break;
            case 'say':
            case 'repeat':
                if (args.length > 0)
                    await message.channel.send(args.join(' '));
                else
                    await message.reply('You did not send a message to repeat, cancelling command.');
                break;
            case 'serverinfo':
                console.log(message.channel);
                await message.reply("Sent a detailed server profile to the developer's console. :white_check_mark: ");
                break;
            case 'help':
                 const row = new discord_js_1.MessageActionRow()
    .addComponents(
				new discord_js_1.MessageButton()
					.setLabel('Website')
          .setURL('https://muxday.muxsites.com/posts/discordbot/')
					.setStyle('LINK'),
        new discord_js_1.MessageButton()
          .setLabel('Twitch')
          .setURL('https://twitch.tv/muxday')
          .setStyle('LINK'),
        new discord_js_1.MessageButton()
          .setLabel('Contact')
          .setStyle('LINK')
          .setURL('https://discord.com/invite/RUVPF75')
          .setDisabled('true'),
			); 
                const embed = (0, commands_1.default)(message);
                embed.setThumbnail(client.user.displayAvatarURL());
                await message.channel.send({embeds: [embed], components: [row]});
                // await message.channel.send({ephemeral: true, embeds: [embed], components: [row] });
                break;
        }
    } else {
      console.log('\x1b[36m%s\x1b[0m',message.channel.guild.name,"\x1b[33m#"+message.channel.name,"\x1b[0m");
      console.log(message.author.username + "#" + message.author.discriminator, "said: ", message.content);
      // server = message.channel.guild;
      // FRMT : logwrite(String msg, server, chatroom)
      logwrite(String(message.author.username) + "#" + String(message.author.discriminator) + " said: " + String(message.content), message.channel.guild.name, message.channel.name);
      /* 𝐈𝐍𝐂𝐋𝐔𝐃𝐈𝐍𝐆 𝐓𝐈𝐌𝐄𝐒𝐓𝐀𝐌𝐏𝐒
console.log(message.author, "said:", message.content, "-- Time:", stats.ctime()); */
    };
});
client.login(token);
//# sourceMappingURL=index.js.map