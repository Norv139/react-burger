import {
    req_FAILED,
    req_REQUEST,
    req_SUCCESS,
    setLogin
} from "../reducers/user"

import { url, login, logout } from "../../utils/settings";

import {setCookie, getCookie, deleteCookie} from '../utils'

const axios = require('axios').default;

export function postData(url, form) {

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

export function logoutUser(form){
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

function postAuthorizationData(body, url){
    const accessToken = getCookie(accessToken)
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