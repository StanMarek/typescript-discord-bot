"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageResponder = void 0;
const ping_finder_1 = require("./ping-finder");
const inversify_1 = require("inversify");
const types_1 = require("./types");
const music_player_1 = require("./music-player");
const prefix = '>';
let MessageResponder = class MessageResponder {
    constructor(pingFinder, musicPlayer) {
        this.pingFinder = pingFinder;
        this.musicPlayer = musicPlayer;
    }
    handle(message) {
        if (!message.content.startsWith(prefix) || message.author.bot)
            return Promise.reject();
        if (this.pingFinder.findPing(message.content))
            return message.reply('PONG!');
        if (this.musicPlayer.checkCommand(message.content)) {
            this.musicPlayer.execute(message);
        }
        return Promise.reject();
    }
};
MessageResponder = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.PingFinder)),
    __param(1, inversify_1.inject(types_1.TYPES.MusicPlayer)),
    __metadata("design:paramtypes", [typeof (_a = typeof ping_finder_1.PingFinder !== "undefined" && ping_finder_1.PingFinder) === "function" ? _a : Object, typeof (_b = typeof music_player_1.MusicPlayer !== "undefined" && music_player_1.MusicPlayer) === "function" ? _b : Object])
], MessageResponder);
exports.MessageResponder = MessageResponder;
//# sourceMappingURL=message-responder.js.map