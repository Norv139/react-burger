import { 
    postOrder_SUCCESS, 
    postOrder_REQUEST, 
    postOrder_FAILED 
} from "../reducers/detals";

import { clearList } from "../reducers/components";

import { url, orders } from "../../utils/settings";
import { getCookie } from "../utils";

//

const axios = require('axios').default;

export function sendOrder (listItems) {
    return dispatch => {

    const data = { "ingredients": listItems.map(x=>x._id) };
    const header = {
        'Authorization': `${getCookie('accessToken')}`
    };

    dispatch(postOrderRequest())
    
    axios.post(`${url}${orders}`, data, header)
    .then( (response) => {
        dispatch(postOrderSuccess(response.data));
        console.log(response);
        dispatch(clearList())
    })
    .catch( (error) => {
        dispatch(postOrderFailed());
        console.log(error);
    })
}}

const postOrderSuccess = items => (
    postOrder_SUCCESS(
        {items: {...items}}
    )
)
const postOrderRequest= () => (
    postOrder_REQUEST()
)
const postOrderFailed= () => (
    postOrder_FAILED()
)