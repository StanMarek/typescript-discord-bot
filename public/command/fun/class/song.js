"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Song = void 0;
const ytdl_core_1 = __importDefault(require("ytdl-core"));
class Song {
    constructor(songInfo) {
        this.url = songInfo.videoDetails.video_url;
        this.title = songInfo.videoDetails.title;
    }
    play(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const voiceChannel = message.member.voice.channel;
            try {
                var connection = yield voiceChannel.join();
                const dispatcher = connection.play(ytdl_core_1.default(this.url))
                    .on("error", (error) => console.error(error))
                    .on("close", (message) => this.stop(message));
                dispatcher.setVolumeLogarithmic(1);
                return message.channel.send(`Playing * ${this.title} * in channel ${voiceChannel.name}!`);
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
}
exports.Song = Song;
//# sourceMappingURL=song.js.map