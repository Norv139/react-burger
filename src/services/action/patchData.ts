import { url } from "../../utils/settings";
import { AppThunk } from "../../utils/type/type";
import { setUserData } from "../reducers/user";
import { getCookie } from "../utils/cookie";

export const patchData = (form): AppThunk=> dispatch=>{
    const axios = require('axios').default;
    axios.patch(
        `${url}/auth/user`, 
        {...form},
        {headers: {'authorization': `${getCookie('accessToken')}`}}
    ).then( (response) => {
        dispatch(setUserData(response.data.user))
    }).catch( (error:Response) => {
        console.log("error", error);
    })
}