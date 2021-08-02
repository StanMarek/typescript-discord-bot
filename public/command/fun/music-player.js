"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicPlayer = void 0;
const inversify_1 = require("inversify");
const ytdl = require("ytdl-core");
const message_responder_1 = require("../message-responder");
let MusicPlayer = class MusicPlayer {
    constructor() {
        this.regexp = ['play', 'p', 'shrek', 'stop'];
    }
    checkCommand(command) {
        var cmd = command.slice(message_responder_1.prefix.length).trim().split(/ +/);
        for (let i = 0; i < this.regexp.length; i++) {
            if (cmd[0] === this.regexp[i])
                return true;
        }
        return false;
    }
    execute(message) {
        const args = message.content.slice(message_responder_1.prefix.length).trim().split(/ +/);
        switch (args[0]) {
            case 'play':
                this.play(args[1], message);
                break;
            case 'p':
                this.play(args[1], message);
                break;
            case 'shrek':
                const shrekURL = 'https://www.youtube.com/watch?v=_S7WEVLbQ-Y&ab_channel=FicLord';
                this.play(shrekURL, message);
                break;
            case 'stop':
                this.stop(message);
                break;
        }
    }
    play(url, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                return message.reply("You must be in voice channel to play music!");
            }
            const permissions = voiceChannel.permissionsFor(message.client.user);
            if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
                return message.channel.send("Bot needs to have permissions to speak in that channel");
            }
            const songInfo = yield ytdl.getInfo(url);
            try {
                var connection = yield voiceChannel.join();
                const dispatcher = connection.play(ytdl(url))
                    .on("error", (error) => console.error(error))
                    .on("close", (message) => this.stop(message));
                dispatcher.setVolumeLogarithmic(1);
                return message.channel.send(`Playing * ${songInfo.videoDetails.title} * in channel ${voiceChannel.name}!`);
            }
            catch (e) {
                return message.channel.send(`${e}`);
            }
        });
    }
    stop(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                return message.reply("You must be in voice channel to stop music!");
            }
            try {
                yield voiceChannel.leave();
                return message.channel.send(`Bot has left the channel: ${voiceChannel.name}!`);
            }
            catch (e) {
                return message.channel.send(`${e}`);
            }
        });
    }
};
MusicPlayer = __decorate([
    inversify_1.injectable()
], MusicPlayer);
exports.MusicPlayer = MusicPlayer;
//# sourceMappingURL=music-player.js.map