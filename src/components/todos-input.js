import React, {Component} from 'react'
import {} from 'bootstrap/dist/css/bootstrap.css'

export default class TodosInput extends Component{
    constructor(){
        super()
        this.state = {value:'', recent_task:[]}
    }
    getRecentMatchs(prefix){
        if(prefix.length < 3 ){
            return []
        }
        let matched = this.state.recent_task.filter((i) => i.startsWith(prefix))
        return matched
    }
    getRecentMatch(prefix){
        let matched = getRecentMatchs(prefix)
        let len = matched.length
        if(len == 0){
            return undefined
        }else{
            return matched.slice(len-1, len)
        }
    }
    changeHandle(evt) {
        this.setState({ value: evt.target.value })
    }
    commit(){
        let recent_task = this.state.recent_task.concat(this.state.value)
        this.props.commitHandle(this.state.value)
        this.setState({value:"", recent_task:recent_task})
    }
    keydownHandle(evt) {
        if(evt.keyCode === 13){
            this.commit()
        }else if(evt.keyCode == 9){
            this.setState({value: this.getRecentMatch(this.state.value) || this.state.value})
        }
    }
    onSelectChange(evt){
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
                    
                    <div>recent: {(this.getRecentMatchs(this.state.value)).join(', ')}</div>
                </div>
        )
    }
}
