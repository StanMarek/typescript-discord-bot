"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
const types_1 = require("../types");
const bot_1 = require("../bot");
const discord_js_1 = require("discord.js");
const message_responder_1 = require("../message-responder");
const ping_finder_1 = require("../ping-finder");
const play_1 = require("../play");
let container = new inversify_1.Container();
container.bind(types_1.TYPES.Bot).to(bot_1.Bot).inSingletonScope();
container.bind(types_1.TYPES.Client).toConstantValue(new discord_js_1.Client());
container.bind(types_1.TYPES.Token).toConstantValue(process.env.TOKEN);
container.bind(types_1.TYPES.MessageResponder).to(message_responder_1.MessageResponder).inSingletonScope();
container.bind(types_1.TYPES.PingFinder).to(ping_finder_1.PingFinder).inSingletonScope();
container.bind(types_1.TYPES.MusicPlayer).to(play_1.MusicPlayer).inSingletonScope();
exports.default = container;
//# sourceMappingURL=config.js.map