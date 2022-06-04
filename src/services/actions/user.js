import {
    req_FAILED,
    req_REQUEST,
    req_SUCCESS
} from "../reducers/user"

import {setCookie, getCookie, deleteCookie} from '../utils'
import { refreshToken } from "../auth";

const axios = require('axios').default;

export function postData(url, form) {
    return dispatch => {
        dispatch(reqRequest)

        axios.post(url, form)
        .then( (response) => {
            setCookie(response.data);
            dispatch(reqSuccess(response.data));

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

function logoutUser(form){
    const url = "https://norma.nomoreparties.space/api/auth/logout"
    axios.post(url, form)
    .then( (response) => {
        setCookie(response.data);
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

        axios.post(url, body, )
        .then( (response) => {
            console.log(response)

        })
        .catch( (error) => {
            console.log(error)
        })
    }
}