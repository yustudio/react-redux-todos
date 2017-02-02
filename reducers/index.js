import { combineReducers } from 'redux';
import byId, * as fromById from './byId';
import createList, * as fromList from './createList';
//import todo from './todo';

// // return copy of the map between id and todo items, with updated todo for action.id
// const byId = (state = {}, action) => {
//   switch (action.type) {
//     case 'RECEIVE_TODOS':
//       const nextState = {...state};  // shallow copy
//       action.response.forEach(todo => {
//         nextState[todo.id] = todo; // don't change original state
//       });
//       console.log("nextState is: " + JSON.stringify(nextState, null, 2));
//       return nextState;
//     // case 'ADD_TODO':
//     // case 'TOGGLE_TODO':
//     //   console.log("todos reducer's state: " + JSON.stringify(state))
//     //   return {  // now return new lookup table object rather than array
//     //     ...state,  // need to install babel-plugin-transform-object-rest-spread and in babelrc transform-object-rest-spread
//     //     [action.id]: todo(state[action.id], action)
//     //   };
    
//     default:
//       return state
//   }
// }

// const todos = (state = [], action) => {
//   switch (action.type) {
//     case 'ADD_TODO':
//       console.log("todos reducer's state: " + JSON.stringify(state))
//       return [
//         ...state,
//         todo(undefined, action)
//       ]
//     case 'TOGGLE_TODO':
//       return state.map(t =>
//         todo(t, action)
//       )
//     default:
//       return state
//   }
// }



// const allIds = (state = [], action) => {
//   if (action.filter !== 'all') {
//     return state;
//   }

//   switch (action.type) {
//     case 'RECEIVE_TODOS':
//       return action.response.map(todo => todo.id);
//     // case 'ADD_TODO':
//     //   return [...state, action.id];
//     default:
//       return state;
//   }
// }

// const activeIds = (state = [], action) => {
//   if (action.filter !== 'active') {
//     return state;
//   }
//   switch (action.type) {
//     case 'RECEIVE_TODOS':
//       return actions.response.map(todo => todo.id);
//     default:
//       return state;
//   }
// }

// const completedIds = (state = [], action) => {
//   if (action.filter !== 'completed') {
//     return state;
//   }
//   switch (action.type) {
//     case 'RECEIVE_TODOS':
//       return actions.response.map(todo => todo.id);
//     default:
//       return state;
//   }
// }

const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed')
})

// const idsByFilter = combineReducers({
//   all: allIds,
//   active: activeIds,
//   completed: completedIds
// })

const todos = combineReducers({
  byId,
  listByFilter
  //allIds
});

export default todos;

// internally used selector  
// const getAllTodos = (state) => {
//   // return all todos by id
//   return state.allIds.map(id => state.byId[id]);
// }

// Selector takes in reducers so that reducers is abstracted 
export const getVisibleTodos = (state, filter) => {
  const ids = fromList.getIds(state.listByFilter[filter]);
  return ids.map(id => fromById.getTodo(state.byId, id));
  // const allTodos = getAllTodos(state);
  // switch (filter) {
  //   case 'all':
  //     return allTodos
  //   case 'completed':
  //     return allTodos.filter(t => t.completed)
  //   case 'active':
  //     return allTodos.filter(t => !t.completed)
  //   default: 
  //     throw new Error('Unknown filter: ${filter}')
  // }
}

// Put here since reducer knows about state todo
// This is a Selector funct since it selects from current state
// export const getVisibleTodos = (state, filter) => {
//   switch (filter) {
//     case 'all':
//       return state
//     case 'completed':
//       return state.filter(t => t.completed)
//     case 'active':
//       return state.filter(t => !t.completed)
//     default: 
//       throw new Error('Unknown filter: ${filter}')
//   }
// }