import React, { Component } from 'react'
import { render } from 'react-dom'

class Item extends Component {
    render() {
        return (
                <div>{this.props.name}</div>
        )
    }
}

class App extends Component {
    constructor() {
        super()
        this.state = { val: "" }
    }
    changeHandle(evt) {
        this.setState({ val: evt.target.value })
    }
    render() {
        let users = [
            "pl1",
            "pl2",
            "pl0 0"
        ]

        return (
            <div>
                { users.map(n => <Item name={n} />) }
                <input type="text" onChange={this.changeHandle.bind(this)} />
                <div>{this.state.val}</div>

            </div>
        )
    }
}

render(
        <App />,
    document.body
)
