import { createStore } from 'redux';
import todoApp from './reducers/index';
import { loadState, saveState, deleteState } from './localStorage';
import throttle from 'lodash/throttle';

const configureStore = () => {

	deleteState();  // only used to remove the saved state
	const persistedState = loadState();

	const store = createStore(todoApp, persistedState);
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

	return store;
}

// can create many instances of store in tests
export default configureStore;