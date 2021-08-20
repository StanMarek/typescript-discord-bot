import { injectable } from "inversify";
import ytdl = require("ytdl-core");
import { Message } from "discord.js";
import { prefix } from "../message-responder";
import { Song } from "./class/song";


@injectable()
export class MusicPlayer {
    private regexp: string[] = ['play', 'p', 'shrek', 'leave', 'dc'];
    private song: Song;

    public checkCommand(command: string): boolean {
        var cmd = command.slice(prefix.length).trim().split(/ +/);
        for (let i = 0; i < this.regexp.length; i++) {
            if(cmd[0] === this.regexp[i])
                return true;
        }
        return false;
    }

    public execute(message: Message) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        
        switch (args[0]){
            case 'play':
            case 'p':
                this.play(args[1], message);
                break;    
            case 'shrek':
                const shrekURL = 'https://www.youtube.com/watch?v=_S7WEVLbQ-Y&ab_channel=FicLord';
                this.play(shrekURL, message);
                break;
            case 'leave':
            case 'dc':
                this.stop(message);
                break;
        }
    }

    private async play(url: string, message: Message) {
            
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
             return message.reply("You must be in voice channel to play music!");
        }
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
            return message.channel.send("Bot needs to have permissions to speak in that channel");
        }

        const songInfo = await ytdl.getInfo(url);
        this.song = new Song(songInfo); 
        this.song.play(message);
    }

    private async stop(message: Message) {
        this.song.stop(message);
    }
}