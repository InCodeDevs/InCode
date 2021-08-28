/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

export type Props = {
    title: string
    settings: Entry[]
}

export type Entry = {
    title: string,
    imageURL: string,
    callback: () => void
}

export type State = {}