import React from 'react'
import Footer from './Footer'
import AddTodo from './containers/AddTodo'
import VisibleTodoList from './containers/VisibleTodoList'

import './TodoView.less'

const TodoApp = () => {
    return <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>
}

export default TodoApp
