import { url, logout } from "../../utils/settings";
import { AppThunk } from "../../utils/type/type";
import { setLogin } from "../reducers/user";

import { getCookie, deleteCookie} from '../utils/cookie'

const axios = require('axios').default;




export const logoutUser=(): AppThunk<Promise<unknown>> => 
async dispatch => {
    dispatch(setLogin(false))
    await axios.post(`${url}${logout}`, {"token": `${getCookie('refreshToken')}`})
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