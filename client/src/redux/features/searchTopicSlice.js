import { createSlice } from "@reduxjs/toolkit";

export const searchTopicSlice = createSlice({
    name: 'searchTopic',
    initialState: {
        topic: '',
        resultTodos: [],
    },
    reducers: {
        handleSearch: (state, action) => {
            state.topic = action.payload.target.value;

            
        },

        handleReset: (state) => {
            state.topic = '';
            state.resultTodos = [];
        }
    }
});

export const { handleSearch, handleReset } = searchTopicSlice.actions;

export const selectTopic = (state) => state.searchTopic.topic;

export default searchTopicSlice.reducer;