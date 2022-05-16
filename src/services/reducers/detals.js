import { SET_INFO, OPEN_INFO, CLOSE_INFO, OPEN_ORDER, CLOSE_ORDER } from "../actions/detals"

const initialState = {
    order: [],
    info: {},

    isOpenOrder: false,
    isOpenInfo: false
}

 const detalsReduser = (state = initialState, action) => {
    switch (action.type) {

        case SET_INFO:{
            return {...state, info: {...action.item}}
        }
        case OPEN_INFO: {
            return {...state, isOpenInfo: true}
        }
        case CLOSE_INFO: {
            return {...state, isOpenInfo: false}
        }


        case OPEN_ORDER: {
            return {...state, isOpenOrder: true}
        }
        case CLOSE_ORDER: {
            return {...state, isOpenOrder: false}
        }

        default: {
            return state
        }
    }
}

export default detalsReduser