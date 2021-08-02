import { DiscordAPIError, Guild, Message, VoiceConnection } from "discord.js";
import { PingFinder } from "./utility/ping-finder";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import {MusicPlayer} from "./fun/music-player";
import * as dotenv from "dotenv";
import {InfoResponder} from "./utility/info-responder"

dotenv.config();
export const prefix = process.env.PREFIX!;

@injectable()
export class MessageResponder {
    private pingFinder: PingFinder;
    private musicPlayer: MusicPlayer;
    private infoResponder: InfoResponder;

    constructor(
        @inject(TYPES.PingFinder) pingFinder: PingFinder,
        @inject(TYPES.MusicPlayer) musicPlayer: MusicPlayer,
        @inject(TYPES.InfoResponder) infoResponder: InfoResponder
    ) {
        this.pingFinder = pingFinder;
        this.musicPlayer = musicPlayer;
        this.infoResponder = infoResponder;
    }

    handle(message: Message): Promise<Message | Message[]> {
        if (!message.content.startsWith(prefix) || message.author.bot) 
            return Promise.reject();

        if (this.pingFinder.findPing(message.content))
            return message.reply('PONG!');

        if (this.musicPlayer.checkCommand(message.content)) {
            this.musicPlayer.execute(message);
        }

        if (this.infoResponder.checkCommand(message.content)) {
            this.infoResponder.execute(message);
        }
      
        return Promise.reject();
    }

}