import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name: 'user',

    initialState: {
        previousPath: [null, null],
        isLogin: false,
        data:{},
        itemsFailed: false,
        itemsRequest: false,
        //refreshSuccess: false
    },

    reducers: {
        /*
        setRefreshSuccess: (state, action)=>{
            return{
                ...state,
                refreshSuccess: action.payload
            }
        },  */
        setPreviousPath: (state, action)=>{
            return{
                ...state,
                previousPath: [ ...state.previousPath, action.payload].slice(-2)
            }
        },

        setLogin: (state, action)=>{
            return{
                ...state,
                isLogin: action.payload
            }
        },

        setUserData:(state, action)=>{
            return { 
                ...state, 
                itemsFailed: false, 
                data: action.payload, 
                itemsRequest: false 
            };
        },

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
    req_SUCCESS,
    setPreviousPath,
    setLogin,
    //setRefreshSuccess
    setUserData
} = user.actions;

export default user.reducer;