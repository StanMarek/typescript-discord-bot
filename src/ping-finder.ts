import { injectable } from "inversify";

@injectable()
export class PingFinder {
    private regexp = 'ping';

    public findPing(search: string): boolean {
        return search.search(this.regexp) >= 0;
    }
}