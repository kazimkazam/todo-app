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
        errorStatus: null,
        searchTopic: '',
        searchResults: [],
    },
    reducers: {
        handleChange: (state, action) => {
            state[action.payload.target.name] = action.payload.target.value;
        },

        handleReset: (state) => {
            state.todos = [];
            state.inbox = [];
            state.today = [];
            state.upcoming = [];
            state.viewType = 'board';
            state.fetchStatus = 'idle';
            state.errorStatus = null;
            state.searchTopic = '';
            state.searchResults = [];
        },

        handleSearch: (state, action) => {
            state.searchResults = [];
            state.todos.filter(todo => {
                if (todo.description.includes(state.searchTopic) || todo.project.includes(state.searchTopic) || todo.comments.includes(state.searchTopic)) {
                    state.searchResults.push(todo);
                };
                return null;
            });
        },

        handleSearchReset: (state) => {
            state.searchTopic = '';
            state.searchResults = [];
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

export const { handleChange, handleReset, handleSearch, handleSearchReset } = todosSlice.actions;

export const selectTodos = (state) => state.todosState.todos;
export const selectInbox = (state) => state.todosState.inbox;
export const selectToday = (state) => state.todosState.today;
export const selectUpcoming = (state) => state.todosState.upcoming;
export const selectViewType = (state) => state.todosState.viewType;
export const selectSearchTopic = (state) => state.todosState.searchTopic;
export const selectSearchResults = (state) => state.todosState.searchResults;

export default todosSlice.reducer;
