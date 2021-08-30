/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

export class Avatar {
  protected static readonly INTERVAL: number = 650;

  protected static enabled = false;

  public static enable() {
    this.enabled = true;
  }

  public static disable() {
    this.enabled = false;
  }

  public static render() {
    setInterval(() => {
      if (this.enabled) {
        const s = (
          document.getElementById("avatar-display") as HTMLImageElement
        ).src;

        if (s.endsWith("_speaking_0.png")) {
          (document.getElementById("avatar-display") as HTMLImageElement).src =
            "assets/game/new_avatar_1.png";
        } else {
          (document.getElementById("avatar-display") as HTMLImageElement).src =
            "assets/game/new_avatar_speaking_0.png";
        }
      }
    }, this.INTERVAL);
  }

  public static speak(text: string) {
    const msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.volume = 1;
    msg.lang = "de-DE";
    console.log(speechSynthesis.getVoices());
    msg.voice = speechSynthesis.getVoices()[0];
    msg.rate = 1;
    msg.pitch = 1;
    speechSynthesis.speak(msg);
    msg.onend = function () {
      return true;
    };
  }
}
