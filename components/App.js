import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = ({params}) => (   // same as {params} = props ES6 destructuring assignment 
  <div>
    <AddTodo />
    <VisibleTodoList 
    	filter={params.filter || 'all'}
    />
    <Footer />
  </div>
)

export default App