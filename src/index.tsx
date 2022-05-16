import React from 'react';
import ReactDOM from 'react-dom';
//import { compose, applyMiddleware } from 'redux';
//import thunk from 'redux-thunk';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers';


import './index.css';
import App from './components/App/App';

{/*

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
 */}

const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
