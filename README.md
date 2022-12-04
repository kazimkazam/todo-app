## todo App

PERN (PostgreSQL, Express, React, and NodeJS) application using redux as state container, and Tailwind CSS.

The application is deployed and can be accessed through the link below:

## http://kazimkazam-todo-app.surge.sh

## Table of Contents

- Development;
- Deployment;
- How to Use;
- Screenshots;
- Tests;
- Future Work;
- Author;
- References;
- License.

## Development

This SPA was coded using React together with Redux. Express.js framework was used to handle the REST requests, and a PostgreSQL database makes the state between sessions persistent and stores authentication/authorization related data.

To handle the design of the application, Tailwind CSS was used. At the moment, the application presents a responsive design considering the following screen size (minimum-width) breakpoints:
- 1536px; 
- 1280px;
- 1024px.

The application is running on:

### Client:

- react 18.2.0;
- react-dom 18.2.0;
- react-redux 8.0.4;
- react-router-dom 6.4.2;
- redux 4.2.0;
- reduxjs/toolkit 1.8.6;
- Tailwind CSS.

### Server:

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

## Deployment

The application is deployed using the three following platforms:

- PostgresSQL database is being maintained at bit.io

- express server is running on glitch.com

- and the client is running using surge.sh

## How to Use

This SPA provides the user a todo manager.

The application consists of the following main components:

### Sign up

The user can create a new account that is saved in a database to be used to login later;

### Login

The user can login with an existing account created using the sign up page;

### Sidebar

The user can select which page he wants to access: Inbox, Today, Upcoming and All Todos. 
Another feature (not yet implemented) is to allow the user to create personal Projects and access them through this sidebar. These Projects would also appear in a list from where the user could choose the appropriate project when creating or editing a todo;

### Header

Contains the application logo, the search field, and add new todo, notifications, and logout buttons; 

### Notifications

The notifications icon informs the user if there are new todos and if there are any todos that he should pay attention that day. If so, by clicking on the notifications icon, the user will access the notifications window where such information will be available;

### Search field and search results

The search field allows to look up for any topic that the user may want to search. The results will show any todo with its description, associated comments or projects containing the topic that the user was trying to find. If no results are found, the page will inform the user of that;

### Inbox todos

The Inbox page showw new todos, i.e., todos that the user had not seen before;

### Today todos and Upcoming todos

The Today and Ppcoming pages show todos that have a due date of today or upcoming dates, respectively;

### All todos

The All Todos page shows every todo saved in the database related with the user;

### Add new todos

By clicking on the add todos icon in the header, a add todo window will pop up with the input fields that will allow the user to then submit a new todo;

### Edit todos

Each todo presents a edit icon which when clicked, a edit todo window will pop up with the input fields that will allow the user to then edit the todo. When the window opens, the input fields have the current variables state as placeholder text;

### Delete todos

Each todo presents a delete icon which when clicked, will delete the todo from the database;

### Acknowledgements and Terms of Use

In this section it is presented the acknowledgements, and the terms of use of the page.

## Screenshots

### Sign-up

#### Sign-up

![image](https://github.com/kazimkazam/todo-app/blob/master/screenshots/app/signup.png?raw=true)

#### Sign-up when user tries to submit invalid inputs

![image](https://github.com/kazimkazam/todo-app/blob/master/screenshots/app/signupWrong.png?raw=true)

### Login

#### Login

![image](https://github.com/kazimkazam/todo-app/blob/master/screenshots/app/login.png?raw=true)

#### Login when user tries to submit invalid inputs

![image](https://github.com/kazimkazam/todo-app/blob/master/screenshots/app/loginWrong.png?raw=true)

### Notifications

#### Notifications window and notifications icon with warning

![image](https://github.com/kazimkazam/todo-app/blob/master/screenshots/app/notificationsWithWarning.png?raw=true)

#### Notifications icon without warning

![image](https://github.com/kazimkazam/todo-app/blob/master/screenshots/app/notificationsWithoutWarning.png?raw=true)

### Add todos

#### Add todos window

![image](https://github.com/kazimkazam/todo-app/blob/master/screenshots/app/addTodoPopupWindow.png?raw=true)

#### Add todos empty fields on submission attempt warning

![image](https://github.com/kazimkazam/todo-app/blob/master/screenshots/app/addTodoPopupWithEmptyFieldsWarning.png?raw=true)

#### Add todos invalid inputs on submission attempt warning

![image](https://github.com/kazimkazam/todo-app/blob/master/screenshots/app/addTodoPopupWithInvalidInputsWarning.png?raw=true)

### Inbox

![image](https://github.com/kazimkazam/todo-app/blob/master/screenshots/app/inbox.png?raw=true)

### Today

![image](https://github.com/kazimkazam/todo-app/blob/master/screenshots/app/today.png?raw=true)

### Upcoming

![image](https://github.com/kazimkazam/todo-app/blob/master/screenshots/app/upcoming.png?raw=true)

### All Todos

![image](https://github.com/kazimkazam/todo-app/blob/master/screenshots/app/allTodos.png?raw=true)

### Todos list view mode (the other mode being board)

![image](https://github.com/kazimkazam/todo-app/blob/master/screenshots/app/todosListView.png?raw=true)

### Edit todos

#### Edit todos window

![image](https://github.com/kazimkazam/todo-app/blob/master/screenshots/app/editTodoWindow.png?raw=true)

#### Edit todos empty fields warning

![image](https://github.com/kazimkazam/todo-app/blob/master/screenshots/app/editTodoWindowWithEmptyFieldsWarning.png?raw=true)

#### Edit todos invalid inputs on submission warning

![image](https://github.com/kazimkazam/todo-app/blob/master/screenshots/app/editTodoWindowWithInvalidInputsWarning.png?raw=true)

### Search todos

#### Search field

![image](https://github.com/kazimkazam/todo-app/blob/master/screenshots/app/searchingTodosField.png?raw=true)

#### Search with results found

![image](https://github.com/kazimkazam/todo-app/blob/master/screenshots/app/searchingTodosResultsFound.png?raw=true)

#### Search with results not found

![image](https://github.com/kazimkazam/todo-app/blob/master/screenshots/app/searchingTodosResultsNotFound.png?raw=true)

### Acknowledgements

![image](https://github.com/kazimkazam/todo-app/blob/master/screenshots/app/acknowledgements.png?raw=true)

## Tests

Tests were performed on server and client sides separately.

### Server side

Tests were coducted using Mocha, Chai and Supertest.

More specifically,
- Mocha as the main testing framework;
- Chai was chosen to get some of its chain-capable TDD expect/should assert;
- Supertest was used to create REST requests made to the server in order to test out their responses.

![image](https://github.com/kazimkazam/todo-app/blob/master/screenshots/serverTests.png?raw=true)

### Client side

Tests were run using React Testing Library as the main testing framework, and Mock Service Worker to intercept requests made by the client and provide it with mocked responses similar to the ones received from the server.

This way, it was possible to test the client as a whole as recommended by React / Redux while also keeping client / server concerns separate.

![image](https://github.com/kazimkazam/todo-app/blob/master/screenshots/clientTests.png?raw=true)

## Future Work

The application has now a responsive design considering the 1536px, 1280px, and 1024px minimum-width breakpoints. In that perspective, future work will address this issue and make it responsive to smaller screen sizes comprising, e.g., phones.

## Author

@kazimkazam (monsieurkazimkazam@gmail.com).

## References

- All icons used - Flaticon: https://www.flaticon.com/

## Licence

MIT