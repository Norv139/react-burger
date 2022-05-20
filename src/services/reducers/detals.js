import { 
    SET_INFO, 
    OPEN_INFO, 
    CLOSE_INFO, 
    OPEN_ORDER, 
    CLOSE_ORDER,
    POST_ORDER_SUCCESS ,
    POST_ORDER_REQUEST ,
    POST_ORDER_FAILED

} from "../actions/detals"

const initialState = {
    order: {},

    orderRequest: false,
    orderFailed: false,

    isOpenOrder: false,

    info: {},
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

        case POST_ORDER_SUCCESS: {
            return { 
                ...state, 
                orderFailed: false, 
                order: {...action.items}, 
                orderRequest: false,
                isOpenOrder: true
            };
          }
        case POST_ORDER_REQUEST: {
            return {
              ...state,
              orderRequest: true
            };
          }
        case POST_ORDER_FAILED: {
            return { 
                ...state,
                orderRequest: false,
                orderFailed: true
            };
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