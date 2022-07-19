import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { url } from "../../utils/settings";
import { AppThunk, TdataPropTypes } from "../../utils/type/type";
import { clearList } from "../reducers/components";
import { postOrder_FAILED, postOrder_REQUEST, postOrder_SUCCESS } from "../reducers/detals";
import { TRootState } from "../store";
import { getCookie } from "../utils/cookie";



export const sendOrder = (listItems:Array<TdataPropTypes>): AppThunk<Promise<unknown>> => 
async dispatch => {
        const axios = require('axios').default;
        
        const data = { "ingredients": listItems.map(x=>x._id) };

        const header = {
            'content-Type': 'application/json',
            'authorization': `${(getCookie('accessToken'))}`
        };
    
        dispatch(postOrder_REQUEST())
    
        await axios.post(`${url}/orders`, data, {
            headers: header
          })
        .then( (response) => {
            dispatch(
                postOrder_SUCCESS(
                    {items: {...response.data}}
                    )
                );
            console.log(response);
            dispatch(clearList())
        })
        .catch( (error) => {
            dispatch(postOrder_FAILED());
            console.log(error);
        })
}