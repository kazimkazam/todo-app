import { rest } from 'msw';

export const handlers = [
    rest.get('http://localhost:8080/getCsrfToken', async (req, res, ctx) => {
        const response = res(
            ctx.status(200),
            ctx.delay(),
            ctx.json({
                csrfToken: 'elSecretoCsrfToken'
            })
        );
        return response;
    }),

    rest.post('http://localhost:8080/signup', async (req, res, ctx) => {
        const response = res.once(
            ctx.status(400),
            ctx.delay(),
            ctx.json({
                error: 'failed'
            })
        );
        return response;
    }),

    rest.post('http://localhost:8080/signup', async (req, res, ctx) => {
        const response = res.once(
            ctx.status(400),
            ctx.delay(),
            ctx.json({
                error: 'failed'
            })
        );
        return response;
    }),

    rest.post('http://localhost:8080/signup', async (req, res, ctx) => {
        const response = res(
            ctx.status(201),
            ctx.delay(),
            ctx.json({
                token: process.env.REACT_APP_SIGNUP_TOKEN
            })
        );
        return response;
    }),

    rest.post('http://localhost:8080/login', async (req, res, ctx) => {
        const response = res.once(
            ctx.status(400),
            ctx.delay(),
            ctx.json({
                error: 'failed'
            })
        );
        return response;
    }),

    rest.post('http://localhost:8080/login', async (req, res, ctx) => {
        const response = res.once(
            ctx.status(400),
            ctx.delay(),
            ctx.json({
                error: 'failed'
            })
        );
        return response;
    }),

    rest.post('http://localhost:8080/login', async (req, res, ctx) => {
        const response = res(
            ctx.status(200),
            ctx.delay(),
            ctx.json({
                token: process.env.REACT_APP_LOGIN_TOKEN,
                username: 'troti',
                userId: '21'
            })
        );
        return response;
    }),

    rest.post('http://localhost:8080/gettodos', async (req, res, ctx) => {
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
                    "due_date": "2022-11-29T15:00:00.000Z",
                    "priority": 3,
                    "user_id": 21,
                    "seen": false
                },
                {
                    "id": 14,
                    "description": "Get a pen",
                    "project": "Home",
                    "comments": "Blue",
                    "due_date": "2022-11-12T15:00:00.000Z",
                    "priority": 3,
                    "user_id": 21,
                    "seen": false
                }
            ])
        );
        return response;
    }),

    rest.put('http://localhost:8080/updatetodo/:id', async (req, res, ctx) => {
        const id = req.params.id;
        
        const response = res(
            ctx.status(200),
            ctx.delay(),
            ctx.json({
                "id": id,
                "description": "Get a pen",
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

    rest.post('http://localhost:8080/addtodo', async (req, res, ctx) => {
        const response = res(
            ctx.status(201),
            ctx.delay(),
            ctx.json('The todo was added.')
        );
        return response;
    }),

    rest.delete('http://localhost:8080/deletetodo/14', async (req, res, ctx) => {
        const response = res(
            ctx.status(201),
            ctx.delay(),
            ctx.json('The todo was deleted.')
        );
        return response;
    }),

    rest.post('http://localhost:8080/logout', async (req, res, ctx) => {
        const response = res(
            ctx.status(201),
            ctx.delay(),
            ctx.json('Logout successful.')
        );
        return response;
    }),
];