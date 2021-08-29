/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from 'react';
import { AreaProps, AreaState } from '../../../types/Area';

export class Area extends React.Component<AreaProps, AreaState> {

    render() {
        return (
            <div style={{flex: "50%", color: "white"}} id={this.props.id}>
                    <h2>{this.props.title}</h2>
            </div>
        )
    }
}