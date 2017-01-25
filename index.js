import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './reducers/index';
import App from './components/App';  // Presnetation components

let store = createStore(todoApp);

render(
  // Use Provider to make store available to all container components 
  // in the application without passing it explicitly
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);