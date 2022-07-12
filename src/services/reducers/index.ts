import { combineReducers } from 'redux';

import wsReduser from './ws'
import componentsReduser from './components';
import detalsReduser from './detals';
import userReduser from './user'



export const rootReducer = combineReducers({
    components: componentsReduser,
    detals: detalsReduser,
    user: userReduser,
    ws: wsReduser
})
