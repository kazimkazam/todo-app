import { Provider } from 'react-redux';
import { store } from '../redux/store/store'
import { render, fireEvent, screen, waitFor, cleanup } from '@testing-library/react';
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

        waitFor(() => fireEvent.change(screen.queryByTestId('loginEmail'), { target: { value: 'troti@email.com' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('loginPassword'), { target: { value: 'Pass1234' } }));
        waitFor(() => fireEvent.click(screen.queryByTestId('loginSubmit')));
    });

    afterEach(() => {
        cleanup();
    });

    it('should load with initial state', async () => {
        waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        let searchResultsState = store.getState().todosState.searchResults;
        expect(searchResultsState).toEqual(initialState.searchResults);
    });

    it('should handle changes on input', async () => {
        // verify we are on inbox
        waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // fire change event on search field
        waitFor(() => fireEvent.change(screen.queryByTestId('searchInput'), { target: { value: 'Text that should be showing!' } }));

        // verify
        let searchResultsState = store.getState().todosState.searchResults;
        waitFor(() => expect(searchResultsState).toEqual('Text that should be showing!'));
    });
    
    it('should search for existent todo on enter keydown and find it', async () => {
        // verify we are on inbox
        waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // fire change event on search field
        waitFor(() => fireEvent.change(screen.queryByTestId('searchInput'), { target: { value: 'Text that should be showing!' } }));

        // verify
        let searchResultsState = store.getState().todosState.searchResults;
        waitFor(() => expect(searchResultsState).toEqual('Text that should be showing!'));

        // focus search field
        waitFor(() => fireEvent.focus(screen.queryByTestId('searchInput')));

        // fire event enter keydown and verify
        waitFor(() => fireEvent.keyDown(screen.queryByTestId('searchInput'), { key: 'Enter', code: 'Enter', keyCode: 13, charCode: 13 }));
        waitFor(() => expect(screen.findByText('Text that should be showing!')).toBeInTheDocument());
    });

    it('should search for nonexistent todo and not find it', async () => {
        // verify we are on inbox
        waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // fire change event on search field
        waitFor(() => fireEvent.change(screen.queryByTestId('searchInput'), { target: { value: 'potatos' } }));

        // verify
        let searchResultsState = store.getState().todosState.searchResults;
        waitFor(() => expect(searchResultsState).toEqual('potatos'));

        // focus search field
        waitFor(() => fireEvent.focus(screen.queryByTestId('searchInput')));

        // fire event enter keydown and verify
        waitFor(() => fireEvent.keyDown(screen.queryByTestId('searchInput'), { key: 'Enter', code: 'Enter', keyCode: 13, charCode: 13 }));
        waitFor(() => expect(screen.findByText('No todos related with potatos were found...')).toBeInTheDocument());
    });
});