import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './reducers/index';
import App from './components/App';  // Presnetation components
import { loadState, saveState } from './localStorage';

const persistedState = loadState();

let store = createStore(todoApp, persistedState);
console.log(store.getState());

store.subscribe(() => {
	saveState({
		// persist only the todos state not UI filter state, which
		// gets reset to showall by the reducer. but we need to make
		// each todo item's id unique or they will conflict upon refresh
		// by starting again at 0
		todos: store.getState().todos
		});  
})

render(
  // Use Provider to make store available to all container components 
  // in the application without passing it explicitly
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);