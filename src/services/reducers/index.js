import componentReduser from './components' 
import detalsReduser from './detals';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
    components: componentReduser,
    detals: detalsReduser
})


