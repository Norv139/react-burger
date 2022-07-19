import { AppThunk } from "../../utils/type/type";
import { req_FAILED, req_REQUEST, req_SUCCESS, setLogin } from "../reducers/user";
import { setCookie } from "../utils/cookie";

export const postData =(url: string, form: any): AppThunk<Promise<unknown>> => 
async dispatch => {
    dispatch(req_REQUEST())

    const axios = require('axios').default;

    await axios.post(url, form)
    .then((response) => {
        setCookie(response.data);

        //console.log(response.data)
        dispatch(
            req_SUCCESS(response.data)
        );

        if (url.indexOf('/login') !== -1) {
            dispatch(setLogin(true))
        }

    })
    .catch((error) => {
        dispatch(req_FAILED());
        
        console.log("error", error);
    })
}
