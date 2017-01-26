import { connect } from 'react-redux'
import { withRouter }  from 'react-router'  // allow inject params directly to component not pass through App
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

const mapStateToProps = (state, {params}) => {   // same as ownParams, then refer ownProps.params
  return {
    todos: getVisibleTodos(
      state.todos, 
      //state.visibilityFilter  // read from the store
      params.filter || 'all'
    )
}}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}

// Note 1: Use connect to transform the current Redux store state & action callback 
// into the props you want to pass to a presentational component
// Note 2: Wrap withRouter around connect so that params is passed to connect as prop
const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList))

export default VisibleTodoList