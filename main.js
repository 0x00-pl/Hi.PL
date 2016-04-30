import React, { Component } from 'react'
import { render } from 'react-dom'
import {} from 'bootstrap/dist/css/bootstrap.css'

import TodosItem from './src/todos-item'


class App extends Component {
    constructor() {
        super()
        this.state = { value: '', task_all: [], showing:'All', task_show:[] }
    }
    changeHandle(evt) {
        this.setState({ value: evt.target.value })
    }
    keydownHandle(evt) {
        if(evt.keyCode === 13){
            let item = {'name': evt.target.value, 'completed': false}
            this.state.value = ''
            let task_all = this.state.task_all.concat(item)
            this.setState({
                'task_all': task_all,
                value: '',
                task_show: this.getShowingTaskList(task_all, this.state.showing)
            })
        }
    }
    deleteItem(idx) {
        let datas = this.state.task_all
        let left = datas.slice(0, idx)
        let right = datas.slice(idx + 1)
        let task_all = [].concat(left).concat(right)
        this.setState({
            'task_all': task_all,
            task_show: this.getShowingTaskList(task_all, this.state.showing)
        })
    }
    changeCompleteState(idx) {
        let task = this.state.task_all[idx]
        let task_all = this.state.task_all
        task_all[idx].completed = !task_all[idx].completed
        this.setState({
            'task_all': task_all,
            task_show: this.getShowingTaskList(task_all, this.state.showing)
        })
    }
    getShowingTaskList(task_all, showing){
        if(showing === 'Active'){
            return task_all.filter((i)=>!i.completed)
        }else if(showing === 'Completed'){
            return task_all.filter((i)=>i.completed)
        }else{
            return task_all.slice(0)
        }
    }
    setShowing(showing){
        this.setState({
            'showing': showing,
            task_show: this.getShowingTaskList(this.state.task_all, showing)
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
                {this.state.task_show.map(
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
