import { 
    postOrder_SUCCESS, 
    postOrder_REQUEST, 
    postOrder_FAILED 
} from "../reducers/detals";

import { url, orders } from "../../utils/settings";
//

const axios = require('axios').default;

export function sendOrder (listItems) {
    return dispatch => {

    const data = { "ingredients": listItems.map(x=>x._id) };

    dispatch(postOrderRequest())

    axios.post(`${url}${orders}`, data)
    .then( (response) => {
        dispatch(postOrderSuccess(response.data));
        console.log(response);
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