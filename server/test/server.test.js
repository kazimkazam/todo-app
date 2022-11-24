const expect = require("chai").expect;
const request = require("supertest");
const server = require('../server').app;

describe('tests related with sign up', () => {
    it('should return response status 201 if successful', async () => {
        const signupCredentials = {
            'username': 'test1',
            'email': 'test1@email.com',
            'password': 'Pass1234'
        };

        const response = await request(server)
        .post('/signup')
        .set('Accept', 'application/json')
        .set('Content-Type','application/json')
        .send(signupCredentials);
        
        expect(response.status).to.equal(201);
    });

    it('should return signup token if successful', async () => {
        const signupCredentials = {
            'username': 'test2',
            'email': 'test2@email.com',
            'password': 'Pass1234'
        };

        const response = await request(server)
        .post('/signup')
        .set('Accept', 'application/json')
        .set('Content-Type','application/json')
        .send(signupCredentials);

        expect(response._body.token.length).to.equal(15);
    });

    it('should return response status 400 if user already exists', async () => {
        const signupCredentials = {
            'username': 'test2',
            'email': 'test2@email.com',
            'password': 'Pass1234'
        };

        const response = await request(server)
        .post('/signup')
        .set('Accept', 'application/json')
        .set('Content-Type','application/json')
        .send(signupCredentials);

        expect(response.status).to.equal(400);
        expect(response.text).to.equal('"Username already in use!"');
    });

    it('should return response status 400 if request is unsuccessful and return user input errors', async () => {
        const signupCredentials = {
            'username': 'test2',
            'email': 'test2com',
            'password': 'pass12'
        };

        const response = await request(server)
        .post('/signup')
        .set('Accept', 'application/json')
        .set('Content-Type','application/json')
        .send(signupCredentials);

        expect(response.status).to.equal(400);
        expect(response._body.errors.errors[0].msg).to.equal('email Must Be an Email Address');
        expect(response._body.errors.errors[1].msg).to.equal('Password Must Be at Least 8 Characters');
        expect(response._body.errors.errors[2].msg).to.equal('Password Must Contain an Uppercase Letter');
    });
});

describe('tests related with login', () => {
    it('should return response status 200 if successful', async () => {
        const loginCredentials = {
            'email': 'test2@email.com',
            'password': 'Pass1234'
        };

        const response = await request(server)
        .post('/login')
        .set('Accept', 'application/json')
        .set('Content-Type','application/json')
        .send(loginCredentials);

        expect(response.status).to.equal(200);
    });

    it('should return object with login token, username, and user ID if request is successful', async () => {
        const loginCredentials = {
            'email': 'test2@email.com',
            'password': 'Pass1234'
        };

        const response = await request(server)
        .post('/login')
        .set('Accept', 'application/json')
        .set('Content-Type','application/json')
        .send(loginCredentials);
        
        expect(response._body).to.have.property('token');
        expect(response._body).to.have.property('username');
        expect(response._body).to.have.property('userId');
    });

    it('should return response status 400 if request is unsuccessful because user provided the wrong password', async () => {
        const loginCredentials = {
            'email': 'test2@email.com',
            'password': 'Pass12345'
        };

        const response = await request(server)
        .post('/login')
        .set('Accept', 'application/json')
        .set('Content-Type','application/json')
        .send(loginCredentials);

        expect(response.status).to.equal(400);
        expect(response.text).to.equal('"Incorrect e-mail and/or password!"');
    });

    it('should return response status 400 if request is unsuccessful and return user input errors', async () => {
        const loginCredentials = {
            'email': 'test2email.com',
            'password': 'pass123'
        };

        const response = await request(server)
        .post('/login')
        .set('Accept', 'application/json')
        .set('Content-Type','application/json')
        .send(loginCredentials);

        expect(response.status).to.equal(400);
        expect(response._body.errors.errors[0].msg).to.equal('email Must Be an Email Address');
    });
});

