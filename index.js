import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './reducers/index';
import App from './components/App';  // Presnetation components
import { loadState, saveState, deleteState } from './localStorage';
import throttle from 'lodash/throttle';

//deleteState();  // only used to remove the saved state
const persistedState = loadState();

let store = createStore(todoApp, persistedState);
console.log(store.getState());

store.subscribe(throttle(() => {
	saveState({
		// persist only the todos state not UI filter state, which
		// gets reset to showall by the reducer.
		todos: store.getState().todos
		});
		// since everytime saveState calls stringify is expensive, 
		// we throttle to save once every second  
}, 1000)); 


render(
  // Use Provider to make store available to all container components 
  // in the application without passing it explicitly
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);