"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageResponder = exports.prefix = void 0;
const ping_finder_1 = require("./utility/ping-finder");
const inversify_1 = require("inversify");
const types_1 = require("../types");
const music_player_1 = require("./fun/music-player");
const dotenv = __importStar(require("dotenv"));
const info_responder_1 = require("./utility/info-responder");
dotenv.config();
exports.prefix = process.env.PREFIX;
let MessageResponder = class MessageResponder {
    constructor(pingFinder, musicPlayer, infoResponder) {
        this.pingFinder = pingFinder;
        this.musicPlayer = musicPlayer;
        this.infoResponder = infoResponder;
    }
    handle(message) {
        if (!message.content.startsWith(exports.prefix) || message.author.bot)
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
};
MessageResponder = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.PingFinder)),
    __param(1, inversify_1.inject(types_1.TYPES.MusicPlayer)),
    __param(2, inversify_1.inject(types_1.TYPES.InfoResponder)),
    __metadata("design:paramtypes", [ping_finder_1.PingFinder,
        music_player_1.MusicPlayer,
        info_responder_1.InfoResponder])
], MessageResponder);
exports.MessageResponder = MessageResponder;
//# sourceMappingURL=message-responder.js.map