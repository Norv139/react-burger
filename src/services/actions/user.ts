import {
    req_FAILED,
    req_REQUEST,
    req_SUCCESS,
    setLogin
} from "../reducers/user"

import { url, login, logout } from "../../utils/settings";

import {setCookie, getCookie, deleteCookie} from '../utils/cookie'
import { ThunkAction } from "redux-thunk";
import store, { TRootState } from "../store";
import { ActionCreator, AnyAction } from "redux";

const axios = require('axios').default;

type RootState = ReturnType<typeof store.getState>;
//type TActionComponent = typeof actionComponent

type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, AnyAction, RootState, any>
>;


export const postData:AppThunk  = (url: string, form:any) => {

    return dispatch => {
        dispatch(reqRequest)

        axios.post(url, form)
        .then( (response) => {
            setCookie(response.data);

            //console.log(response.data)
            dispatch(reqSuccess(response.data));

            if (url.indexOf('/login') !== -1){
                    dispatch(setLogin(true))
            }

        })
        .catch( (error) => {
            dispatch(reqFailed());
            console.log("error", error);
        })
    }
}


const reqSuccess = response => (
    req_SUCCESS(response)
)
const reqRequest= () => (
    req_REQUEST()
)
const reqFailed= () => (
    req_FAILED()
)

export function logoutUser(){
    const urlLogout = "https://norma.nomoreparties.space/api/auth/logout"
    axios.post(`${url}${logout}`, {"token": `${getCookie('refreshToken')}`})
    .then( (response) => {
        deleteCookie('refreshToken')
        deleteCookie('accessToken')
    })
    .catch( (error) => {
        console.log("error", error);
    })
}

function postAuthorizationData(url: string, body){
    const accessToken = getCookie('accessToken')
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `${accessToken}`
      }

    return dispatch => {
        dispatch(reqRequest)

        axios.post(url, body, headers )
        .then( (response) => {
            console.log(response)
            
        })
        .catch( (error) => {
            console.log(error)
        })
    }
}