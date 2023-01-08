import { createSlice } from "@reduxjs/toolkit";
import { addTodoApi } from "../../resources/utils/callBackendApi";

export const addTodosSlice = createSlice({
    name: 'addTodos',
    initialState: {
        newTodo: {
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
        errorStatus: null
    },
    reducers: {
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
            // correct month input when user inserts one digit, e.g., 1 --> January instead of 01
            if (state.newTodo.dueMonth.length === 1) {
                state.newTodo.dueMonth = `0${state.newTodo.dueMonth}`;
            };
            // correct day input
            if (state.newTodo.dueDay.length === 1) {
                state.newTodo.dueDay = `0${state.newTodo.dueDay}`;
            };
            // correct hour input
            if (state.newTodo.dueHour.length === 1) {
                state.newTodo.dueHour = `0${state.newTodo.dueHour}`;
            };
            // correct minutes input
            if (state.newTodo.dueMinutes.length === 1) {
                state.newTodo.dueMinutes = `0${state.newTodo.dueMinutes}`;
            };

            state.newTodo.dueDate = `${state.newTodo.dueYear}${state.newTodo.dueMonth}${state.newTodo.dueDay} ${state.newTodo.dueHour}${state.newTodo.dueMinutes}00`;
        },

        handleReset: (state) => {
            state.newTodo = {
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
        .addCase(addTodoApi.rejected, (state, action) => {
            state.fetchStatus = 'failed';
            state.errorStatus = action.error.message;
        })
        .addCase(addTodoApi.pending, (state, action) => {
            state.fetchStatus = 'loading';
        })
        .addCase(addTodoApi.fulfilled, (state, action) => {
            state.fetchStatus = 'succeded';
            state.errorStatus = null;
        })
    }
});

export const { handleChange, handleDate, handleReset } = addTodosSlice.actions;

export const selectNewTodo = (state) => state.addTodos.newTodo;
export const selectFetchStatus = (state) => state.addTodos.fetchStatus;

export default addTodosSlice.reducer;
