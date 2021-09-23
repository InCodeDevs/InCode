/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";
import {Props, State} from "../../types/ShareProject";

export class ShareProject extends React.Component<Props, State> {

    render() {
        return (
            <>
                {
                    this.props.project.shared ? <h1>Test</h1> : <div></div>
                }
            </>
        );
    }
}