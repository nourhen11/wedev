import React, { Component } from 'react'

export default class Button extends Component {
    render() {
        return (
            <button type={this.props.type} className={"btn btn-" + this.props.color }>{this.props.label}</button>
        )
    }
}
