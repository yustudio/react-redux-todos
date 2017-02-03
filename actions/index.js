import { v4 } from 'node-uuid';
import * as api from '../api'; // namespace import


const requestTodos = (filter) => ({
  type: 'REQUEST_TODOS',
  filter
})

const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response  
})

// can call dispatch many times to receive data async
export const fetchTodos = (filter) => (dispatch) => {
  dispatch(requestTodos(filter));

  return api.fetchTodos(filter).then(response => {  // fetchTodos returns promise that contains the action obj
      dispatch(receiveTodos(filter,response));  // receiveTodos returns action obj synchronously
    });
}

// return promise
// export const fetchTodos = (filter) => 
//   api.fetchTodos(filter).then(response =>  // fetchTodos returns promise that contains the action obj
//       receiveTodos(filter,response)  // receiveTodos returns action obj synchronously
//     );

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