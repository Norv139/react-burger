import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name: 'user',

    initialState: {
        data:{},
        itemsFailed: false,
        itemsRequest: false
    },
    reducers: {
        req_SUCCESS: (state, action)=>{
            return { 
                ...state, 
                itemsFailed: false, 
                data: action.payload, 
                itemsRequest: false 
            };
        },
        req_REQUEST: (state)=>{
            return {
                ...state,
                itemsRequest: true
              };
        },
        req_FAILED: (state)=>{
            return { 
                ...state, 
                itemsFailed: true, 
                itemsRequest: false 
            };
        },
    }
})


export const {
    req_FAILED,
    req_REQUEST,
    req_SUCCESS
} = user.actions;

export default user.reducer;