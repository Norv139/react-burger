import { url, orders, path } from "../../utils/settings";

import { 
    getItems_REQUEST, 
    getItems_SUCCESS, 
    getItems_FAILED 
} from "../reducers/components";

import { 
    postOrder_SUCCESS, 
    postOrder_REQUEST, 
    postOrder_FAILED 
} from "../reducers/detals";

//

const axios = require('axios').default;

//

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

//

export function getAllItems() {
    return dispatch => {

        dispatch(getItemsRequest)

        axios.get(`${url}${path}`)
        .then( (response) => {
            dispatch(getItemsSuccess(response.data.data));
        })
        .catch( (error) => {
            dispatch(getItemsFailed());
            console.log(error);
        })


}}

const getItemsSuccess = response => (
    getItems_SUCCESS(
        {items: response}
    )
)
const getItemsRequest= () => (
    getItems_REQUEST()
)
const getItemsFailed= () => (
    getItems_FAILED()
)


