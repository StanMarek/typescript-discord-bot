"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//console.log("running")
require('dotenv').config();
const config_1 = __importDefault(require("./inversify/config"));
const types_1 = require("./types");
let bot = config_1.default.get(types_1.TYPES.Bot);
bot.listen().then(() => {
    console.log(`Logged In`);
}).catch((error) => {
    console.log(`Error: ${error}`);
});
//# sourceMappingURL=app.js.map