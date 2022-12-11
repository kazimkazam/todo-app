import { Provider } from 'react-redux';
import { store } from '../redux/store/store'
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App/App';
import { server } from '../mocks/server';
import { rest } from 'msw';

describe('tests related with Container Login', () => {
    const initialState = {
        email: '',
        password: '',
        username: '',
        userId: null,
        sid: '',
        isLoggedIn: false,
        fetchStatus: 'idle',
        errorStatus: null,
    };

    // cleanUp
    beforeEach(async () => {
        render(
            <Provider store={ store } >
                <App />
            </Provider>
        );

        // verify we are on login page
        await waitFor(() => expect(screen.queryByTestId('loginEmail')).toBeInTheDocument());
    });

    it('should start with initial state', () => {
        // verify initial state
        let loginState = store.getState().loginState;
        expect(loginState).toEqual(initialState);
    });

    it('should handle input changes made by the user', () => {
        // insert email and verify state
        fireEvent.change(screen.queryByTestId('loginEmail'), { target: { value: 'test@email.com' } });
        
        let loginState = store.getState().loginState;
        expect(loginState.email).toEqual('test@email.com');

        // insert password and verify state
        fireEvent.change(screen.queryByTestId('loginPassword'), { target: { value: 'Pass1234' } });

        loginState = store.getState().loginState;
        expect(loginState.password).toEqual('Pass1234');
    });

    it('should fail to login when user submits a wrong email', async () => {
        // override server in this request interception
        server.use(
            rest.post('https://server-todo-app.glitch.me/login', async (req, res, ctx) => {
                const response = res.once(
                    ctx.status(400, 'error')
                );
                return response;
            }),
        );

        // insert email and verify state
        fireEvent.change(screen.queryByTestId('loginEmail'), { target: { value: 'test4email.com' } });
        
        let loginState = store.getState().loginState;
        expect(loginState.email).toEqual('test4email.com');

        // insert password and verify state
        fireEvent.change(screen.queryByTestId('loginPassword'), { target: { value: 'Pass1234' } });

        loginState = store.getState().loginState;
        expect(loginState.password).toEqual('Pass1234');

        // submit and verify we are still on login page and warning of wrong email or password has appeared
        fireEvent.click(screen.queryByTestId('loginSubmit'));
        
        await waitFor(() => expect(screen.queryByTestId('loginEmail')).toBeInTheDocument());
        await waitFor(() => expect(screen.queryByTestId('loginWarning')).toBeInTheDocument());
    });

    it('should fail to login when user submits a wrong password', async () => {
        // override server in this request interception
        server.use(
            rest.post('https://server-todo-app.glitch.me/login', async (req, res, ctx) => {
                const response = res.once(
                    ctx.status(400, 'error')
                );
                return response;
            }),
        );

        // insert email and verify state
        fireEvent.change(screen.queryByTestId('loginEmail'), { target: { value: 'test@email.com' } });

        let loginState = store.getState().loginState;
        expect(loginState.email).toBe('test@email.com');

        // insert password and verify state
        fireEvent.change(screen.queryByTestId('loginPassword'), { target: { value: 'pass1234' } });

        loginState = store.getState().loginState;
        expect(loginState.password).toEqual('pass1234');

        // submit and verify we are still on login page and warning of wrong email or password has appeared
        fireEvent.click(screen.queryByTestId('loginSubmit'));
        
        await waitFor(() => expect(screen.queryByTestId('loginEmail')).toBeInTheDocument());
        await waitFor(() => expect(screen.queryByTestId('loginWarning')).toBeInTheDocument());
    });

    it('should log in user on submit if user is valid', async () => {
        // insert email and verify state
        fireEvent.change(screen.queryByTestId('loginEmail'), { target: { value: 'test@email.com' } });

        let loginState = store.getState().loginState;
        expect(loginState.email).toBe('test@email.com');

        // insert password and verify state
        fireEvent.change(screen.queryByTestId('loginPassword'), { target: { value: 'Pass1234' } });

        loginState = store.getState().loginState;
        expect(loginState.password).toEqual('Pass1234');

        // submit and verify we navigated to inbox
        fireEvent.click(screen.queryByTestId('loginSubmit'));

        await waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // return no login for next test (odd behavior - test not cleaning up
        fireEvent.click(screen.queryByTestId('logout'));
    });

    it('should log in user on submit if user is valid on enter keydown', async () => {
        // insert email and verify state
        fireEvent.change(screen.queryByTestId('loginEmail'), { target: { value: 'test@email.com' } });

        let loginState = store.getState().loginState;
        expect(loginState.email).toBe('test@email.com');

        // insert password and verify state
        fireEvent.change(screen.queryByTestId('loginPassword'), { target: { value: 'Pass1234' } });

        loginState = store.getState().loginState;
        expect(loginState.password).toEqual('Pass1234');

        // submit and verify we navigated to inbox
        fireEvent.focus(screen.queryByTestId('loginEmail'));
        fireEvent.keyDown(screen.queryByTestId('loginEmail'), { key: 'Enter', code: 'Enter', keyCode: 13, charCode: 13 });
        await waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());
    });
});
