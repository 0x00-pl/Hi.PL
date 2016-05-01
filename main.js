import React from 'react'
import { render } from 'react-dom'

import TodosMain from './src/components/todos-main'
import TodosHeader from './src/components/todos-header'
import TodosFooter from './src/components/todos-footer'



render(
    <div className='full-page'>
        <TodosHeader />
        <TodosMain />
        <TodosFooter />
    </div>,
    document.getElementById("main")
)
