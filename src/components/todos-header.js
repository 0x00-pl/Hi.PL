import React, {Component} from 'react'
import {} from 'bootstrap/dist/css/bootstrap.css'

export default class TodosHeader extends Component {
    render(){
        return (
            <div className='header col-md-12'>
                <h1 className="col-md-2 col-md-offset-5">TODOS</h1>
            </div>
        )
    }
}