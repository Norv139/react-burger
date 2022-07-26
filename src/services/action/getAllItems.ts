
import { path, url } from "../../utils/settings";
import { AppThunk } from "../../utils/type/type";
import { getItems_FAILED, getItems_REQUEST, getItems_SUCCESS } from "../reducers/components";



export const getAllItems = (): AppThunk => dispatch => {
    const axios = require('axios').default;
    dispatch(getItems_REQUEST())

    axios.get(`${url}${path}`)
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