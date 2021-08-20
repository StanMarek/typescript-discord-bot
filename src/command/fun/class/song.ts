import ytdl from "ytdl-core";
import {Message} from "discord.js"

export class Song {
    private title: string;
    private url: string;

    constructor(
        songInfo: ytdl.videoInfo
    ) {
        this.url = songInfo.videoDetails.video_url;
        this.title = songInfo.videoDetails.title;
    }

    public async play(message: Message) {
        const voiceChannel = message.member.voice.channel;
        try {
            var connection = await voiceChannel.join();
            const dispatcher = connection.play(ytdl(this.url))
                .on("error", (error: Error) => console.error(error))
                .on("close", (message: Message) => this.stop(message));
            dispatcher.setVolumeLogarithmic(1);
            return message.channel.send(`Playing * ${this.title} * in channel ${voiceChannel.name}!`);            
        } catch (e) {
            return message.channel.send(`${e}`);
        }
    }

    public async stop(message: Message) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
             return message.reply("You must be in voice channel to stop music!");
        }

       try {
           await voiceChannel.leave();
           return message.channel.send(`Bot has left the channel: ${voiceChannel.name}!`);
       } catch (e) {
           return message.channel.send(`${e}`);
       }     
    } 
}