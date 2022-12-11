import { Provider } from 'react-redux';
import { store } from '../redux/store/store'
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../App/App';
import { server } from '../mocks/server';
import { rest } from 'msw';

var today = new Date().getDate();

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

        fireEvent.change(screen.queryByTestId('loginEmail'), { target: { value: 'test@email.com' } });
        fireEvent.change(screen.queryByTestId('loginPassword'), { target: { value: 'Pass1234' } });
        fireEvent.click(screen.queryByTestId('loginSubmit'));
    });

    afterEach(() => {
        // return to login for next test (odd behavior - test not cleaning up react tree in time...)
        fireEvent.click(screen.queryByTestId('logout'));
    });

    it('should load with initial state and welcome message', async () => {
        // verify we are on inbox
        await waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        let todosState = store.getState().todosState;
        expect(todosState).toEqual(initialState);

        // we should see the welcome message
        expect(await screen.findByTestId('welcomeMessage')).toBeInTheDocument();
    });

    it('should load inbox todos after fetching', async () => {
        // verify we are on inbox
        await waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // expect todos to be fetched
        expect(await screen.findByText('Get a pen today')).toBeInTheDocument();
        expect(await screen.findByText('Blue today')).toBeInTheDocument();

        const expectedState = {
            todos: [
                {
                    id: 12,
                    description: 'Get a pen',
                    project: 'Home',
                    comments: 'Text that should be showing!',
                    due_date: '2022-12-25T15:00:00.000Z',
                    priority: 3,
                    user_id: 21,
                    seen: false
                },
                {
                    id: 13,
                    description: 'Get a pen today',
                    project: 'Home',
                    comments: 'Blue today',
                    due_date: `2022-12-${today}T15:00:00.000Z`,
                    priority: 3,
                    user_id: 21,
                    seen: false
                },
                {
                    id: 14,
                    description: 'Get a pen',
                    project: 'Home',
                    comments: 'Blue todo past',
                    due_date: '2022-11-12T15:00:00.000Z',
                    priority: 3,
                    user_id: 21,
                    seen: false
                }
            ],
            inbox: [],
            today: [],
            upcoming: [],
            viewType: 'board',
            fetchStatus: 'succeded',
            errorStatus: null,
            searchTopic: '',
            searchResults: []
        };

        let todosState = store.getState().todosState;
        expect(todosState).toEqual(expectedState);
    });

    it('should show empty after the user changes tab and returns to inbox', async () => {
        // verify we are on inbox
        await waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // expect todos to be fetched
        expect(await screen.findByText('Get a pen today')).toBeInTheDocument();
        expect(await screen.findByText('Blue today')).toBeInTheDocument();

        // navigate to other page, verify page change, and come back
        userEvent.click(await screen.findByTestId('navigateToToday'));

        await waitFor(() => expect(screen.queryByTestId('today')).toBeInTheDocument());

        userEvent.click(await screen.findByTestId('navigateToInbox'));

        // override server interception on this gettodos request
        server.use(
            rest.post('https://server-todo-app.glitch.me/gettodos', async (req, res, ctx) => {
                const response = res.once(
                    ctx.status(200),
                    ctx.delay(),
                    ctx.json([
                        {
                            "id": 12,
                            "description": "Get a pen",
                            "project": "Home",
                            "comments": "Text that should be showing!",
                            "due_date": "2022-12-25T15:00:00.000Z",
                            "priority": 3,
                            "user_id": 21,
                            "seen": true
                        },
                        {
                            "id": 13,
                            "description": "Get a pen today",
                            "project": "Home",
                            "comments": "Blue today",
                            "due_date": `2022-12-${today}T15:00:00.000Z`,
                            "priority": 3,
                            "user_id": 21,
                            "seen": true
                        },
                        {
                            "id": 14,
                            "description": "Get a pen",
                            "project": "Home",
                            "comments": "Blue",
                            "due_date": "2022-11-12T15:00:00.000Z",
                            "priority": 3,
                            "user_id": 21,
                            "seen": true
                        }
                    ])
                );
                return response;
            }),
        );

        await waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // verify inbox todo is not showing anymore
        await waitFor(() => expect(screen.queryByText('Get a pen')).not.toBeInTheDocument());

        const expectedState = {
            todos: [
                {
                    id: 12,
                    description: 'Get a pen',
                    project: 'Home',
                    comments: 'Text that should be showing!',
                    due_date: '2022-12-25T15:00:00.000Z',
                    priority: 3,
                    user_id: 21,
                    seen: true
                },
                {
                    id: 13,
                    description: 'Get a pen today',
                    project: 'Home',
                    comments: 'Blue today',
                    due_date: `2022-12-${today}T15:00:00.000Z`,
                    priority: 3,
                    user_id: 21,
                    seen: true
                },
                {
                    id: 14,
                    description: 'Get a pen',
                    project: 'Home',
                    comments: 'Blue',
                    due_date: '2022-11-12T15:00:00.000Z',
                    priority: 3,
                    user_id: 21,
                    seen: true
                }
            ],
            inbox: [],
            today: [],
            upcoming: [],
            viewType: 'board',
            fetchStatus: 'succeded',
            errorStatus: null,
            searchTopic: '',
            searchResults: []
        };

        let todosState = store.getState().todosState;
        expect(todosState).toEqual(expectedState);
    });
});
