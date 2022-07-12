import { setCookie, getCookie } from "./cookie";
import {url, token} from '../../utils/settings'

const axios = require('axios').default;

export function refreshToken(): boolean{ 
    const refreshToken = getCookie('refreshToken')

    return axios.post(`${url}${token}`, {
        "token": `${refreshToken}`
    })
    .then((response)=>{
        setCookie(response.data);
        return true
    })
    .catch((error) => {
        console.log(error); 
        return false})
}

