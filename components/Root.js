import React, { PropTypes } from 'react';  // use jsx syntax
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';  // Route is config
import App from './App';  // Presnetation components

const Root = ({store}) => (
 	// Use Provider to make store available to all container components 
	// in the application without passing it explicitly
	<Provider store={store}>
		{/*default to hash history, browserhistory keeps url clean of hash*/}
		<Router history={browserHistory}>  
			<Route path='/' component={App} />
		</Router>	
	</Provider>
);

Root.propTypes = {
	store: PropTypes.object.isRequired
}

export default Root;
