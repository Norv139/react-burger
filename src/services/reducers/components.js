import {
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILED, 
    GET_ITEMS_REQUEST,

    DECREASE_LIST_ITEM,
    INCREASE_LIST_ITEM,
    CHANGE_LIST

} from "../actions/components";
import testListData from "../../utils/data";

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
                list: [
                    ...state.list.filter(x=>x._id!==action.id), 
                    ...state.list.filter(x=>x._id===action.id).slice(0,-1)
                ]
              };
        }
        case INCREASE_LIST_ITEM: {
            return action.items.type === "bun" ? 
            {...state, list: [...state.list.filter(x=>x.type!=='bun'), action.items]} :
            {...state, list: [...state.list, action.items]}
        }

        case CHANGE_LIST: {
            return {...state, list: [...action.items]}
        }

        default: {
            return state
        }
    }
}

export default componentReduser