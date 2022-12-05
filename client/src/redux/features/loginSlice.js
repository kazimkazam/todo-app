import { createSlice } from "@reduxjs/toolkit";
import { loginApi } from "../../resources/utils/callBackendApi";
// import env from "react-dotenv";

export const loginSlice = createSlice({
    name: 'loginState',
    initialState: {
        email: '',
        password: '',
        username: '',
        userId: null,
        sid: '',
        isLoggedIn: false,
        fetchStatus: 'idle',
        errorStatus: null,
    },
    reducers: {
        handleChange: (state, action) => {
            state[action.payload.target.name] = action.payload.target.value;
        },

        handleReset: (state) => {
            state.email = '';
            state.password = '';
            state.username = '';
            state.userId = null;
            state.isLoggedIn = false;
            state.fetchStatus = 'idle';
            state.errorStatus = null;
        },
    },
    extraReducers: builder => {
        builder
        .addCase(loginApi.rejected, (state, action) => {
            state.fetchStatus = 'failed';
            state.errorStatus = action.error.message;
            state.isLoggedIn = false;
        })
        .addCase(loginApi.pending, (state, action) => {
            state.fetchStatus = 'loading';
        })
        .addCase(loginApi.fulfilled, (state, action) => {
            state.errorStatus = null;
            state.fetchStatus = 'succeded';
            if (action.payload.token === process.env.REACT_APP_LOGIN_TOKEN) {
                state.isLoggedIn = true;
                state.password = '';
                state.username = action.payload.username;
                state.userId = action.payload.userId;
                state.sid = action.payload.sid;
            };
        })
    },
});

export const { handleChange, handleReset } = loginSlice.actions;

export const selectEmail = (state) => state.loginState.email;
export const selectPassword = (state) => state.loginState.password;
export const selectUsername = (state) => state.loginState.username;
export const selectUserId = (state) => state.loginState.userId;
export const selectIsLoggedIn = (state) => state.loginState.isLoggedIn;
export const selectFetchStatus = (state) => state.loginState.fetchStatus;
export const selectSid = (state) => state.loginState.sid;

export default loginSlice.reducer;