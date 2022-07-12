import { createSlice } from "@reduxjs/toolkit";

import { TdataPropTypes } from "../../utils/type/type";

const componentsSlice = createSlice({
    name: 'detals',

    initialState: {
        items: [],
        itemsRequest: false,
        itemsFailed: false,
    
        list: [] as Array<TdataPropTypes>
    },

    reducers: {
        getItems_SUCCESS: (state, action)=>{
            return { 
                ...state, 
                itemsFailed: false, 
                items: action.payload.items, 
                itemsRequest: false 
            };
        },
        getItems_REQUEST: (state)=>{
            return {
                ...state,
                itemsRequest: true
              };
        },
        getItems_FAILED: (state)=>{
            return { 
                ...state, 
                itemsFailed: true, 
                itemsRequest: false 
            };
        },
        
        clearList:(state)=>{
            return { ...state, list: [] };
        },

        decrease_list_item: (state,action)=>{

            return {
                ...state, 
                list: [
                    ...state.list.filter(x=>x._id!==action.payload.id), 
                    ...state.list.filter(x=>x._id===action.payload.id).slice(0,-1)
                ]
              };
        },
        increase_list_item: (state, action)=>{
            return action.payload.items.type === "bun" ? 
            {...state, list: [...state.list.filter(x=>x.type!=='bun'), action.payload.items]} :
            {...state, list: [...state.list, action.payload.items]}
        },

        change_list: (state, action)=>{
            return {...state, list: [...action.payload.items]}
        },
    }
})


export const { 
    getItems_SUCCESS, 
    getItems_REQUEST, 
    getItems_FAILED,

    clearList,

    decrease_list_item,
    increase_list_item,
    change_list
} = componentsSlice.actions;
export const actionComponent = typeof componentsSlice.actions

export default componentsSlice.reducer;