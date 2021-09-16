/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

export class Options {
  public static currentLiveJS = "";
  public static currentEditor = "";

  public static theme = "dark";

  // @ts-ignore
  public static readonly version = _VERSION;

  public static readonly formattedVersion =
    // @ts-ignore
    "InCode Editor v" + Options.version + " at " + _GIT_SHORT_COMMIT;

  // @ts-ignore
  public static readonly formattedDOMVersion = `InCode Editor <a target="_blank" href='${_GIT_REPO}/tree/${_GIT_BRANCH}'>v${Options.version}</a> at <a target="_blank" href='${_GIT_REPO}/commit/${_GIT_LONG_COMMIT}'>${_GIT_SHORT_COMMIT}</a>`;
}
