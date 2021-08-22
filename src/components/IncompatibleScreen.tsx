/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";

type ScreenProps = {
    title: string,
    message: string
}

type ScreenState = {};

export class IncompatibleScreen extends React.Component<ScreenProps, ScreenState> {

    render() {
        return (
            <div style={{top: "50%", left: "50%", position: 'absolute', transform: 'translate(-50%, -50%)'}}>
                <h1 style={{textAlign: 'center', color: 'red'}}>{this.props.title}</h1>
                <h2 style={{textAlign: 'center', color: 'white'}}>{this.props.message}</h2>
            </div>
        );
    }
}