import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { url } from "../../utils/settings";
import { TdataPropTypes } from "../../utils/type/type";
import { clearList } from "../reducers/components";
import { postOrder_FAILED, postOrder_REQUEST, postOrder_SUCCESS } from "../reducers/detals";
import { TRootState } from "../store";
import { getCookie } from "../utils/cookie";

type AppThunk<ThunkReturnType = void> = ThunkAction<
ThunkReturnType, // возвращаемый тип после выхоза thunk
TRootState, // root state )))
unknown, // дополнительный аргумент добавляемый в каждый thunk, в проекте мы его не использовали
AnyAction // Список всех обычных экшенов
>;


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