import { Provider } from 'react-redux';
import { store } from '../redux/store/store'
import { render, fireEvent, screen, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App/App';

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
    beforeEach(() => {
        render(
            <Provider store={ store } >
                <App />
            </Provider>
        );
    });

    afterEach(() => {
        cleanup();
    });

    it('should start with initial state', async () => {
        // verify we are on login page
        expect(screen.queryByTestId('loginEmail')).toBeInTheDocument();

        // verify initial state
        let loginState = store.getState().loginState;
        expect(loginState).toEqual(initialState);
    });

    it('should handle input changes made by the user', async () => {
        // verify we are on login page
        expect(screen.queryByTestId('loginEmail')).toBeInTheDocument();

        // insert email and verify state
        waitFor(() => fireEvent.change(screen.queryByTestId('loginEmail'), { target: { value: 'troti@email.com' } }));
        
        let loginState = store.getState().loginState;
        waitFor(() => expect(loginState.email).toEqual('troti@email.com'));

        // insert password and verify state
        waitFor(() => fireEvent.change(screen.queryByTestId('loginPassword'), { target: { value: 'Pass1234' } }));

        loginState = store.getState().loginState;
        waitFor(() => expect(loginState.password).toEqual('Pass1234'));
    });

    it('should fail to login when user submits a wrong email', async () => {
        // verify we are on login page
        expect(screen.queryByTestId('loginEmail')).toBeInTheDocument();

        // insert email and verify state
        waitFor(() => fireEvent.change(screen.queryByTestId('loginEmail'), { target: { value: 'emaileil.com' } }));
        
        let loginState = store.getState().loginState;
        waitFor(() => expect(loginState.email).toEqual('emaileil.com'));

        // insert password and verify state
        waitFor(() => fireEvent.change(screen.queryByTestId('loginPassword'), { target: { value: 'Pass1234' } }));

        loginState = store.getState().loginState;
        waitFor(() => expect(loginState.password).toEqual('Pass1234'));

        // submit and verify we are still on login page and warning of wrong email or password has appeared
        waitFor(() => fireEvent.click(screen.queryByTestId('loginSubmit')));
        
        waitFor(() => expect(screen.queryByTestId('loginEmail')).toBeInTheDocument());
        waitFor(() => expect(screen.queryByTestId('loginWarning')).toBeInTheDocument());
    });

    it('should fail to login when user submits a wrong password', async () => {
        // verify we are on login page
        expect(screen.queryByTestId('loginEmail')).toBeInTheDocument();

        // insert email and verify state
        waitFor(() => fireEvent.change(screen.queryByTestId('loginEmail'), { target: { value: 'troti@email.com' } }));

        let loginState = store.getState().loginState;
        expect(loginState.email).toBe('troti@email.com');

        // insert password and verify state
        waitFor(() => fireEvent.change(screen.queryByTestId('loginPassword'), { target: { value: 'Passss1234' } }));

        loginState = store.getState().loginState;
        waitFor(() => expect(loginState.password).toEqual('Passss1234'));

        // submit and verify we are still on login page and warning of wrong email or password has appeared
        waitFor(() => fireEvent.click(screen.queryByTestId('loginSubmit')));
        
        waitFor(() => expect(screen.queryByTestId('loginEmail')).toBeInTheDocument());
        waitFor(() => expect(screen.queryByTestId('loginWarning')).toBeInTheDocument());
    });

    it('should log in user on submit if user is valid', async () => {
        // verify we are on login page
        expect(screen.queryByTestId('loginEmail')).toBeInTheDocument();

        // insert email and verify state
        waitFor(() => fireEvent.change(screen.queryByTestId('loginEmail'), { target: { value: 'troti@email.com' } }));

        let loginState = store.getState().loginState;
        expect(loginState.email).toBe('troti@email.com');

        // insert password and verify state
        waitFor(() => fireEvent.change(screen.queryByTestId('loginPassword'), { target: { value: 'Pass1234' } }));

        loginState = store.getState().loginState;
        waitFor(() => expect(loginState.password).toEqual('Pass1234'));

        // submit and verify we navigated to inbox
        waitFor(() => fireEvent.click(screen.queryByTestId('loginSubmit')));

        waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());
    });

    it('should log in user on submit if user is valid on enter keydown', async () => {
        // verify we are on login page
        expect(screen.queryByTestId('loginEmail')).toBeInTheDocument();

        // insert email and verify state
        waitFor(() => fireEvent.change(screen.queryByTestId('loginEmail'), { target: { value: 'troti@email.com' } }));

        let loginState = store.getState().loginState;
        expect(loginState.email).toBe('troti@email.com');

        // insert password and verify state
        waitFor(() => fireEvent.change(screen.queryByTestId('loginPassword'), { target: { value: 'Pass1234' } }));

        loginState = store.getState().loginState;
        waitFor(() => expect(loginState.password).toEqual('Pass1234'));

        // submit and verify we navigated to inbox
        waitFor(() => fireEvent.focus(screen.queryByTestId('loginEmail')));
        waitFor(() => fireEvent.keyDown(screen.queryByTestId('loginEmail'), { key: 'Enter', code: 'Enter', keyCode: 13, charCode: 13 }));
        waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());
    });
});
