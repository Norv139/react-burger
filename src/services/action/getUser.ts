import { url } from "../../utils/settings";
import { AppThunk } from "../../utils/type/type";
import { req_SUCCESS, setUserData } from "../reducers/user";
import { getCookie } from "../utils/cookie";


export const getUser =(): AppThunk<Promise<unknown>> => async dispatch=>{
    const axios = require('axios').default;
    await axios.get(
        `${url}/auth/user`,
        {headers: {'authorization': `${getCookie('accessToken')}`}}
    ).then( (response) => {
        //dispatch(req_SUCCESS(response.data.user))
        dispatch(setUserData(response.data.user))
    }).catch( (error) => {
        console.log("error", error);
    })
}

