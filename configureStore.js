import { createStore, applyMiddleware } from 'redux';
//import promise from 'redux-promise';
import createLogger from 'redux-logger';
import todoApp from './reducers/index';
//import { loadState, saveState, deleteState } from './localStorage';
//import throttle from 'lodash/throttle';

// next dispatch function
const thunk = (store) => (next) => (action) => 
	typeof action === 'function' ?
		action(store.dispatch) :
		next(action);

// const logger = (store) => { // could use (store) => (next)=> (action) => {}
// 	return (next) => {  // currying: let user input what property to pass, e.g. dispatch
// 	//const next = store.dispatch;  // next points to original dispatch

// 		if (!console.group) {
// 			return next;
// 		}

// 		// if given action, return new dispatch function with logging
// 		return (action) => {
// 			console.group(action.type);

// 			console.log('%c prev state', 'color: gray', store.getState());
// 			console.log('%c action', 'color: blue', action);
// 			const returnValue = next(action);
// 			console.log('%c next state', 'color: green', store.getState());

// 			console.groupEnd(action.type);
// 			return returnValue;  // return new dispatch function with logging
// 		}
// 	}
// }

// const promise = (store) => {   
// 	//console.log("addPromiseSupportToDispatch")
// 	return (next) => { 
// 		//const next = store.dispatch;  // next dispatch 
// 		return (action) => {
// 			if (typeof action.then === 'function') {  // action is promise
// 				return action.then(next);
// 			}
// 			return next(action);
// 		}
// 	}
// }

// const wrapDispatchWithmiddlewaress = (store, middlewares) => {
// 	// reverse here since want to recgonize action promise last
// 	middlewares.slice().reverse().forEach(middleware =>   
// 		store.dispatch = middleware(store)(store.dispatch)  // store.dispatch is composed
// 	)	
// }

const configureStore = () => {

	//deleteState();  // only used to remove the saved state
	//const persistedState = loadState();  // comment out so to use fetch data

	const middlewares = [thunk];
	//const middlewares = [promise]; // specifiy based on order action propagate through middleware

	if (process.env.NODE_ENV !== 'production') {
		middlewares.push(createLogger());
		//middlewares.push(logger);
		//store.dispatch = addLoggingToDispatch(store);
	}	

	return createStore (
		todoApp,
		applyMiddleware	(...middlewares) // return an enhancer
		);
	// const store = createStore(
	// 	todoApp,
	// 	// persistedState goes here if needed
	// 	applyMiddleware(...middlewares));
		//const store = createStore(todoApp);
		//const store = createStore(todoApp, persistedState);
	console.log(store.getState());
	

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

		//middlewares.push(promise);
		//store.dispatch = addPromiseSupportToDispatch(store);
		//wrapDispatchWithmiddlewaress(store, middlewares);

	//return store;
}

// can create many instances of store in tests
export default configureStore;