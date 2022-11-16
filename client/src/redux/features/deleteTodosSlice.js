import { createSlice } from "@reduxjs/toolkit";
import { deleteTodoApi } from "../../resources/utils/callBackendApi";

export const deleteTodoSlice = createSlice({
    name: 'deleteTodo',
    initialState: {
        fetchStatus: 'idle',
        errorStatus: null,
    },
    reducers: {
        handleReset: (state) => {
            state.fetchStatus = 'idle';
            state.errorStatus = null;
        },
    },
    extraReducers: builder => {
        builder
        .addCase(deleteTodoApi.rejected, (state, action) => {
            state.fetchStatus = 'failed';
            state.errorStatus = action.error.message;
        })
        .addCase(deleteTodoApi.pending, (state, action) => {
            state.fetchStatus = 'loading';
        })
        .addCase(deleteTodoApi.fulfilled, (state, action) => {
            state.fetchStatus = 'succeded';
            state.errorStatus = null;
        })
    }
});

export const { handleReset } = deleteTodoSlice.actions;

export const selectFetchStatus = (state) => state.deleteTodo.fetchStatus; 

export default deleteTodoSlice.reducer;
