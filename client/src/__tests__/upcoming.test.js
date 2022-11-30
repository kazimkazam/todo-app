import { Provider } from 'react-redux';
import { store } from '../redux/store/store'
import { render, fireEvent, screen, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App/App';

describe('tests related with Container Upcoming', () => {
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

    beforeEach(async () => {
        render(
            <Provider store={ store } >
                <App />
            </Provider>
        );

        fireEvent.change(screen.queryByTestId('loginEmail'), { target: { value: 'troti@email.com' } });
        fireEvent.change(screen.queryByTestId('loginPassword'), { target: { value: 'Pass1234' } });
        fireEvent.click(screen.queryByTestId('loginSubmit'));

        waitFor(() => fireEvent.click(screen.queryByTestId('navigateToUpcoming')));
    });

    afterEach(() => {
        cleanup();
    });

    it('should load with initial state', async () => {
        waitFor(() => expect(screen.queryByTestId('upcoming')).toBeInTheDocument());

        let todosState = store.getState().todosState;
        expect(todosState).toEqual(initialState);
    });

    it('should load upcoming todos after fetching', async () => {
        waitFor(() => expect(screen.queryByTestId('upcoming')).toBeInTheDocument());

        waitFor(() => expect(screen.findByText('Get a pen')).toBeInTheDocument());
        
        waitFor(() => expect(screen.findByText('Text that should be showing!')).toBeInTheDocument());
    });
});