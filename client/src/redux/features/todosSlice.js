import { createSlice } from "@reduxjs/toolkit";
import { getTodosApi } from "../../resources/utils/callBackendApi";

export const todosSlice = createSlice({
    name: 'todosState',
    initialState: {
        todos: [],
        inbox: [],
        today: [],
        upcoming: [],
        viewType: 'board',
        fetchStatus: 'idle',
        errorStatus: null
    },
    reducers: {
        handleChange: (state, action) => {
            state[action.payload.target.name] = action.payload.target.value;
        },
    },
    extraReducers: builder => {
        builder
        .addCase(getTodosApi.rejected, (state, action) => {
            state.fetchStatus = 'failed';
            state.errorStatus = action.error.message;
        })
        .addCase(getTodosApi.pending, (state, action) => {
            state.fetchStatus = 'loading';
        })
        .addCase(getTodosApi.fulfilled, (state, action) => {
            state.fetchStatus = 'succeded';
            state.todos = action.payload;
        })
    }
});

export const { handleChange } = todosSlice.actions;

export const selectTodos = (state) => state.todosState.todos;
export const selectInbox = (state) => state.todosState.inbox;
export const selectToday = (state) => state.todosState.today;
export const selectUpcoming = (state) => state.todosState.upcoming;
export const selectViewType = (state) => state.todosState.viewType;

export default todosSlice.reducer;
