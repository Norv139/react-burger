import React from 'react';
import ReactDOM from 'react-dom/client';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Provider } from 'react-redux';

import store from './services/store';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './components/App/App';




const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </Provider>
  </BrowserRouter>
  ,
);


