import React, { Component } from 'react'
import { render } from 'react-dom'
import {} from 'bootstrap/dist/css/bootstrap.css'

import TodosItem from './src/todos-item'


class App extends Component {
    constructor() {
        super()
        this.state = { value: '', task_list: [], showing:'All' }
    }
    changeHandle(evt) {
        this.setState({ value: evt.target.value })
    }
    keydownHandle(evt) {
        if(evt.keyCode === 13){
            let item = {'name': evt.target.value, 'completed': false}
            this.state.value = ''
            let task_list = this.state.task_list.concat(item)
            this.setState({
                'task_list': task_list,
                value: ''
            })
        }
    }
    deleteItem(idx) {
        let datas = this.state.task_list
        let left = datas.slice(0, idx)
        let right = datas.slice(idx + 1)
        let task_list = [].concat(left).concat(right)
        this.setState({
            'task_list': task_list
        })
    }
    changeCompleteState(idx) {
        let task = this.state.task_list[idx]
        let task_list = this.state.task_list
        task_list[idx].completed = !task_list[idx].completed
        this.setState({
            'task_list': task_list
        })
    }
    getShowingTaskList(){
        let task_list = this.state.task_list
        let showing = this.state.showing
        if(showing === 'Active'){
            return task_list.filter((i)=>!i.completed)
        }else if(showing === 'Completed'){
            return task_list.filter((i)=>i.completed)
        }else{
            return task_list.slice(0)
        }
    }
    setShowing(showing){
        this.setState({
            'showing': showing
        })
    }
    render() {
        return (
            <div className="container">
                <input type="text"
                 onChange={this.changeHandle.bind(this)}
                 onKeyDown={this.keydownHandle.bind(this)}
                 value={this.state.value}
                 className="form-control"
                />
                <div>{this.state.value}</div>
                <ul className="list-group">
                {this.getShowingTaskList().map(
                    (i, idx) =>
                     <TodosItem name={i.name}
                      completeHandle={() => this.changeCompleteState(idx) }
                      clickHandle={() => this.deleteItem(idx)}
                      completed={i.completed}
                     />
                )}
                </ul>
                <button type="button" className="btn btn-info"
                 value="All"
                 onClick={()=>this.setShowing("All")}>
                    All
                </button>
                <button type="button" className="btn btn-info"
                 value="Active"
                 onClick={()=>this.setShowing("Active")}>
                    Active
                </button>
                <button type="button" className="btn btn-info"
                 onClick={()=>this.setShowing("Completed")}>
                    Completed
                </button>
            </div>
        )
    }
}

render(
        <App />,
    document.getElementById('main')
)
