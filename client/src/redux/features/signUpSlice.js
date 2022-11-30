import { createSlice } from "@reduxjs/toolkit";
import { signUpApi } from "../../resources/utils/callBackendApi";
// import env from "react-dotenv";

export const signUpSlice = createSlice({
    name: 'signUpState',
    initialState: {
        username: '',
        email: '',
        password: '',
        isSignedUp: false,
        fetchStatus: 'idle',
        errorStatus: null
    },
    reducers: {
        handleChange: (state, action) => {
            state[action.payload.target.name] = action.payload.target.value;
        },

        handleReset: (state) => {
            state.username = '';
            state.email = '';
            state.password = '';
            state.isSignedUp = false;
            state.fetchStatus = 'idle';
            state.errorStatus = null;
        },
    },
    extraReducers: builder => {
        builder
        .addCase(signUpApi.rejected, (state, action) => {
            state.fetchStatus = 'failed';
            state.errorStatus = action.error.message;
            state.isSignedUp = false;
        })
        .addCase(signUpApi.pending, (state, action) => {
            state.fetchStatus = 'loading';
        })
        .addCase(signUpApi.fulfilled, (state, action) => {
            state.fetchStatus = 'succeded';
            if (action.payload.token === process.env.REACT_APP_SIGNUP_TOKEN) {
                state.isSignedUp = true;
                state.password = '';
            };
        })
    }
});

export const { handleChange, handleReset } = signUpSlice.actions;

export const selectUsername = (state) => state.signUpState.username;
export const selectEmail = (state) => state.signUpState.email;
export const selectPassword = (state) => state.signUpState.password;
export const selectIsSignedUp = (state) => state.signUpState.isSignedUp;
export const selectFetchStatus = (state) => state.signUpState.fetchStatus;

export default signUpSlice.reducer;
