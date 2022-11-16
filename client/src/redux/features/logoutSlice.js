import { createSlice } from "@reduxjs/toolkit";
import { logoutApi } from "../../resources/utils/callBackendApi";

export const logoutSlice = createSlice({
    name: 'logoutState',
    initialState : {
        hasLoggedOut: false,
        fetchStatus: 'idle',
        errorStatus: null,
    },
    reducers: {
        resetLogoutState: (state) => {
            state.hasLoggedOut = false;
            state.fetchStatus = 'idle';
            state.errorStatus = null;
        }
    },
    extraReducers: builder => {
        builder
        .addCase(logoutApi.rejected, (state, action) => {
            state.fetchStatus = 'failed';
            state.errorStatus = action.error.message;
            state.hasLoggedOut = false;
        })
        .addCase(logoutApi.pending, (state, action) => {
            state.fetchStatus = 'loading';
        })
        .addCase(logoutApi.fulfilled, (state, action) => {
            state.errorStatus = null;
            state.fetchStatus = 'succeded';
            state.hasLoggedOut = true;
        })
    }
});

export const { resetLogoutState } = logoutSlice.actions;

// export const selectIsLoggedOut = (state) => state.logoutState.isLoggedOut;

export default logoutSlice.reducer;
