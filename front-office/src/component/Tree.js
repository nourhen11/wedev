import React, { Component } from 'react'

export default class Tree extends Component {
    render() {
        let label = this.props.label

        return (
            <div>
                <ol className="breadcrumb bg-white">
                    <li className="breadcrumb-item"><a href="../dashboard"><i className="fas fa-home"></i></a></li>
                    <li className="breadcrumb-item active" aria-current="page">{label}</li>
                </ol>
            </div>
        )
    }
}
