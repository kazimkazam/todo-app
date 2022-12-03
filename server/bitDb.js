const bcrypt = require('bcrypt');
require('dotenv').config();
const { validationResult } = require('express-validator');
const { Pool } = require('pg');

const salt = bcrypt.genSaltSync(10);

// bit.io database
const pool = new Pool({
    user: process.env.BIT_USER,
    host: process.env.BIT_HOST,
    database: process.env.BIT_DATABASE,
    password: process.env.BIT_PASS,
    port: 5432,
    ssl: true
});

const ensureAuthentication = (req, res, next) => {
    pool.query('SELECT * FROM session', (error, results) => {
        if (error) {
            throw error;
        };

        const session = results.rows[0];
        if (session.sess.loggedIn) {
            next();
        } else {
            res.status(403).json({ msg: "You're not authorized to view this page" });
        }
    });
};

const getTodos = (req, res, next) => {
    const { user_id } = req.body;

    pool.query('SELECT * FROM todos WHERE user_id=$1 ORDER BY due_date', [ user_id ], (error, results) => {
        if (error) {
            throw error;
        };
        res.status(200).json(results.rows);
        next();
    });
};

const addTodo = (req, res, next) => {
    const { description, project, comments, due_date, priority, user_id, seen } = req.body;

    pool.query('INSERT INTO todos (description, project, comments, due_date, priority, user_id, seen) VALUES ($1, $2, $3, $4, $5, $6, $7)', [ description, project, comments, due_date, priority, user_id, seen ] , (error, results) => {
        if (error) {
            throw error;
        };
        res.status(201).json('The todo was added to todo list.');
        next();
    });
};

const updateTodo = (req, res, next) => {
    const id = parseInt(req.params.id);
    const { description, project, comments, due_date, priority, user_id, seen } = req.body;

    pool.query('UPDATE todos SET description=$1, project=$2, comments=$3, due_date=$4, priority=$5, user_id=$6, seen=$7 WHERE id=$8', [ description, project, comments, due_date, priority, user_id, seen, id ], (error, results) => {
        if (error) {
            throw error;
        };
        res.status(200).send('The todo was updated.');
        next();
    });
};

const deleteTodo = (req, res, next) => {
    const id = parseInt(req.params.id);

    pool.query('DELETE FROM todos WHERE id=$1', [ id ], (error, results) => {
        if (error)  {
            throw error;
        };
        res.status(200).send(`Item id=${id} was deleted from the todo list.`);
        next();
    });
};

const signUp = (req, res, next) => {
    const { username, password, email } = req.body;

    // verify that email and password respect the rules
    const errors = validationResult(req);

    // console.log(errors);

    if (errors.isEmpty()) {
        pool.query('SELECT username FROM todo_users WHERE username = $1', [ username ], (error, results) => {
            if (results.rows.length === 0) {
                const hash = bcrypt.hashSync(password, salt);
                pool.query('INSERT INTO todo_users (email, pass, username) VALUES ($1, $2, $3)', [ email, hash, username ], (error, results) => {
                    if (error) {
                        throw error;
                    };
            
                    res.status(201).json({
                        token: process.env.SIGNUP_TOKEN
                    });
                    next();
                });
            } else {
                res.status(400).json('Username already in use!');
                next();
            };
        });
    } else {
        res.status(400).json({
            errors
        });
        next();
    };
};

const login = (req, res, next) => {
    const { email, password } = req.body;

    // verify that email and password respect the rules
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        pool.query('SELECT id, email, pass, username FROM todo_users WHERE email = $1', [ email ], async (error, results) => {
            const compare = await bcrypt.compare(password, results.rows[0]['pass']);
            if (results.rows.length !== 0) {
                if (compare) {
                    req.session.loggedIn = true;
                    req.session.user = {
                        username: results.rows[0]['username'],
                        userId: results.rows[0]['id']
                    };
                    // console.log(results.rows);
                    res.status(200).json({
                        token: process.env.LOGIN_TOKEN,
                        username: req.session.user.username,
                        userId: req.session.user.userId
                    });
                } else {
                    res.status(400).json('Incorrect e-mail and/or password!');
                }
            } else {
                res.status(404).json('Account not found!');
            };
            next();
        });
    } else {
        res.status(400).json({
            errors
        });
        next();
    };
};

const logout = (req, res, next) => {
    if (req.session) {
        console.log(req.session);
        req.session.loggedIn = false;
        req.session.destroy(err => {
            if (err) {
                res.status(400).send('Unable to logout!');
            } else {
                res.status(200).end('Logout successful.');
            };
        });
    } else {
        res.end();
    };
};

module.exports = {
    pool,
    ensureAuthentication,
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    signUp,
    login,
    logout
};
