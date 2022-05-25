import { url, orders, path } from "../../utils/settings";
import { 
    POST_ORDER_FAILED, 
    POST_ORDER_REQUEST, 
    POST_ORDER_SUCCESS 
} from "./detals";

import { 
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILED
} from "./components";

const axios = require('axios').default;


export function sendOrder (listItems) {
    return dispatch => {

    const data = { "ingredients": listItems.map(x=>x._id) };

    dispatch(postOrderRequest())

    axios.post(url + orders, data)
    .then( (response) => {
        dispatch(postOrderSuccess(response.data));
        console.log(response);
    })
    .catch( (error) => {
        dispatch(postOrderFailed());
        console.log(error);
    })
}}

const postOrderSuccess = items => ({
    type: POST_ORDER_SUCCESS, items: {...items}
})
const postOrderRequest= () => ({
    type: POST_ORDER_REQUEST
})
const postOrderFailed= () => ({
    type: POST_ORDER_FAILED
})


export function getAllItems() {
    return dispatch => {

        dispatch(getItemsRequest)

        axios.get(url+path)
        .then( (response) => {
            dispatch(getItemsSuccess(response.data.data));
        })
        .catch( (error) => {
            dispatch(getItemsFailed());
            console.log(error);
        })


}}

const getItemsSuccess = response => ({
    type: GET_ITEMS_SUCCESS, 
    items: response
})
const getItemsRequest= () => ({
    type: GET_ITEMS_REQUEST
})
const getItemsFailed= () => ({
    type: GET_ITEMS_FAILED
})


