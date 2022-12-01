## todo App

PERN (PostgreSQL, Express, React, and NodeJS) application using redux as state container, and Tailwind CSS.

## Table of Contents

- Development;
- How to use;
- Screenshots;
- Tests;
- Author;
- References;
- License.

## Development

This SPA was coded using React together with Redux. Express.js framework was used to handle the REST requests, and a PostgreSQL database makes the state between sessions persistent and stores authentication/authorization related data.

To handle the design of the application, Tailwind CSS was used.

The application is running on:

Client:
- react 18.2.0;
- react-dom 18.2.0;
- react-redux 8.0.4;
- react-router-dom 6.4.2;
- redux 4.2.0;
- reduxjs/toolkit 1.8.6;
- Tailwind CSS.

Server:
- express 4.18.2;
- express-session 1.17.3;
- express-validator: 6.14.2;
- bcrypt 5.1.0;
- cors 2.8.5;
- cookie-parser 1.4.6;
- csurf 1.11.0 (needs to be replaced, csurf recently deprecated);
- helmet 6.0.0;
- pg 8.8.0;
- pg-promise 10.12.1;
- connect-pg-simple 7.0.0.


## How to Use



## Screenshots


## Tests
Tests were performed on server and client sides separately.

### Server side
Tests were coducted using Mocha, Chai and Supertest.

More specifically,
- Mocha as the main testing framework;
- Chai was chosen to get some of its chain-capable TDD expect/should assert;
- Supertest was used to create REST requests made to the server in order to test out their responses.

![image](https://github.com/kazimkazam/password-generator/blob/e6fd38453687bd4647b6ec251ea96e1a6d8bac2e/screenshots/tests.png)

### Client side
Tests were run using Reacc Testing Library as the main testing framework, and Mock Service Worker to intercept requests made by the client and provide it with mocked responses similar to the ones received from the server.

This way, it was possible to test the client as a whole as recommended by React / Redux.

![image](https://github.com/kazimkazam/todo-app/blob/master/screenshots/clientTests.png?raw=true)

## Author

@kazimkazam (monsieurkazimkazam@gmail.com).

## References

- All icons used - Flaticon: https://www.flaticon.com/

## Licence

MIT