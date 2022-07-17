import { 
    postOrder_SUCCESS, 
    postOrder_REQUEST, 
    postOrder_FAILED 
} from "../reducers/detals";

import { clearList } from "../reducers/components";

import { url } from "../../utils/settings";
import { getCookie } from "../utils/cookie"
import { TdataPropTypes } from "../../utils/type/type";

//

const axios = require('axios').default;

export const sendOrder = (listItems:Array<TdataPropTypes>) => {

    console.log({
        'Authorization': `${getCookie('accessToken')}`
    })
    return dispatch => {

    const data = { "ingredients": listItems.map(x=>x._id) };
    const header = {
        'content-Type': 'application/json',
        'authorization': `${(getCookie('accessToken'))}`
    };

    dispatch(postOrderRequest())

    
    axios.post(`${url}/orders`, data, {
        headers: header
      })
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