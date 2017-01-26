import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'all':
      return todos
    case 'completed':
      return todos.filter(t => t.completed)
    case 'active':
      return todos.filter(t => !t.completed)
    default: 
      throw new Error('Unknown filter: ${filter}')
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    todos: getVisibleTodos(
      state.todos, 
      //state.visibilityFilter  // read from the store
      ownProps.filter      
    )
}}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}

// Use connect to transform the current Redux store state & action callback 
// into the props you want to pass to a presentational component
const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList