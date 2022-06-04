import { useSelector, useDispatch } from "react-redux";
import { setCookie, getCookie } from "./utils";
import {userURL, token} from '../utils/settings'

const axios = require('axios').default;



export function refreshToken(){
    
    const refreshToken = getCookie('refreshToken')

    axios.post(`${userURL}${token}`, {
        "token": `${refreshToken}`
    })
    .then((response)=>{
        setCookie(response.data);
    })
    .catch((error) => {console.log(error)})

}

