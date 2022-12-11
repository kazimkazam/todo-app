import { Provider } from 'react-redux';
import { store } from '../redux/store/store'
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App/App';
import { server } from '../mocks/server';
import { rest } from 'msw';

describe('tests related with Container SignUp', () => {
    const initialState = {
        username: '',
        email: '',
        password: '',
        isSignedUp: false,
        fetchStatus: 'idle',
        errorStatus: null
    };

    beforeEach(() => {
        render(
            <Provider store={ store } >
                <App />
            </Provider>
        );

        // verify we are on signup page
        fireEvent.click(screen.getByTestId('navigateToSignup'));
        expect(screen.queryByTestId('signupEmail')).toBeInTheDocument();
    });

    it('should start with initial state', () => {
        // verify initial state
        let signUpState = store.getState().signUpState;
        expect(signUpState).toEqual(initialState);
    });

    it('should handle input changes made by the user', () => {
        // insert username
        fireEvent.change(screen.queryByTestId('signupUsername'), { target: { value: 'test' } });

        // insert email and verify email state
        fireEvent.change(screen.queryByTestId('signupEmail'), { target: { value: 'test@email.com' } });

        // insert password and verify password state
        fireEvent.change(screen.queryByTestId('signupPassword'), { target: { value: 'Pass1234' } });

        let signUpState = store.getState().signUpState;
        expect(signUpState.username).toEqual('test');
        expect(signUpState.email).toEqual('test@email.com');
        expect(signUpState.password).toEqual('Pass1234');
    });

    it('should fail to sign up when user submits a wrong email', async () => {
        // override server in this request interception
        server.use(
            rest.post('https://server-todo-app.glitch.me/signup', (req, res, ctx) => {
                const response = res.once(
                    ctx.status(400, 'error')
                );
                return response;
            })
        );

        // insert username
        fireEvent.change(screen.queryByTestId('signupUsername'), { target: { value: 'test' } });

        // insert email and verify email state
        fireEvent.change(screen.queryByTestId('signupEmail'), { target: { value: 'test4email.com' } });

        // insert password and verify password state
        fireEvent.change(screen.queryByTestId('signupPassword'), { target: { value: 'Pass1234' } });

        let signUpState = store.getState().signUpState;
        expect(signUpState.username).toEqual('test');
        expect(signUpState.email).toEqual('test4email.com');
        expect(signUpState.password).toEqual('Pass1234');

        // fire submit and verify
        fireEvent.click(screen.queryByTestId('signupSubmit'));

        expect(await screen.findByText('Ooops... Wrong email and/or password! Please try again.')).toBeInTheDocument();
    });

    it('should fail to sign up when user submits a wrong password', async () => {
        // override server in this request interception
        server.use(
            rest.post('https://server-todo-app.glitch.me/signup', (req, res, ctx) => {
                const response = res.once(
                    ctx.status(400, 'error')
                );
                return response;
            })
        );

        // insert username
        fireEvent.change(screen.queryByTestId('signupUsername'), { target: { value: 'test' } });

        // insert email and verify email state
        fireEvent.change(screen.queryByTestId('signupEmail'), { target: { value: 'test@email.com' } });

        // insert password and verify password state
        fireEvent.change(screen.queryByTestId('signupPassword'), { target: { value: 'pass1234' } });

        let signUpState = store.getState().signUpState;
        expect(signUpState.username).toEqual('test');
        expect(signUpState.email).toEqual('test@email.com');
        expect(signUpState.password).toEqual('pass1234');

        // fire submit and verify
        fireEvent.click(screen.queryByTestId('signupSubmit'));
        
        expect(await screen.findByText('Ooops... Wrong email and/or password! Please try again.')).toBeInTheDocument();
    });

    it('should sign up user on submit if inputs are valid', async () => {
        // insert username
        fireEvent.change(screen.queryByTestId('signupUsername'), { target: { value: 'test' } });

        // insert email and verify email state
        fireEvent.change(screen.queryByTestId('signupEmail'), { target: { value: 'test@email.com' } });

        // insert password and verify password state
        fireEvent.change(screen.queryByTestId('signupPassword'), { target: { value: 'Pass1234' } });
        
        let signUpState = store.getState().signUpState;
        expect(signUpState.username).toEqual('test');
        expect(signUpState.email).toBe('test@email.com');
        expect(signUpState.password).toBe('Pass1234');

        // fire submit and verify
        fireEvent.click(screen.queryByTestId('signupSubmit'));
        await waitFor(() => expect(screen.queryByTestId('loginEmail')).toBeInTheDocument());
    });

    it('should sign up user on enter keydown submission if inputs are valid', async () => {
        // insert username
        fireEvent.change(screen.queryByTestId('signupUsername'), { target: { value: 'test' } });

        // insert email and verify email state
        fireEvent.change(screen.queryByTestId('signupEmail'), { target: { value: 'test@email.com' } });

        let signUpState = store.getState().signUpState;
        expect(signUpState.email).toBe('test@email.com');

        // insert password and verify password state
        fireEvent.change(screen.queryByTestId('signupPassword'), { target: { value: 'Pass1234' } });
        signUpState = store.getState().signUpState;
        expect(signUpState.password).toBe('Pass1234');

        // fire submit and verify
        fireEvent.focus(screen.queryByTestId('signupEmail'));
        fireEvent.keyDown(screen.queryByTestId('signupEmail'), { key: 'Enter', code: 'Enter', keyCode: 13, charCode: 13 });
        await waitFor(() => expect(screen.queryByTestId('loginEmail')).toBeInTheDocument());
    });
});
