import { injectable } from "inversify";
import { prefix } from "../message-responder";


@injectable()
export class PingFinder {
    private regexp: string = `${prefix}ping`;

    public findPing(search: string): boolean {
        return search.search(this.regexp) >= 0;
    }
}