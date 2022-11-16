import { createSlice } from "@reduxjs/toolkit";
import { updateTodoApi } from "../../resources/utils/callBackendApi";

export const updateTodoSlice = createSlice({
    name: 'updateTodo',
    initialState: {
        newTodo: {
            id: null,
            description: '',
            project: '',
            comments: '',
            dueDay: '',
            dueMonth: '',
            dueYear: '',
            dueHour: '',
            dueMinutes: '',
            dueDate: '',
            priority: 3,
            userId: null,
            seen: false,
        },
        fetchStatus: 'idle',
        errorStatus: null,
    },
    reducers: {
        handleId: (state, action) => {
            state.newTodo.id = action.payload.target.name;
        },

        handleChange: (state, action) => {
            if (action.payload.target.name === 'priority') {
                switch (action.payload.target.value) {
                    case 'highPriority':
                        state.newTodo[action.payload.target.name] = 1;
                        break;
                    case 'mediumPriority':
                        state.newTodo[action.payload.target.name] = 2;
                        break;
                    case 'lowPriority':
                        state.newTodo[action.payload.target.name] = 3;
                        break;
                    default:
                        state.newTodo[action.payload.target.name] = 3;
                        break;
                };
            } else {
                state.newTodo[action.payload.target.name] = action.payload.target.value;
            };
        },

        handleDate: (state) => {
            state.newTodo.dueDate = `${state.newTodo.dueYear}${state.newTodo.dueMonth}${state.newTodo.dueDay} ${state.newTodo.dueHour}${state.newTodo.dueMinutes}00`;
        },

        handleReset: (state) => {
            state.newTodo = {
                id: null,
                description: '',
                project: '',
                comments: '',
                dueDay: '',
                dueMonth: '',
                dueYear: '',
                dueHour: '',
                dueMinutes: '',
                dueDate: '',
                priority: 3,
                userId: null,
                seen: false,
            };
            state.fetchStatus = 'idle';
            state.errorStatus = null;
        },
    },
    extraReducers: builder => {
        builder
        .addCase(updateTodoApi.rejected, (state, action) => {
            state.fetchStatus = 'failed';
            state.errorStatus = action.error.message;
        })
        .addCase(updateTodoApi.pending, (state, action) => {
            state.fetchStatus = 'loading';
        })
        .addCase(updateTodoApi.fulfilled, (state, action) => {
            state.fetchStatus = 'succeded';
            state.errorStatus = null;
        })
    }
});

export const { handleId, handleChange, handleDate, handleReset } = updateTodoSlice.actions;

export const selectFetchStatus = (state) => state.updateTodo.fetchStatus; 
export const selectNewTodo = (state) => state.updateTodo.newTodo; 

export default updateTodoSlice.reducer;
