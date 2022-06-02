import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name: 'todo',

    initialState: {
        form: {
            "email": "", 
            "password": "", 
            "name": "" 
        },
        token : ""
    },

    reducers: {

    }
})


export const { 

} = user.actions;

export default user.reducer;