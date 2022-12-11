import { Provider } from 'react-redux';
import { store } from '../redux/store/store'
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../App/App';

describe('tests related with Container Today', () => {
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

        fireEvent.change(screen.queryByTestId('loginEmail'), { target: { value: 'test@email.com' } });
        fireEvent.change(screen.queryByTestId('loginPassword'), { target: { value: 'Pass1234' } });
        fireEvent.click(screen.queryByTestId('loginSubmit'));

        userEvent.click(await screen.findByTestId('navigateToToday'));
    });

    afterEach(() => {
        // return to login for next test (odd behavior - test not cleaning up react tree in time...)
        fireEvent.click(screen.queryByTestId('logout'));
    });

    it('should load with initial state', async () => {
        let todosState = store.getState().todosState;
        expect(todosState).toEqual(initialState);

        await waitFor(() => expect(screen.queryByTestId('today')).toBeInTheDocument());
    });

    it('should load today todos after fetching', async () => {
        await waitFor(() => expect(screen.queryByTestId('today')).toBeInTheDocument());

        // update 
        await waitFor(() => expect(screen.queryByText('Get a pen today')).toBeInTheDocument());
        await waitFor(() => expect(screen.queryByText('Blue today')).toBeInTheDocument());
    });
});
