const createList = (filter) => {
  return (state = [], action) => {
     if (action.filter !== filter) {
      return state;
    }

    switch (action.type) {
      case 'RECEIVE_TODOS':
        return action.response.map(todo => todo.id);
      // case 'ADD_TODO':
      //   return [...state, action.id];
      default:
        return state;
    }
  }
}

export default createList;

// Selector   
export const getIds = (state) => state; //ids are the current state