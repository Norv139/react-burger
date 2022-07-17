import { url, logout } from "./settings";

import { getCookie, deleteCookie} from '../services/utils/cookie'

const axios = require('axios').default;




export function logoutUser(){
    //const urlLogout = "https://norma.nomoreparties.space/api/auth/logout"
    axios.post(`${url}${logout}`, {"token": `${getCookie('refreshToken')}`})
    .then( (response) => {
        deleteCookie('refreshToken')
        deleteCookie('accessToken')
    })
    .catch( (error) => {
        console.log("error", error);
    })
}


// function postAuthorizationData(url: string, body){
//     const accessToken = getCookie('accessToken')
//     const headers = {
//         'Content-Type': 'application/json',
//         'Authorization': `${accessToken}`
//       }

//     return dispatch => {
//         dispatch(req_REQUEST())

//         axios.post(url, body, headers )
//         .then( (response) => {
//             console.log(response)
            
//         })
//         .catch( (error) => {
//             console.log(error)
//         })
//     }
// }