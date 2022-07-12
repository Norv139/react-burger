import { Dispatch, Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, TRootState } from "../store";
import { TwsAction } from "../reducers/ws";
import { 
    wsFeedConnectionClosed,
    wsFeedConnectionError,
    wsFeedConnectionSuccess,
    wsGetData 
} from "../reducers/ws";
import store from "../store";
import { ThunkMiddleware } from "redux-thunk";
import { getCookie } from "../utils/cookie";
import { url } from "inspector";

import { io, Socket } from 'socket.io-client';


export const loggerMiddleware: Middleware = (store) => {
    return (next) => {
        return (action) => {
        console.log('dispatching', action);
        const result = next(action);
        console.log('next state', store.getState());
        return result;
        }
    }
}

export const socketMiddleware: Middleware = store => {
    let socket: WebSocket
    let socketIO: Socket
    let accessToken = getCookie('accessToken')
    //accessToken = accessToken.substring(7)
    console.log('init')
    return next => action => {
        if(action.type === 'ws/wsStart'){
            console.log(action.payload)
            //socketIO = io(action.payload)
            socket = new WebSocket(action.payload)
            console.log(socket)
        }
        

        if (socket){
            socket.onopen = (event) => {
                console.log("onopen", event)
              };

            socket.onerror = (event) => {
                console.log('onerror', event)
              };
            socket.onmessage = event => {
                const { data } = event;
                const parsedData = JSON.parse(data);
                console.log('onmessage', parsedData)
            };


        }           
        return next(action)
    }
}
