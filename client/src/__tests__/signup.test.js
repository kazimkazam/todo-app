import { Provider } from 'react-redux';
import { store } from '../redux/store/store'
import { render, fireEvent, screen, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App/App';

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

        waitFor(() => fireEvent.click(screen.queryByTestId('navigateToSignup')));
    });

    afterEach(() => {
        cleanup();
    });

    it('should start with initial state', async () => {
        // verify we are on signup page
        expect(screen.queryByTestId('signupEmail')).toBeInTheDocument();

        // verify initial state
        let signUpState = store.getState().signUpState;
        expect(signUpState).toEqual(initialState);
    });

    it('should handle input changes made by the user', () => {
        // verify we are on signup page
        expect(screen.queryByTestId('signupEmail')).toBeInTheDocument();

        // insert email and verify email state
        waitFor(() => fireEvent.change(screen.queryByTestId('signupEmail'), { target: { value: 'troti@email.com' } }));
        
        let signUpState = store.getState().signUpState;
        waitFor(() => expect(signUpState.email).toEqual('troti@email.com'));

        // insert password and verify password state
        waitFor(() => fireEvent.change(screen.queryByTestId('signupPassword'), { target: { value: 'Pass1234' } }));

        signUpState = store.getState().signUpState;
        waitFor(() => expect(signUpState.password).toEqual('Pass1234'));
    });

    it('should fail to sign up when user submits a wrong email', async () => {
        // verify we are on signup page
        expect(screen.queryByTestId('signupEmail')).toBeInTheDocument();

        // insert email and verify email state
        waitFor(() => fireEvent.change(screen.queryByTestId('signupEmail'), { target: { value: 'emaileil.com' } }));

        let signUpState = store.getState().signUpState;
        waitFor(() => expect(signUpState.email).toEqual('emaileil.com'));

        // insert password and verify password state
        waitFor(() => fireEvent.change(screen.queryByTestId('signupPassword'), { target: { value: 'Pass1234' } }));

        signUpState = store.getState().signUpState;
        waitFor(() => expect(signUpState.password).toEqual('Pass1234'));

        // fire submit and verify
        waitFor(() => fireEvent.click(screen.queryByTestId('signupSubmit')));
        
        waitFor(() => expect(screen.queryByTestId('signupEmail')).toBeInTheDocument());
    });

    it('should fail to sign up when user submits a wrong password', async () => {
        // verify we are on signup page
        expect(screen.queryByTestId('signupEmail')).toBeInTheDocument();

        // insert email and verify email state
        waitFor(() => fireEvent.change(screen.queryByTestId('signupEmail'), { target: { value: 'troti@email.com' } }));

        let signUpState = store.getState().signUpState;
        waitFor(() => expect(signUpState.email).toEqual('troti@email.com'));

        // insert password and verify password state
        waitFor(() => fireEvent.change(screen.queryByTestId('signupPassword'), { target: { value: 'Passss1234' } }));

        signUpState = store.getState().signUpState;
        waitFor(() => expect(signUpState.password).toEqual('Passss1234'));

        // fire submit and verify
        waitFor(() => fireEvent.click(screen.queryByTestId('signupSubmit')));
        
        waitFor(() => expect(screen.queryByTestId('signupEmail')).toBeInTheDocument());
    });

    it('should sign up user on submit if inputs are valid', async () => {
        // verify we are on signup page
        expect(screen.queryByTestId('signupEmail')).toBeInTheDocument();

        // insert email and verify email state
        waitFor(() => fireEvent.change(screen.queryByTestId('signupEmail'), { target: { value: 'troti@email.com' } }));

        let signUpState = store.getState().signUpState;
        waitFor(() => expect(signUpState.email).toBe('troti@email.com'));

        // insert password and verify password state
        waitFor(() => fireEvent.change(screen.queryByTestId('signupPassword'), { target: { value: 'Pass1234' } }));
        signUpState = store.getState().signUpState;
        waitFor(() => expect(signUpState.password).toBe('Pass1234'));

        // fire submit and verify
        fireEvent.click(screen.queryByTestId('signupSubmit'));
        waitFor(() => expect(screen.queryByTestId('loginEmail')).toBeInTheDocument());
    });

    it('should sign up user on enter keydown submission if inputs are valid', async () => {
        // verify we are on signup page
        expect(screen.queryByTestId('signupEmail')).toBeInTheDocument();
        
        // insert email and verify email state
        waitFor(() => fireEvent.change(screen.queryByTestId('signupEmail'), { target: { value: 'troti@email.com' } }));

        let signUpState = store.getState().signUpState;
        waitFor(() => expect(signUpState.email).toBe('troti@email.com'));

        // insert password and verify password state
        waitFor(() => fireEvent.change(screen.queryByTestId('signupPassword'), { target: { value: 'Pass1234' } }));
        signUpState = store.getState().signUpState;
        waitFor(() => expect(signUpState.password).toBe('Pass1234'));

        screen.queryByTestId('signupPassword').focus();
        waitFor(() => expect(screen.queryByTestId('signupPassword')).toHaveFocus());

        // fire submit and verify
        waitFor(() => fireEvent.keyDown(screen.queryByTestId('signupSubmit'), { key: 'Enter', code: 'Enter', keyCode: 13, charCode: 13 }));
        waitFor(() => expect(screen.queryByTestId('loginEmail')).toBeInTheDocument());
    });
});
