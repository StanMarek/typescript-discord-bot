import { DiscordAPIError, Message } from "discord.js";
import { PingFinder } from "./ping-finder";
import { inject, injectable } from "inversify";
import { TYPES } from "./types";
import {MusicPlayer} from "./play"

@injectable()
export class MessageResponder {
    private pingFinder: PingFinder;
    private musicPlayer: MusicPlayer;

    constructor(
        @inject(TYPES.PingFinder) pingFinder: PingFinder,
        @inject(TYPES.MusicPlayer) musicPlayer: MusicPlayer
    ) {
        this.pingFinder = pingFinder;
        this.musicPlayer = musicPlayer;
    }

    handle(message: Message): Promise<Message | Message[]> {
        if (this.pingFinder.findPing(message.content)) {
            return message.reply('PONG!');
        }
        if (this.musicPlayer.playHref(message.content)) {
            let href: string;
            href = 'https://www.youtube.com/watch?v=_S7WEVLbQ-Y&ab_channel=FicLord'
            return message.channel.send(`!p ${href}`)
        }

        return Promise.reject();
    }
}