//	IMPORTS
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Router, Route, hashHistory, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'


import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ExpModel from './ExpModel';

import App from './pages/App';
import About from './pages/About';
import Experiment from './pages/Experiment';

console.log('New Path testing');
//	CONSTRUCT MODELS

const experimentsReducer = (state=ExpModel, action) => {
	return state;
}

const reducers = (state=ExpModel, action) => {
	return state;
}

const middleware = routerMiddleware(hashHistory)

//	MAKE SOME REDUCERS
let reducer = combineReducers({
  experiments: experimentsReducer,
  routing: routerReducer
})

const store = createStore(reducer, applyMiddleware(middleware));
// const storeRouting = createStore(reducer);
const history = syncHistoryWithStore(hashHistory, store);


render(
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="/Sketches/" component={App} />
				<Route path="/Sketches/exps/:exp" component={Experiment} />
			<Route path="/Sketches/about" component={About} />
		</Router>
	</Provider>
	,document.querySelector('#root')
);


