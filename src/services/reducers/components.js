import {
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILED, 
    GET_ITEMS_REQUEST,

    DECREASE_LIST_ITEM,
    INCREASE_LIST_ITEM

} from "../actions/components";

const initialState = {
    items: [],
    itemsRequest: false,
    itemsFailed: false,

    list: []
}

const componentReduser = (state = initialState, action) => {
    switch (action.type) {

        case GET_ITEMS_SUCCESS: {
            return { ...state, itemsFailed: false, items: action.items, itemsRequest: false };
          }
        case GET_ITEMS_REQUEST: {
            return {
              ...state,
              itemsRequest: true
            };
          }
        case GET_ITEMS_FAILED: {
            return { ...state, itemsFailed: true, itemsRequest: false };
        }

        case DECREASE_LIST_ITEM: {
            return {
                ...state,
                items: [...state.items].map(item =>
                  item.id === action.id ? { ...item, qty: --item.qty } : item
                )
              };
        }
        case INCREASE_LIST_ITEM: {
            return {...state, list: [...state.list, action.items]}
        }

        default: {
            return state
        }
    }
}

export default componentReduser