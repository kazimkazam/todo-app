import { rest } from 'msw';

export const handlers = [
    rest.get('https://server-todo-app.glitch.me/getCsrfToken', (req, res, ctx) => {
        const response = res(
            ctx.status(200),
            ctx.delay(),
            ctx.json({
                csrfToken: 'elSecretoCsrfToken'
            })
        );
        return response;
    }),

    rest.post('https://server-todo-app.glitch.me/signup', (req, res, ctx) => {
        const response = res(
            ctx.status(201),
            ctx.delay(),
            ctx.json({
                token: process.env.REACT_APP_SIGNUP_TOKEN
            })
        );
        return response;
    }),

    rest.post('https://server-todo-app.glitch.me/login', (req, res, ctx) => {
        const response = res(
            ctx.status(200),
            ctx.delay(),
            ctx.json({
                token: process.env.REACT_APP_LOGIN_TOKEN,
                username: 'test',
                userId: '21'
            })
        );
        return response;
    }),

    rest.post('https://server-todo-app.glitch.me/gettodos', (req, res, ctx) => {
        const today = new Date().getDate();

        const response = res(
            ctx.status(200),
            ctx.delay(),
            ctx.json([
                {
                    "id": 12,
                    "description": "Get a pen",
                    "project": "Home",
                    "comments": "Text that should be showing!",
                    "due_date": "2022-12-25T15:00:00.000Z",
                    "priority": 3,
                    "user_id": 21,
                    "seen": false
                },
                {
                    "id": 13,
                    "description": "Get a pen today",
                    "project": "Home",
                    "comments": "Blue today",
                    "due_date": `2022-12-${today}T15:00:00.000Z`,
                    "priority": 3,
                    "user_id": 21,
                    "seen": false
                },
                {
                    "id": 14,
                    "description": "Get a pen",
                    "project": "Home",
                    "comments": "Blue todo past",
                    "due_date": "2022-11-12T15:00:00.000Z",
                    "priority": 3,
                    "user_id": 21,
                    "seen": false
                }
            ])
        );
        return response;
    }),

    rest.put('https://server-todo-app.glitch.me/updatetodo/:id', (req, res, ctx) => {
        const id = req.params.id;
        
        const response = res(
            ctx.status(200),
            ctx.delay(),
            ctx.json({
                "id": id,
                "description": "Get a pen updated on upcoming window.",
                "project": "Home todo was updated on upcoming window",
                "comments": "Blue",
                "due_date": "2022-12-25T15:00:00.000Z",
                "priority": 3,
                "user_id": 21,
                "seen": true
            })
        );
        return response;
    }),

    rest.post('https://server-todo-app.glitch.me/addtodo', (req, res, ctx) => {
        const response = res(
            ctx.status(201),
            ctx.delay(),
            ctx.json('The todo was added.')
        );
        return response;
    }),

    rest.delete('https://server-todo-app.glitch.me/deletetodo/14', (req, res, ctx) => {
        const response = res(
            ctx.status(201),
            ctx.delay(),
            ctx.json('The todo was deleted.')
        );
        return response;
    }),

    rest.post('https://server-todo-app.glitch.me/logout', (req, res, ctx) => {
        const response = res(
            ctx.status(201),
            ctx.delay(),
            ctx.json('Logout successful.')
        );
        return response;
    }),
];