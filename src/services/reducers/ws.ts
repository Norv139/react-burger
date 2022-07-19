import { createSlice } from "@reduxjs/toolkit";

export type TwsOrder = {
    ingredients: Array<string>;
    _id: string;
    status: string;
    number: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  }

export interface IWSFeedMessage {
    orders: Array<TwsOrder>;
    total: number;
    totalToday: number;
  }



const wsReduser = createSlice({
    name: 'ws',
    initialState: {
        wsConnected: false,
        feed:{
                orders: [
                    {
                        ingredients: [''],
                        _id: "",
                        status: "",
                        number: 0,
                        name: '',
                        createdAt: '',
                        updatedAt: ''
                    }
                ],
                total: 0,
                totalToday: 0,
            },
        wsError: false
    },
    reducers: {
        wsStart: (state, payload)=>{
            return {...state}
        },
        wsClose: (state, payload)=>{
            return {...state}
        },
        wsFeedConnectionSuccess: (state)=>{
            return {
                ...state,
                wsConnected: true
            }
        },

        wsFeedConnectionError: (state)=> {
            return {
                ...state,
                wsConnected: false,
                wsError: true
            }
        },

        wsFeedConnectionClosed: (state)=>{
            return {
                ...state,
                wsConnected: false,
                wsError: false
            }
        },

        wsGetData: (state, action)=>{
            return {
                ...state,
                feed: action.payload
            }
        }
    }
})

export const {
    wsStart,
    wsClose,
    wsFeedConnectionClosed,
    wsFeedConnectionError,
    wsFeedConnectionSuccess,
    wsGetData
} = wsReduser.actions

export type TwsAction = typeof wsReduser.actions
export const WsAction =  wsReduser.actions

export default wsReduser.reducer