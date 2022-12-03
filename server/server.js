const cors = require('cors');
const { check, validationResult } = require('express-validator');
require('dotenv').config();

const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

const helmet = require('helmet');

const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const csurf = require('csurf');

const port = process.env | 8080;

// const db = require('./db');
const db = require('./bitDb');

app.use(helmet());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());

app.use(session({
    store: new pgSession({
        pool: db.pool,
        tableName: 'session',
        // createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30000000,
        secure: false,
        httpOnly: true,
        sameSite: true,
    }
}));

// app.set('trust proxy', 1);

app.use(cookieParser());

const csurfProtection = csurf({
    cookie: true
});

app.use(csurfProtection);

app.get('/getCsrfToken', (req, res) => {
    res.send({ csrfToken: req.csrfToken() });
});

const signUpValidate = [
    // Check Username
    check('email', 'email Must Be an Email Address')
    .isEmail()
    .trim().escape().normalizeEmail(),

    // Check Password
    check('password')
    .isLength({ min: 8 })
    .withMessage('Password Must Be at Least 8 Characters')
    .matches('[0-9]').withMessage('Password Must Contain a Number')
    .matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter')
    .trim()
    .escape()
];

const loginValidate = [
    // Check Username
    check('email', 'email Must Be an Email Address')
    .isEmail()
    .trim().escape().normalizeEmail(),

    // Check Password
    check('password')
    .trim()
    .escape()
];

app.post('/signup', signUpValidate, db.signUp);

app.post('/login', loginValidate, db.login);

app.post('/gettodos', db.ensureAuthentication, db.getTodos);

app.post('/addtodo', db.ensureAuthentication, db.addTodo);

app.put('/updatetodo/:id', db.ensureAuthentication, db.updateTodo);

app.delete('/deletetodo/:id', db.ensureAuthentication, db.deleteTodo);

app.post('/logout', db.ensureAuthentication, db.logout);

app.listen(port, () => {
    console.log(`Server is up at ${port}`);
});

// ---------------------------------------------------

// if testing
// module.exports = {
//     app
// };