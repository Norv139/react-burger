import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, TRootState } from "../store";

import { 
    wsFeedConnectionClosed,
    wsFeedConnectionError,
    wsFeedConnectionSuccess,
    wsGetData 
} from "../reducers/ws";



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

export const socketMiddleware: Middleware = (store: MiddlewareAPI<AppDispatch, TRootState>) => {
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
