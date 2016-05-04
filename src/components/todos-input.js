import React, {Component} from 'react'
import {} from 'bootstrap/dist/css/bootstrap.css'

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
    onSelectChange(evt){
        console.log(evt.target)
        console.log(evt.target.checked)
        this.props.onSelectChangeHandle(evt.target.checked)
    }
    render(){
        return(
                <div className="input-group">
                    <input type="checkbox"
                     checked={this.props.selectedAll}
                     onChange={this.onSelectChange.bind(this)} 
                    />
                    <input type="text" clasName="form-control"
                     onChange={this.changeHandle.bind(this)}
                     onKeyDown={this.keydownHandle.bind(this)}
                     value={this.state.value}
                    />
                    <span class="input-group-btn">
                        <button type="button" className="btn btn-secondary"
                         onClick={this.commit.bind(this)}>
                            +
                        </button>
                    </span>
                    
                    <div>{this.state.value}</div>
                </div>
        )
    }
}
