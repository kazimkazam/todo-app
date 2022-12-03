import { createAsyncThunk } from "@reduxjs/toolkit";

const getCsrfToken = createAsyncThunk('csrfTokenState/getCsrfToken', async () => {
    // const response = await fetch('http://localhost:8080/getCsrfToken', {
    const response = await fetch('https://server-todo-app.glitch.me/getCsrfToken', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        credentials: "include",
    });
    return response.json();
});

export { getCsrfToken };