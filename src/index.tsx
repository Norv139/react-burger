import React from 'react';
import ReactDOM from 'react-dom/client';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers';


import './index.css';
import App from './components/App/App';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}


const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

 const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </Provider>
  </React.StrictMode>,
);


