import { injectable } from "inversify";

@injectable()
export class MusicPlayer {
    private regexp = '!shrek';

    public playHref(href: string): boolean {
        return href.search(this.regexp) >= 0;
    }
}