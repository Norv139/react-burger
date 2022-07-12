import { createSlice } from "@reduxjs/toolkit";
import { type } from "os";

type TOrder = {
    _id: string;
    ingredients: Array<string>;
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
  }

interface IWSFeedMessage {
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
  }


const wsReduser = createSlice({
    name: 'ws',
    initialState: {
        wsConnected: false,
        feed: [] as Array<IWSFeedMessage>,
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
                feed: [state.feed, action.payload]
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

export default wsReduser.reducer