describe('tests related with get todos request', () => {
    let userId;
    beforeEach(async () => {
        const loginCredentials = {
            'email': 'troti@email.com',
            'password': 'Pass1234'
        };

        const response = await request(server)
        .post('/login')
        .set('Accept', 'application/json')
        .set('Content-Type','application/json')
        .send(loginCredentials);

        userId = response._body.userId;
    });
    
    it('should return response status 200 if successful', async () => {
        const response = await request(server)
        .post('/gettodos')
        .set('Accept', 'application/json')
        .set('Content-Type','application/json')
        .send({'user_id': userId});

        expect(response.status).to.equal(200);
    });

    it('should return object with all todos from the respective user if request is successful', async () => {
        const response = await request(server)
        .post('/gettodos')
        .set('Accept', 'application/json')
        .set('Content-Type','application/json')
        .send({'user_id': userId});

        expect(response._body[0]).to.have.property('id');
        expect(response._body[0]).to.have.property('description');
        expect(response._body[0]).to.have.property('project');
        expect(response._body[0]).to.have.property('comments');
        expect(response._body[0]).to.have.property('due_date');
        expect(response._body[0]).to.have.property('seen');
        expect(response._body[0]).to.have.property('user_id');
    });
});

describe('tests related with add new todo requests', () => {
    let userId;
    beforeEach(async () => {
        const loginCredentials = {
            'email': 'troti@email.com',
            'password': 'Pass1234'
        };

        const response = await request(server)
        .post('/login')
        .set('Accept', 'application/json')
        .set('Content-Type','application/json')
        .send(loginCredentials);

        userId = response._body.userId;
    });
    
    it('should return response status 201 if successful', async () => {
        const newTodo = {
            "description": "testing",
            "project": "testing server",
            "comments": "important",
            "due_date": "20221126 143000",
            "priority": "1",
            "user_id": userId,
            "seen": "false"
        };

        const response = await request(server)
        .post('/addtodo')
        .set('Accept', 'application/json')
        .set('Content-Type','application/json')
        .send(newTodo);

        expect(response.status).to.equal(201);
        expect(response.text).to.equal('"The todo was added to todo list."');
    });
});

describe('tests related with updating todos', () => {
    let userId;
    beforeEach(async () => {
        const loginCredentials = {
            'email': 'troti@email.com',
            'password': 'Pass1234'
        };

        const response = await request(server)
        .post('/login')
        .set('Accept', 'application/json')
        .set('Content-Type','application/json')
        .send(loginCredentials);

        userId = response._body.userId;
    });

    it('should return response status 200 if successful', async () =>{
        const updateTodo = {
            "description": "go to supermarket",
            "project": "house",
            "comments": "get 2 lemons instead of 1",
            "due_date": "20221126 143000",
            "priority": "1",
            "user_id": userId,
            "seen": "false"
        };

        const response = await request(server)
        .put('/updatetodo/8')
        .set('Accept', 'application/json')
        .set('Content-Type','application/json')
        .send(updateTodo);

        expect(response.status).to.equal(200);
        expect(response.text).to.equal('The todo was updated.');
    });
});

describe('tests related with requests made to delete todos', () => {
    let userId;
    beforeEach(async () => {
        const loginCredentials = {
            'email': 'troti@email.com',
            'password': 'Pass1234'
        };

        const response = await request(server)
        .post('/login')
        .set('Accept', 'application/json')
        .set('Content-Type','application/json')
        .send(loginCredentials);

        userId = response._body.userId;
    });

    it('should return response status 200 if successful', async () => {
        const response = await request(server)
        .delete('/deletetodo/89')
        .set('Accept', 'application/json')
        .set('Content-Type','application/json');

        expect(response.status).to.equal(200);
        expect(response.text).to.equal('Item id=89 was deleted from the todo list.');
    });
});

describe('tests related with logout requests', () => {
    let userId;
    beforeEach(async () => {
        const loginCredentials = {
            'email': 'troti@email.com',
            'password': 'Pass1234'
        };

        const response = await request(server)
        .post('/login')
        .set('Accept', 'application/json')
        .set('Content-Type','application/json')
        .send(loginCredentials);

        userId = response._body.userId;
    });

    it('should return response status 200 if successful', async () => {
        const response = await request(server)
        .post('/logout')
        .set('Accept', 'application/json')
        .set('Content-Type','application/json');

        expect(response.status).to.equal(200);
        expect(response.text).to.equal('Logout successful.');
    });
});
