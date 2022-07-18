import { AnyAction } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { path, url } from "../../utils/settings";
import { getItems_FAILED, getItems_REQUEST, getItems_SUCCESS } from "../reducers/components";
import { TRootState } from "../store";

type AppThunk<ThunkReturnType = void> = ThunkAction<
ThunkReturnType, // возвращаемый тип после выхоза thunk
TRootState, // root state )))
unknown, // дополнительный аргумент добавляемый в каждый thunk, в проекте мы его не использовали
AnyAction // Список всех обычных экшенов
>;

export const getAllItems = (): AppThunk<Promise<unknown>> => 
async dispatch => {
    const axios = require('axios').default;
    dispatch(getItems_REQUEST())

    await axios.get(`${url}${path}`)
    .then( (response) => {
        dispatch(
            getItems_SUCCESS(
                {items: response.data.data}
            )
        );
    })
    .catch( (error) => {
        dispatch(
            getItems_FAILED()
        );
        console.log(error);
    })
}