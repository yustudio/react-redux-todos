import { v4 } from 'node-uuid';

export const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response  
})

export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: v4(),  // unique id so not to conflict with id in saved state's id in localStorage
    text
  }
}

// export const setVisibilityFilter = (filter) => {
//   return {
//     type: 'SET_VISIBILITY_FILTER',
//     filter
//   }
// }

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}