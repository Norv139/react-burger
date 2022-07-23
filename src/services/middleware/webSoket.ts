import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, TRootState } from "../store";

import {TwsAction} from "../reducers/ws"




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


export const socketMiddleware = (wsActions: TwsAction): Middleware => {

    let {
        
        wsFeedConnectionClosed, 
        wsFeedConnectionError, 
        wsFeedConnectionSuccess,
        wsGetData,
        
    }=wsActions
    let socket: WebSocket
    return (store: MiddlewareAPI<AppDispatch, TRootState>) => {
    

    return next => action => {
        if(wsActions.wsStart.match(action)){
            socket = new WebSocket(action.payload)
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

            if(wsActions.wsClose.match(action)){
                store.dispatch(wsFeedConnectionClosed())
                socket.close()
                console.log('close')
            }
        }           
        return next(action)
    }
}}

export const testSocketMiddleware = (wsAction, resAction, reqAction) => {
    return (storeAPI) => {
        return next => action => {}
    } 
}