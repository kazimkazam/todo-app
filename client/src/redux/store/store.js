import { configureStore } from '@reduxjs/toolkit';
import { loginSlice } from '../features/loginSlice';
import { logoutSlice } from '../features/logoutSlice';
import { signUpSlice } from '../features/signUpSlice';
import { todosSlice } from '../features/todosSlice';
import { addTodosSlice } from '../features/addTodosSlice';
import { updateTodoSlice } from '../features/updateTodoSlice';
import { deleteTodoSlice } from '../features/deleteTodosSlice';
import { csrfTokenSlice } from '../features/csrfTokenSlice';

const store = configureStore({
    reducer: {
        signUpState: signUpSlice.reducer,
        loginState: loginSlice.reducer,
        logoutState: logoutSlice.reducer,
        todosState: todosSlice.reducer,
        addTodos: addTodosSlice.reducer,
        updateTodo: updateTodoSlice.reducer,
        deleteTodo: deleteTodoSlice.reducer,
        csrfTokenState: csrfTokenSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            // ignoreState: true,
            ignoreActions: true,
        },
    }),
});

export { store };
