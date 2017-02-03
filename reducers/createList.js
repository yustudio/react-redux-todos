import { combineReducers } from 'redux';

const createList = (filter) => {
  const ids = (state = [], action) => {
    //  if (action.filter !== filter) {
    //   return state;
    // }

    switch (action.type) {
      case 'FETCH_TODO_REQUEST':
        return filter === action.filter ? 
                action.response.result :
                //action.response.map(todo => todo.id):
                state;
      // case 'ADD_TODO':
      //   return [...state, action.id];
      case 'ADD_TODO_SUCCESS':
        return filter !== 'completed' ? 
                [...state, action.response.result] : 
                //[...state, action.response.id] :   // action for add todo don't have filter property so beginnig chk would fail
                state;
      default:
        return state;
    }
  }

  const isFetching = (state = false, action) => {
    if (action.filter !== filter) {
      return state;
    }

    switch (action.type) {
      case 'FETCH_TODO_REQUEST':
        return true;
      case 'FETCH_TODO_SUCCESS':
      case 'FETCH_TODO_FALSE':  // so fetching is set to false on failure
        return false;
      default:
        return state;
    }
  }

  const errorMessage = (state = null, action) => {
    if (filter !== action.filter) {
      return state;
    }
    switch (action.type) {
      case 'FETCH_TODOS_FAILURE':
        return action.message;
      case 'FETCH_TODOS_REQUEST':
      case 'FETCH_TODOS_SUCCESS':
        return null;
      default:
        return state;
    }
  }

  return combineReducers({
    ids,
    isFetching,
    errorMessage
  })
}

export default createList;

// Selector   
export const getIds = (state) => state.ids;  
export const getIsFetching = (state) => state.isFetching;
export const getErrorMessage = (state) => state.errorMessage;