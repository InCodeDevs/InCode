/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

export type Props = {
    title: string
    areas: Area[],
    entries: Entry[]
}

export type Area = {
    title: string
}

export type Entry = {
    title: string,
    area: string,
    imageURL: string,
    callback: () => void
}

export type State = {}