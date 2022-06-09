import { compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { createStore } from 'redux';

function loadFromLocalStorage() {
    try {
        const serialisedState = localStorage.getItem("persistantState");
        if (serialisedState === null) return undefined;

        var obj = {...JSON.parse(serialisedState)}

        obj.components.list=[]

        console.log(obj)

        return {...obj};
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}
  
function saveToLocalStorage(state) {
    try {
      const serialisedState = JSON.stringify(state);
      localStorage.setItem("persistantState", serialisedState);
    } catch (e) {
      console.warn(e);
    }
}


const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));



const store = createStore(rootReducer, loadFromLocalStorage(), enhancer);



store.subscribe(() => saveToLocalStorage(store.getState()));




export default store