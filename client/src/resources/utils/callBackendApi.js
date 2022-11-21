import { createAsyncThunk } from "@reduxjs/toolkit";

const signUpApi = createAsyncThunk('signUpState/signUpUser', async (creds) => {
    const response = await fetch('http://localhost:8080/signup', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            "xsrf-token": creds.csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify(creds.signupCredentials)
    });
    return response.json();
});

const loginApi = createAsyncThunk('loginState/fetchUser', async (creds) => {
    const response = await fetch('http://localhost:8080/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            "xsrf-token": creds.csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify(creds.loginCredentials)
    });
    return response.json();
});

const logoutApi = createAsyncThunk('logoutState/endSession', async (creds) => {
    const response = await fetch('http://localhost:8080/logout', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            "xsrf-token": creds.csrfToken,
        },
        credentials: 'include',
        body: null
    });
    return response.json();
});

const getTodosApi = createAsyncThunk('todosState/getTodos', async (creds) => {
    const response = await fetch('http://localhost:8080/gettodos', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            "xsrf-token": creds.csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify(creds.getTodos)
    });
    return response.json();
});

const addTodoApi = createAsyncThunk('todoState/addTodo', async (creds) => {
    const response = await fetch('http://localhost:8080/addtodo', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            "xsrf-token": creds.csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify(creds.newTodo)
    });
    return response.json();
});

const deleteTodoApi = createAsyncThunk('todoState/deleteTodo', async (creds) => {
    const response = await fetch(`http://localhost:8080/deletetodo/${creds.todoId}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            "xsrf-token": creds.csrfToken,
        },
        credentials: 'include',
        body: null
    });
    return response.json();
});

const updateTodoApi = createAsyncThunk('todoState/updateTodo', async (creds) => {
    const response = await fetch(`http://localhost:8080/updatetodo/${creds.editTodo.id}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            "xsrf-token": creds.csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify({
            description: creds.editTodo.description,
            project: creds.editTodo.project,
            comments: creds.editTodo.comments,
            due_date: creds.editTodo.due_date,
            priority: creds.editTodo.priority,
            user_id: creds.editTodo.user_id,
            seen: creds.editTodo.seen
        })
    });
    return response.json();
});

export { signUpApi, loginApi, logoutApi, getTodosApi, addTodoApi, deleteTodoApi, updateTodoApi };