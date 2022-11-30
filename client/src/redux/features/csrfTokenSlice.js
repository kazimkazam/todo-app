import { createSlice } from "@reduxjs/toolkit";
import { getCsrfToken } from "../../resources/utils/getCsrfToken";

export const csrfTokenSlice = createSlice({
    name: 'csrfTokenState',
    initialState: {
        csrfToken: null,
        fetchStatus: 'idle',
        errorStatus: null,
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
        .addCase(getCsrfToken.rejected, (state,action) => {
            state.fetchStatus = 'failed';
            state.errorStatus = action.error.message;
        })
        .addCase(getCsrfToken.pending, (state,action) => {
            state.fetchStatus = 'loading';
        })
        .addCase(getCsrfToken.fulfilled, (state,action) => {
            state.fetchStatus = 'succeded';
            state.errorStatus = null;
            state.csrfToken = action.payload.csrfToken;
        })
    }
});

export const selectCsrfToken = (state) => state.csrfTokenState.csrfToken;

export default csrfTokenSlice.reducer;