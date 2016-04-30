import React, { Component } from 'react'

export default class TodosItem extends Component {
    render() {
        return (
            <li className="list-group-item">
                <button type="button" className="btn btn-info" onClick={this.props.completeHandle}>
                  { (this.props.completed?" Redo":" Completed") }
                </button>
                {this.props.name + (this.props.completed?" (completed!)":"") }
                <button type="button" className="btn btn-info" onClick={this.props.clickHandle}>
                  Close
                </button>
            </li>
        )
    }
}
