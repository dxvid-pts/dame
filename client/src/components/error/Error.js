import "./Error.css";

import React from "react";

export default class Error extends React.Component {
    constructor(props) {
        super(props);
        this.state = { msg: props.msg, render: true};
    }

    render() {
        if (!this.state.render) {
            return null;
        } else {
            return (
                <div className="ErrorView">
                    <div className="ErrorBox">
                        <div className="ErrorText">{this.state.msg}</div>
                        <button
                            className="ErrorCloseButton"
                            onClick={() => this.setState({ render: false })}
                        >&#x2715;</button>
                    </div>
                </div>
            );
        }
    }
}
