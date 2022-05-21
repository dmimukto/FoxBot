const music = require('@koenie06/discord.js-music');

//
//
//

client.on('interactionCreate', async (interaction) => {
    if(interaction.isCommand()) {
        if(interaction.commandName === 'play') {

            /* AUDIO FEATURES */
          /* Relies on this brilliant module : @koenie06/discord.js-music */

           const channel = interaction.member.voice.channel;
           const song = interaction.options.getString('song');
// play
           music.play({
               interaction: interaction,
               channel: channel,
               song: song
           });
        };
// stop
      if(interaction.commandName === 'stop') music.stop({ interaction: interaction });
// skip
        if(interaction.commandName === 'skip') music.skip({ interaction: interaction });
// pause
      if(interaction.commandName === 'pause') music.pause({ interaction: interaction });
// resume
      if(interaction.commandName === 'resume') music.resume({ interaction: interaction });
// repeat
      if(interaction.commandName === 'repeat') {



            const isEnabled = interaction.options.getBoolean('onoff');

            music.repeat({
                interaction: interaction,
                value: onOrOff
            });
        };
// volume
      if(interaction.commandName === 'volume') {
            

            
            const volume = interaction.options.getInteger('volume');
            
            music.volume({
                interaction: interaction,
                volume: volume
            });
        };
// jump
      if(interaction.commandName === 'jump') {



            const number = interaction.options.getInteger('number');

            music.jump({
                interaction: interaction,
                number: number
            });
        };
// getqueue
      if(interaction.commandName === 'getqueue') console.log(await(music.getQueue({ interaction: interaction })));
// removequeue
      if(interaction.commandName === 'removequeue') {



            const number = interaction.options.getInteger('number');

            music.removeQueue({
                interaction: interaction,
                number: number 
            });
        };
// isconnected
      if(interaction.commandName === 'isconnected') {



            const isConnected = await music.isConnected({ interaction: interaction });
    
            interaction.reply({ content: isConnected === true ? 'Connected ✅' : 'Not connected ❌' });

        };
// ispaused
      if(interaction.commandName === 'ispaused') {



            const isPaused = await music.isPaused({ interaction: interaction });
    
            interaction.reply({ content: isPaused === true ? 'Paused ⏸️' : 'Music player is currently active! 🎵' });
        };
// isresumed
      if(interaction.commandName === 'isresumed') {


            const isResumed = await music.isResumed({ interaction: interaction });
    
            interaction.reply({ content: isResumed === true ? 'Music player is currently active! 🎵' : 'Paused ⏸️' });
        };
// isrepeated
      if(interaction.commandName === 'isrepeated') {

            /*
             * This function returns a boolean whenever it is resumed or not.
             * 'true' means that the playing song is on repeat.
             * 'false' means that the queue is just playing normally.
            */

            const isRepeated = await music.isRepeated({ interaction: interaction });
    
            interaction.reply({ content: isRepeated === true ? 'Song on repeat 🔂' : 'Song in normal queue ▶️' });
        };
// events
const audioevents = music.event;

audioevents.on('playSong', async (channel, songInfo, requester) => {

    /* See all the 'songInfo' options by logging it.. */

    channel.send({
        content: `Started playing the song [${songInfo.title}](${songInfo.url}) by \`${songInfo.author}\`.
        Requested by ${requester.tag} (${requester.id})`
    });

});

audioevents.on('addSong', async (channel, songInfo, requester) => {

    /* See all the 'songInfo' options by logging it.. */

    channel.send({
        content: `Added the song [${songInfo.title}](${songInfo.url}) by \`${songInfo.author}\` to the queue.
        Added by ${requester.tag} (${requester.id})`
    });

});

audioevents.on('playList', async (channel, playlist, songInfo, requester) => {

    /* See all the 'songInfo' and 'playlist' options by logging it.. */

    channel.send({
        content: `Started playing the song [${songInfo.title}](${songInfo.url}) by \`${songInfo.author}\` of the playlist ${playlist.title}.
        This was requested by ${requester.tag} (${requester.id})`
    });

});

audioevents.on('addList', async (channel, playlist, requester) => {

    /* See all the 'playlist' options by logging it.. */

    channel.send({
        content: `Added the playlist [${playlist.title}](${playlist.url}) with ${playlist.videos.length} amount of videos to the queue.
        Added by ${requester.tag} (${requester.id})`
    });

});

audioevents.on('finish', async (channel) => {

    channel.send({
        content: 'Party has ended!'
    });

});