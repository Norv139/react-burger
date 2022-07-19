import { createSlice } from "@reduxjs/toolkit";

const detalsSlice = createSlice({
    name: 'detals',

    initialState: {
        order: {
            order:{
                number:1
            }
        },
    
        orderRequest: false,
        orderFailed: false,
    
        isOpenOrder: false,
    
        info: {},
        isOpenInfo: false
    },

    reducers: {
        setInfo: (state, action) => {
            return {
                ...state, 
                info: {...action.payload.item}
            };
        },
        openInfo: (state) => {
            return {
                ...state, 
                isOpenInfo: true
            };
        },
        closeInfo: (state)=> {
            return {
                ...state, 
                isOpenInfo: false
            };
        },

        postOrder_SUCCESS: (state, action)=>{
            return { 
                ...state, 
                orderFailed: false, 
                order: {...action.payload.items}, 
                orderRequest: false,
                isOpenOrder: true
            };
        },

        postOrder_REQUEST: (state)=>{
            return {
              ...state,
              orderRequest: true
            };
          },
          
          postOrder_FAILED: (state)=>{
            return { 
                ...state,
                orderRequest: false,
                orderFailed: true
            };
        },

        openOrder: (state)=>{
            return {
                ...state,  
                isOpenOrder: true
            };
        },
        closeOrder: (state)=>{
            return {
                ...state,  
                isOpenOrder: false
            };
        }
    }
})


export const { 
    setInfo, 
    
    openInfo, closeInfo, 
    openOrder, closeOrder,

    postOrder_SUCCESS,
    postOrder_REQUEST,
    postOrder_FAILED

} = detalsSlice.actions;

//export const detalsInit = detalsSlice.getInitialState

export default detalsSlice.reducer;
