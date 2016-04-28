import React, { Component } from 'react'
import { render } from 'react-dom'
import {} from 'bootstrap/dist/css/bootstrap.css'

class Item extends Component {
    render() {
        return (
            <li className="list-group-item">
                <button type="button" className="btn btn-info" onClick={this.props.clickHandle}>
                  Close
                </button>
                {this.props.name}
            </li>
        )
    }
}

class App extends Component {
    constructor() {
        super()
        this.state = { val: "", datas: [] }
    }
    changeHandle(evt) {
        this.setState({ val: evt.target.value })
    }
    keydownHandle(evt) {
        if(evt.keyCode === 13)
            this.setState({
                datas: this.state.datas.concat(evt.target.value),
                val: ""
            })
    }
    deleteItem(idx) {
        let datas = this.state.datas
        let left = datas.slice(0, idx)
        let right = datas.slice(idx + 1)
        this.setState({
            datas: [].concat(left).concat(right)
        })
    }
    render() {
        return (
            <div className="container">
                <input type="text" onChange={this.changeHandle.bind(this)} onKeyDown={this.keydownHandle.bind(this)} value={this.state.val} className="form-control" />
                <div>{this.state.val}</div>
                <ul className="list-group">
                {this.state.datas.map(
                    (n, idx) => <Item name={n} clickHandle={() => this.deleteItem.bind(this)(idx)} />
                )}
                </ul>
            </div>
        )
    }
}

render(
        <App />,
    document.body
)
