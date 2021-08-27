/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

export class Avatar {

    protected static readonly INTERVAL: number = 500;

    protected static enabled: boolean = false;

    public static enable() {
        this.enabled = true;
    }

    public static disable() {
        this.enabled = false;
    }

    public static render() {
        setInterval(() => {
            if(this.enabled){
                let s = (document.getElementById('avatar-display') as HTMLImageElement).src;

                if (s.endsWith("_speaking.png")) {
                    (document.getElementById('avatar-display') as HTMLImageElement).src = 'assets/game/avatar.png';
                } else {
                    (document.getElementById('avatar-display') as HTMLImageElement).src = 'assets/game/avatar_speaking.png';
                }
            }
        }, this.INTERVAL)
    }
}