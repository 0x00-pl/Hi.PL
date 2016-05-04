import React, {Component} from 'react'
import {} from 'bootstrap/dist/css/bootstrap.css'
import {} from './app.css'

import TodosItem from './components/todos-item'
import TodosInput from './components/todos-input.js'
import TodosMain from './components/todos-main.js'

export default class App extends Component {
    constructor() {
        super()
        this.state = { value: '', task_list: [], showing:'All' }
    }
    changeHandle(evt) {
        this.setState({ value: evt.target.value })
    }
    addTodo(todo_text){
        let item = {'name': todo_text, 'completed': false}
        let task_list = this.state.task_list.concat(item)
        this.setState({
            'task_list': task_list
        })
    }
    keydownHandle(evt) {
        if(evt.keyCode === 13){
            this.addTodo(evt.target.value)
            this.setState({
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
                <TodosMain />
            </div>
        )
    }
}