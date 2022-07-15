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

    return next => action => {
        if(action.type === 'ws/wsStart'){
            //console.log(action.payload)
            socket = new WebSocket(action.payload)
            console.log(socket)
        }
        if (socket){      
            socket.onopen = (event) => {
                store.dispatch(wsFeedConnectionSuccess())
                console.log("onopen")
              };

            socket.onerror = (event) => {
                store.dispatch(wsFeedConnectionError())
                console.log('onerror')
              };
            socket.onmessage = event => {
                const { data } = event;
                const parsedData = JSON.parse(data);

                const { success, ...restParsedData } = parsedData;

                store.dispatch(wsGetData(restParsedData))
                console.log('onmessage', restParsedData)
            };

            if(action.type === 'ws/wsClose'){
                store.dispatch(wsFeedConnectionClosed())
                socket.close()
            }
        }           
        return next(action)
    }
}
