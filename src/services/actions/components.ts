import { 
    getItems_REQUEST, 
    getItems_SUCCESS, 
    getItems_FAILED, 
    actionComponent
} from "../reducers/components";

import { url, path } from "../../utils/settings";
import { Action, ActionCreator, ThunkAction } from "@reduxjs/toolkit";
import store from "../store";

const axios = require('axios').default;

type RootState = ReturnType<typeof store.getState>;
type TActionComponent = typeof actionComponent

type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, TActionComponent, RootState, any>
>;

export const getAllItems:AppThunk = ()=> {
    return dispatch => {

        dispatch(getItemsRequest)

        axios.get(`${url}${path}`)
        .then( (response) => {
            dispatch(getItemsSuccess(response.data.data));
        })
        .catch( (error) => {
            dispatch(getItemsFailed());
            console.log(error);
        })


}}

const getItemsSuccess = response => (
    getItems_SUCCESS(
        {items: response}
    )
)
const getItemsRequest= () => (
    getItems_REQUEST()
)
const getItemsFailed= () => (
    getItems_FAILED()
)