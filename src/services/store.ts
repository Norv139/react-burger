import { compose } from 'redux';
//import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
//import { createStore, } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { socketMiddleware } from './middleware/webSoket';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// function loadFromLocalStorage() {
//     try {
//         const serialisedState = localStorage.getItem("persistantState");
//         if (serialisedState === null) return undefined;

//         var obj = {...JSON.parse(serialisedState)}

//         //obj.user = userInit;
//         //obj.detals = detalsInit;

//         return {...obj};
//     } catch (e) {
//         console.warn(e);
//         return undefined;
//     }
// }
  
// function saveToLocalStorage(state) {
//     try {
//       const serialisedState = JSON.stringify(state);
//       localStorage.setItem("persistantState", serialisedState);
//     } catch (e) {
//       console.warn(e);
//     }
// }



// const composeEnhancers =
//     typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//         ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//         : compose;

// const enhancer = composeEnhancers( applyMiddleware(thunk ));



const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, socketMiddleware]
})

// const store = createStore(rootReducer, enhancer);
//store.subscribe(() => saveToLocalStorage(store.getState()));

export type TRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store