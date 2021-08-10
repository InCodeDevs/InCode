/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";

export class IncompatibleScreenSize extends React.Component {

    render() {
        return (
            <div style={{top: "50%", left: "50%", position: 'absolute', transform: 'translate(-50%, -50%)'}}>
                <h1 style={{textAlign: 'center', color: 'red'}}>INKOMPATIBLE BILDSCHIRMGRÖSSE ERKANNT</h1>
                <h2 style={{textAlign: 'center', color: 'white'}}>Bitte nutze einen größen Bildschirm</h2>
            </div>
        );
    }
}
