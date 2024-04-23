import { Client, GatewayIntentBits } from 'discord.js';
import { joinVoiceChannel, createAudioPlayer, createAudioResource, entersState, getVoiceConnection, AudioPlayerStatus, VoiceConnectionStatus } from '@discordjs/voice';

let connection = null;
const player = createAudioPlayer();

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates]
});

async function connectTo(channel) {
    connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });

    try {
        await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
        return connection;
    } catch (error) {
        console.error(error);
    }
}

function playSound(name) {
    try {
        if (player.state.status === 'playing')
            player.stop(true);

        const resource = createAudioResource(`assets/${name}.mp3`);
        resource.volume?.setVolume(0.1);
        player.play(resource);
        connection.subscribe(player);
    } catch (error) {
        console.error(error);
    }
}

client.on('messageCreate', async message => {
    if (message.member.voice.channel) {
        const channel = message.member.voice.channel;

        connection = await connectTo(channel);
    }
});

client.once('ready', async () => {
    console.log('Ready!');

    client.channels.fetch('1179035781461966929').then(async channel => {
        connection = await connectTo(channel);
        
        console.log('Connected!');
    });
});

client.login(process.env.DISCORD_TOKEN_BOT);

export { playSound };