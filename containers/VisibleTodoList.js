import { connect } from 'react-redux'
import { withRouter }  from 'react-router'  // allow inject params directly to component not pass through App
import { toggleTodo } from '../actions'
import { getVisibleTodos } from '../reducers'
import TodoList from '../components/TodoList'



const mapStateToProps = (state, {params}) => {   // same as ownParams, then refer ownProps.params

  console.log("mapStateToProps state: " + JSON.stringify(state) + " params: " + JSON.stringify(params))
  return {
    todos: getVisibleTodos(
      state, // pass entire state and let selector filter on state to get state.todos only
      //state.visibilityFilter  // read from the store
      params.filter || 'all'
    ) 
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onTodoClick: (id) => {   // same as onTodoClick(id) { ... }
//       dispatch(toggleTodo(id))
//     }
//   }
// }


// Note 1: Use connect to transform the current Redux store state & action callback 
// into the props you want to pass to a presentational component
// Note 2: Wrap withRouter around connect so that params is passed to connect as prop
const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  //mapDispatchToProps
  { onTodoClick: toggleTodo } // shorthand for mapDispatchToProps(map presentation click to action) when the params are the same
)(TodoList))

export default VisibleTodoList