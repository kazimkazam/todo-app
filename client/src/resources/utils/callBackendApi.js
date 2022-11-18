import { createAsyncThunk } from "@reduxjs/toolkit";

const signUpApi = createAsyncThunk('signUpState/signUpUser', async (credentials) => {
    const response = await fetch('http://localhost:8080/signup', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(credentials)
    });
    return response.json();
});

const loginApi = createAsyncThunk('loginState/fetchUser', async (credentials) => {
    const response = await fetch('http://localhost:8080/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(credentials)
    });
    return response.json();
});

const logoutApi = createAsyncThunk('logoutState/endSession', async () => {
    const response = await fetch('http://localhost:8080/logout', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: null
    });
    return response.json();
});

const getTodosApi = createAsyncThunk('todosState/getTodos', async (credentials) => {
    const response = await fetch('http://localhost:8080/gettodos', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(credentials)
    });
    return response.json();
});

const addTodoApi = createAsyncThunk('todoState/addTodo', async (todo) => {
    const response = await fetch('http://localhost:8080/addtodo', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(todo)
    });
    return response.json();
});

const deleteTodoApi = createAsyncThunk('todoState/deleteTodo', async (todoId) => {
    const response = await fetch(`http://localhost:8080/deletetodo/${todoId}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: null
    });
    return response.json();
});

const updateTodoApi = createAsyncThunk('todoState/updateTodo', async (todo) => {
    const response = await fetch(`http://localhost:8080/updatetodo/${todo.id}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            description: todo.description,
            project: todo.project,
            comments: todo.comments,
            due_date: todo.due_date,
            priority: todo.priority,
            user_id: todo.user_id,
            seen: todo.seen
        })
    });
    return response.json();
});

export { signUpApi, loginApi, logoutApi, getTodosApi, addTodoApi, deleteTodoApi, updateTodoApi };