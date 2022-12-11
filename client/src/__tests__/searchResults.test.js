import { Provider } from 'react-redux';
import { store } from '../redux/store/store'
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../App/App';

describe('tests related with searching todos', () => {
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

        fireEvent.change(screen.queryByTestId('loginEmail'), { target: { value: 'test@email.com' } });
        fireEvent.change(screen.queryByTestId('loginPassword'), { target: { value: 'Pass1234' } });
        fireEvent.click(screen.queryByTestId('loginSubmit'));
    });

    afterEach(() => {
        // return to login for next test (odd behavior - test not cleaning up react tree in time...)
        fireEvent.click(screen.queryByTestId('logout'));
    });

    it('should load with initial state', async () => {
        await waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        let searchResultsState = store.getState().todosState.searchResults;
        expect(searchResultsState).toEqual(initialState.searchResults);
    });

    it('should handle changes on input', async () => {
        // verify we are on inbox
        await waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // fire change event on search field
        fireEvent.change(screen.queryByTestId('searchInput'), { target: { value: 'Text that should be showing!' } });

        // verify
        let searchResultsTopic = store.getState().todosState.searchTopic;
        await waitFor(() => expect(searchResultsTopic).toEqual('Text that should be showing!'));
    });
    
    it('should search for existent todo on enter keydown and find it', async () => {
        // verify we are on inbox
        await waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // fire change event on search field
        fireEvent.change(screen.queryByTestId('searchInput'), { target: { value: 'Text that should be showing!' } });

        // focus search field
        fireEvent.click(screen.queryByTestId('searchInput'));

        // fire event enter keydown and verify
        await waitFor(() => userEvent.type(screen.queryByTestId('searchInput'), '{enter}'));
        await waitFor(() => expect(screen.queryByText('Text that should be showing!')).toBeInTheDocument());
    });

    it('should search for nonexistent todo and not find it', async () => {
        // verify we are on inbox
        await waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // fire change event on search field
        fireEvent.change(screen.queryByTestId('searchInput'), { target: { value: 'potatos' } });

        // verify
        let searchResultsTopic = store.getState().todosState.searchTopic;
        await waitFor(() => expect(searchResultsTopic).toEqual('potatos'));

        // focus search field
        fireEvent.click(screen.queryByTestId('searchInput'));

        // fire event enter keydown and verify
        await waitFor(() => userEvent.type(screen.queryByTestId('searchInput'), '{enter}'));
        await waitFor(() => expect(screen.queryByText('No todos related with potatos were found...')).toBeInTheDocument());
    });
});