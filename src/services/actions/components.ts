import { 
    getItems_REQUEST, 
    getItems_SUCCESS, 
    getItems_FAILED, 
    actionComponent
} from "../reducers/components";

import { url, path } from "../../utils/settings";
import { Action, ActionCreator, AnyAction, ThunkAction } from "@reduxjs/toolkit";
import store, { TRootState } from "../store";
import { ThunkDispatch, ThunkMiddleware } from "redux-thunk";

const axios = require('axios').default;

type RootState = ReturnType<typeof store.getState>;
type TActionComponent = typeof actionComponent

type AppThunk = ThunkAction<any, TRootState, null, any>

export const getAllItems = () => {
    return (dispatch) => {
        dispatch(getItems_REQUEST())

        axios.get(`${url}${path}`)
        .then( (response) => {
            dispatch(
                getItems_SUCCESS(
                    {items: response.data.data}
                )
            );
        })
        .catch( (error) => {
            dispatch(
                getItems_FAILED()
            );
            console.log(error);
        })
}
}