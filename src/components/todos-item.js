import React, { Component } from 'react'
import {} from 'bootstrap/dist/css/bootstrap.css'

export default class TodosItem extends Component {
    onSelectChange(evt){
        this.props.onSelectChangeHandle(
            evt.target.checked
        )
    }
    render() {
        return (
            <li className="list-group-item">
                <span  className="">
                <input type="checkbox"
                 checked={this.props.selected}
                 onChange={this.onSelectChange.bind(this)} 
                />
                </span>
                
                <span className=""
                 onClick={this.props.completeHandle}
                >
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
