import { createStore } from 'redux';
import todoApp from './reducers/index';
//import { loadState, saveState, deleteState } from './localStorage';
//import throttle from 'lodash/throttle';

const addLoggingToDispatch = (store) => {
	const rawDispatch = store.dispatch;

	if (!console.group) {
		return rawDispatch;
	}

	// if given action, return new dispatch function with logging
	return (action) => {
		console.group(action.type);

		console.log('%c prev state', 'color: gray', store.getState());
		console.log('%c action', 'color: blue', action);
		const returnValue = rawDispatch(action);
		console.log('%c next state', 'color: green', store.getState());

		console.groupEnd(action.type);
		return returnValue;  // return new dispatch function with logging
	}
}

const addPromiseSupportToDispatch = (store) => {
	const rawDispatch = store.dispatch;
	return (action) => {
		if (typeof action.then === 'function') {  // action is promise
			return action.then(rawDispatch);
		}
		return rawDispatch(action);
	}
}

const configureStore = () => {

	//deleteState();  // only used to remove the saved state
	//const persistedState = loadState();  // comment out so to use fetch data

	const store = createStore(todoApp);
	//const store = createStore(todoApp, persistedState);
	console.log(store.getState());

	if (process.env.NODE_ENV !== 'production') {
		store.dispatch = addLoggingToDispatch(store);
	}	

	// // when store changes, saveState gets called
	// store.subscribe(throttle(() => {
	// 	saveState({
	// 		// persist only the todos state not UI filter state, which
	// 		// gets reset to showall by the reducer.
	// 		todos: store.getState().todos
	// 		});
	// 		// since everytime saveState calls stringify is expensive, 
	// 		// we throttle to save once every second  
	// }, 1000)); 

	store.dispatch = addPromiseSupportToDispatch(store);

	return store;
}

// can create many instances of store in tests
export default configureStore;