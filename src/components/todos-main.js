import React, {Component} from 'react'
import {} from 'bootstrap/dist/css/bootstrap.css'

import TodosInput from './todos-input'
import TodosItem from './todos-item'

let showing = {
    All: 'All',
    Active: 'Active',
    Completed: 'Completed'
}

class Info extends Component {
    render() {
        return (
            <div className="label label-default">
            <span>{this.props.num}</span>
            {this.props.children}
            </div>
        )
    }
}

export default class TodosMain extends Component {
    constructor(){
        super()
        this.state = {todos:[], showing:showing.All}
    }
    addTodo(todo_text){
        let new_idx = this.state.todos.length
        let item = {content:todo_text, completed:false}
        let todos = this.state.todos.concat(item)
        this.setState({
            'todos': todos
        })
    }
    completeTodo(idx){
        let todos = this.state.todos
        let l = todos.slice(0, idx)
        let r = todos.slice(idx+1)
        let completed = todos[idx].completed
        let current = Object.assign({}, todos[idx], {completed:!completed})
        this.setState({todos: l.concat(current).concat(r)})
    }
    removeTodo(idx){
        let todos = this.state.todos
        let l = todos.slice(0, idx)
        let r = todos.slice(idx+1)
        this.setState({todos: l.concat(r)})
    }
    setShowing(s){
        this.setState({showing:s})
    }
    showingTodo(s){
        let todos = this.state.todos
        switch (s) {
            case showing.Active:
                return todos.filter((i) => !i.completed)
            case showing.Completed:
                return todos.filter((i) => i.completed)
            default:
                return todos
        }
    }
    render(){
        return (
            <div className="container col-md-12">
                <div className="col-md-3 col-md-offset-5">
                    <button type="button" className="btn btn-info"
                    value="All"
                    onClick={()=>this.setShowing(showing.All)}>
                        All
                    </button>
                    <button type="button" className="btn btn-info"
                    value="Active"
                    onClick={()=>this.setShowing(showing.Active)}>
                        Active
                    </button>
                    <button type="button" className="btn btn-info"
                    onClick={()=>this.setShowing(showing.Completed)}>
                        Completed
                    </button>
                    
                    <ul className="list-group">
                    
                        <TodosInput commitHandle={this.addTodo.bind(this)} />
                    
                        {this.showingTodo(this.state.showing).map((i, idx) =>
                            <TodosItem
                            content={i.content}
                            completed={i.completed}
                            completeHandle={()=>this.completeTodo(idx)}
                            closeHandle={()=>this.removeTodo(idx)}
                            />
                        )}
                    </ul>
                    
                    
                    <section className="row">
                        <Info num={this.showingTodo(showing.All).length}>个待办事项</Info>
                        <Info num={this.showingTodo(showing.Completed).length}>已完成</Info>
                        <Info num={this.showingTodo(showing.Active).length}>未完成</Info>
                    </section>
                </div>
            </div>
        )
    }
}