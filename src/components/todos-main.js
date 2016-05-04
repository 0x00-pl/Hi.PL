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

class Counter extends Component {
    showingTodoCount(s){
        let todos = this.props.todos
        switch (s) {
            case showing.Active:
                return todos.reduce((sum, i) => i.completed? sum: sum+1, 0)
            case showing.Completed:
                return todos.reduce((sum, i) => i.completed? sum+1: sum, 0)
            default:
                return todos.length
        }
    }
    render(){
        return (
            <section className="row">
                <Info num={this.showingTodoCount(showing.All)}>个待办事项</Info>
                <Info num={this.showingTodoCount(showing.Completed)}>已完成</Info>
                <Info num={this.showingTodoCount(showing.Active)}>未完成</Info>
            </section>
        )
    }
}

class SetShowing extends Component {
    render(){
        let setShowing = this.props.setShowingHandle
        return (
            <div className="row">
                <button type="button" className="btn btn-info"
                onClick={()=>setShowing(showing.All)}>
                    All
                </button>
                <button type="button" className="btn btn-info"
                onClick={()=>setShowing(showing.Active)}>
                    Active
                </button>
                <button type="button" className="btn btn-info"
                onClick={()=>setShowing(showing.Completed)}>
                    Completed
                </button>
            </div>
        )
    }
}

export default class TodosMain extends Component {
    constructor(){
        super()
        this.state = {todos:[], showing:showing.All, selectedAll:false}
    }
    addTodo(todo_text){
        let new_idx = this.state.todos.length
        let item = {content:todo_text, completed:false, selected:false}
        let todos = this.state.todos.concat(item)
        this.setState({
            'todos': todos
        })
    }
    updateTodoIdx(idx, fupdate){
        let todos = this.state.todos
        let l = todos.slice(0, idx)
        let r = todos.slice(idx+1)
        let completed = todos[idx].completed
        let current = fupdate(todos[idx])
        return l.concat(current).concat(r)
    }
    completeTodo(idx){
        this.setState(
            this.updateTodoIdx(idx, (i) =>  Object.assign({}, i, {completed:!i.completed}))
        )
    }
    setSelect(idx, b){
        let todos = this.updateTodoIdx(idx, (i) => Object.assign({}, i, {selected:b}))
        let selectedAll = Array.every(todos, (i) => i.selected)
        this.setState({todos:todos, selectedAll:selectedAll})
    }
    setSelectAll(b){
        let todos = this.state.todos.map(
                (i) => Object.assign({}, i, {selected:b})
            )
        this.setState({todos: todos, selectedAll:b})
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
    completeSelected(){
        let todos = this.state.todos.map(function(i){
            if(i.selected){
                return Object.assign({}, i, {completed:true})
            }else{
                return i
            }
        })
        this.setState({todos: todos})
    }
    closeSelected(){
        let todos = this.state.todos.filter((i) => !i.selected)
        this.setState({todos: todos})
    }
    render(){
        return (
            <div className="container col-md-12">
                <div className="col-md-3 col-md-offset-5">
                
                    <SetShowing setShowingHandle={this.setShowing.bind(this)} />
                    
                    <ul className="list-group">
                        <TodosInput
                         commitHandle={this.addTodo.bind(this)} 
                         selectedAll={this.state.selectedAll}
                         onSelectChangeHandle={this.setSelectAll.bind(this)} 
                         />
                    
                        {this.showingTodo(this.state.showing).map((i, idx) =>
                            <TodosItem
                            content={i.content}
                            completed={i.completed}
                            completeHandle={()=>this.completeTodo(idx)}
                            closeHandle={()=>this.removeTodo(idx)}
                            selected={i.selected}
                            onSelectChangeHandle={(b)=>this.setSelect(idx, b)}
                            />
                        )}
                    </ul>
                    
                    
                    <button type="button" className="btn btn-info"
                    onClick={this.completeSelected.bind(this)}>
                        Complete Selected
                    </button>
                    <button type="button" className="btn btn-info"
                    onClick={this.closeSelected.bind(this)}>
                        Close Selected
                    </button>
                    
                    <Counter todos={this.state.todos}/>
                </div>
            </div>
        )
    }
}