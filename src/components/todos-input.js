import React, {Component} from 'react'

export default class TodosInput extends Component{
    constructor(){
        super()
        this.state = {value:''}
    }
    changeHandle(evt) {
        this.setState({ value: evt.target.value })
    }
    commit(){
        this.props.commitHandle(this.state.value)
        this.setState({value:""})
    }
    keydownHandle(evt) {
        if(evt.keyCode === 13){
            this.commit()
        }
    }
    render(){
        return(
            <div className="container">
            <input type="text" clasName="form-control"
            onChange={this.changeHandle.bind(this)}
            onKeyDown={this.keydownHandle.bind(this)}
            value={this.state.value}
            />
            <button type="button" className="btn btn-info"
                onClick={this.commit.bind(this)}>
                +
            </button>
            
            <div>{this.state.value}</div>
            </div>
        )
    }
}
