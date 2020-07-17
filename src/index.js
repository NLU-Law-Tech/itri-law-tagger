import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './assets/bootstrap.min.css'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import TagReducer from './modules/TagModule/reducer'
import SideMenuReducer from './modules/SideMenuModule/reducer'
import MainReducer from './modules/MainReducer'
import logger from 'redux-logger'
import ReduxThunk from 'redux-thunk';

let store = createStore(combineReducers({MainReducer,TagReducer,SideMenuReducer}),applyMiddleware(ReduxThunk,logger))
console.log(store)
ReactDOM.render(
  <>
    <Provider store={store}>
    <App />
    </Provider>
  </>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
