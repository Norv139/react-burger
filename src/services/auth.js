import { setCookie, getCookie } from "./utils";
import {url, token} from '../utils/settings'

const axios = require('axios').default;

export function refreshToken(){
    
    const refreshToken = getCookie('refreshToken')

    axios.post(`${url}${token}`, {
        "token": `${refreshToken}`
    })
    .then((response)=>{
        setCookie(response.data);
    })
    .catch((error) => {console.log(error)})

}

