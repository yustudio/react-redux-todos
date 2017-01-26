import { combineReducers } from 'redux'
import todos from './todos'
//import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
  todos,
//  visibilityFilter
})

export default todoApp

// ways to write combineReducers with custom function name
//http://redux.js.org/docs/basics/Reducers.html
// export default function todoApp(state = {}, action) {
//   return {     
//     todos: todos(state.todos, action),
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//   }
// }