import { combineReducers } from 'redux';

// return copy of the map between id and todo items, with updated todo for action.id
const byId = (state = {}, action) => {
  if (action.response) {
    return {
      ...state,
      ...action.response.entities.todos
    }
  }

  return state;
  // switch (action.type) {
  //   case 'FETCH_TODO_SUCCESS':
  //     const nextState = {...state};  // shallow copy
  //     action.response.forEach(todo => {
  //       nextState[todo.id] = todo; // don't change original state
  //     });
  //     console.log("nextState is: " + JSON.stringify(nextState, null, 2));
  //     return nextState;
  //   // case 'ADD_TODO':
  //   // case 'TOGGLE_TODO':
  //   //   console.log("todos reducer's state: " + JSON.stringify(state))
  //   //   return {  // now return new lookup table object rather than array
  //   //     ...state,  // need to install babel-plugin-transform-object-rest-spread and in babelrc transform-object-rest-spread
  //   //     [action.id]: todo(state[action.id], action)
  //   //   };
  //   case 'ADD_TODO_SUCCESS':
  //     return {
  //       ...state,
  //       [action.response.id]: action.response  
  //     };

  //   default:
  //     return state
  // }
}

export default byId;

export const getTodo = (state, id) => state[id];