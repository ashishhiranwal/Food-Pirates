import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: '',
    resData:'',

}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
            state.resData=action.payload.resData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.resData=null;
        }
     }
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;