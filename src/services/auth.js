import {  } from "../utils/settings";


export const post = async form => {
    axios.get(`${url}${path}`)
        .then( (response) => {
            dispatch(getItemsSuccess(response.data.data));
        })
        .catch( (error) => {
            dispatch(getItemsFailed());
            console.log(error);
        })
}