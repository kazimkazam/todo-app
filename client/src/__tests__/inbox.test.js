import { Provider } from 'react-redux';
import { store } from '../redux/store/store'
import { render, fireEvent, screen, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App/App';

describe('tests related with Container Inbox', () => {
    const initialState = {
        todos: [],
        inbox: [],
        today: [],
        upcoming: [],
        viewType: 'board',
        fetchStatus: 'idle',
        errorStatus: null,
        searchTopic: '',
        searchResults: [],
    };

    // cleanUp and login to navigate to inbox
    beforeEach(() => {
        render(
            <Provider store={ store } >
                <App />
            </Provider>
        );

        waitFor(() => fireEvent.change(screen.queryByTestId('loginEmail'), { target: { value: 'troti@email.com' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('loginPassword'), { target: { value: 'Pass1234' } }));
        waitFor(() => fireEvent.click(screen.queryByTestId('loginSubmit')));
    });

    afterEach(() => {
        cleanup();
    });

    it('should load with initial state', async () => {
        // verify we are on inbox
        waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        let todosState = store.getState().todosState;
        expect(todosState).toEqual(initialState);
    });

    it('should load inbox todos after fetching', async () => {
        // verify we are on inbox
        waitFor(() => expect(screen.findByTestId('inbox')).toBeInTheDocument());

        waitFor(() => expect(screen.findByText('Get a pen today')).toBeInTheDocument());
        waitFor(() => expect(screen.findByText('Blue today')).toBeInTheDocument());
    });

    it('should show empty after the user changes tab and returns to inbox', async () => {
        // verify we are on inbox
        waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // navigate to other page, verify page change, and come back
        waitFor(() => fireEvent.click(screen.queryByTestId('navigateToToday')));

        waitFor(() => expect(screen.queryByTestId('today')).toBeInTheDocument());

        waitFor(() => fireEvent.click(screen.queryByTestId('navigateToInbox')));

        waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // verify inbox todo is not showing anymore
        waitFor(() => expect(screen.findByText('Get a pen')).not.toBeInTheDocument());
    });
});
