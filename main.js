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
    render() {
        let users = [
            "pl1",
            "pl2",
            "pl0 0"
        ]

        return (
            <div>
                { users.map(n => <Item name={n} />) }
            </div>
        )
    }
}

render(
        <App />,
    document.body
)
