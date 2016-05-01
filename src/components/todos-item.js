import React, { Component } from 'react'
import {} from 'bootstrap/dist/css/bootstrap.css'

export default class TodosItem extends Component {
    render() {
        return (
            <li className="list-group-item">
                <span  className="">
                <input type="checkbox"
                 onClick={this.props.completeHandle}/>
                </span>
                
                <span className="">
                    {this.props.content}
                    {(this.props.completed?(<span class="sr-only">(completed)</span>):"") }
                </span>
                
                <button type="button" className="btn btn-info pull-right"
                onClick={this.props.closeHandle}>
                    Close
                </button>
            </li>
        )
    }
}
