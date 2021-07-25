import "reflect-metadata";
import { Container } from "inversify";
import {TYPES} from "../types";
import {Bot} from "../bot";
import {Client} from "discord.js";
import {MessageResponder} from "../command/message-responder"
import {PingFinder} from "../command/utility/ping-finder"
import {MusicPlayer} from "../command/fun/music-player"
import { InfoResponder } from "../command/utility/info-responder";

let container = new Container();

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());
container.bind<string>(TYPES.Token).toConstantValue(process.env.TOKEN!);
container.bind<MessageResponder>(TYPES.MessageResponder).to(MessageResponder).inSingletonScope();
container.bind<PingFinder>(TYPES.PingFinder).to(PingFinder).inSingletonScope();
container.bind<MusicPlayer>(TYPES.MusicPlayer).to(MusicPlayer).inSingletonScope();
container.bind<InfoResponder>(TYPES.InfoResponder).to(InfoResponder).inSingletonScope();

export default container;