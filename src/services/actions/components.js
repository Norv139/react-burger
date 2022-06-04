import { 
    getItems_REQUEST, 
    getItems_SUCCESS, 
    getItems_FAILED 
} from "../reducers/components";

import { url, path } from "../../utils/settings";

const axios = require('axios').default;

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