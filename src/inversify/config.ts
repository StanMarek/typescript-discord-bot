import "reflect-metadata";
import { Container } from "inversify";
import {TYPES} from "../types";
import {Bot} from "../bot";
import {Client} from "discord.js";
import {MessageResponder} from "../message-responder"
import {PingFinder} from "../ping-finder"
import {MusicPlayer} from "../play"

let container = new Container();

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());
container.bind<string>(TYPES.Token).toConstantValue(process.env.TOKEN!);
container.bind<MessageResponder>(TYPES.MessageResponder).to(MessageResponder).inSingletonScope();
container.bind<PingFinder>(TYPES.PingFinder).to(PingFinder).inSingletonScope();
container.bind<MusicPlayer>(TYPES.MusicPlayer).to(MusicPlayer).inSingletonScope();

export default container;