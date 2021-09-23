/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

export type Props = {
    project: Project
};

export type Project = {
    name: string,
    shared: boolean,
    owner: string
}

export type State = {};
