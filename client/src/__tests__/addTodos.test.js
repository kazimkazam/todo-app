import { Provider } from 'react-redux';
import { store } from '../redux/store/store'
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../App/App';
import { server } from '../mocks/server';
import { rest } from 'msw';

describe('tests related with adding new todos', () => {
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

        let todosState = store.getState().todosState;
        expect(todosState).toEqual(initialState);
    });
    
    it('should add new todo on click, close the window, and show new todo on Inbox', async () => {
        // override server interception on this gettodos request
        server.use(
            rest.post('https://server-todo-app.glitch.me/gettodos', async (req, res, ctx) => {
                const response = res.once(
                    ctx.status(200),
                    ctx.delay(),
                    ctx.json([
                        {
                            "id": 18,
                            "description": "Todo added now during test.",
                            "project": "Testing adding todo",
                            "comments": "Success!",
                            "due_date": "2022-12-25T15:00:00.000Z",
                            "priority": 3,
                            "user_id": 21,
                            "seen": false
                        },
                    ])
                );
                return response;
            }),
        );

        await waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // open window
        fireEvent.click(screen.queryByTestId('addNewTodo'));

        await waitFor(() => expect(screen.queryByTestId('addTodosWindow').className).toBe('absolute top-20 right-36 bg-[#0B5269] w-96 rounded z-50'));

        // edit input fields 
        fireEvent.change(screen.queryByTestId('addDescription'), { target: { value: 'asdasd' } });
        fireEvent.change(screen.queryByTestId('addProject'), { target: { value: 'asdasd' } });
        fireEvent.change(screen.queryByTestId('addComments'), { target: { value: 'asda' } });
        fireEvent.change(screen.queryByTestId('addDueDay'), { target: { value: '11' } });
        fireEvent.change(screen.queryByTestId('addDueMonth'), { target: { value: '12' } });
        fireEvent.change(screen.queryByTestId('addDueYear'), { target: { value: '2023' } });
        fireEvent.change(screen.queryByTestId('addDueHour'), { target: { value: '15' } });
        fireEvent.change(screen.queryByTestId('addDueMinutes'), { target: { value: '34' } });
        
        // submit add todo
        userEvent.click(screen.queryByTestId('submitAddTodo'));

        await waitFor(() => expect(screen.queryByText('Todo added now during test.')).toBeInTheDocument());
    });

    it('should add new todo on enter keydown, close the window, and show new todo on Inbox', async () => {
        // override server interception on this gettodos request
        server.use(
            rest.post('https://server-todo-app.glitch.me/gettodos', async (req, res, ctx) => {
                const response = res.once(
                    ctx.status(200),
                    ctx.delay(),
                    ctx.json([
                        {
                            "id": 18,
                            "description": "Todo added now during test.",
                            "project": "Testing adding todo",
                            "comments": "Success!",
                            "due_date": "2022-12-25T15:00:00.000Z",
                            "priority": 3,
                            "user_id": 21,
                            "seen": false
                        },
                    ])
                );
                return response;
            }),
        );

        await waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // open window
        fireEvent.click(screen.queryByTestId('addNewTodo'));

        await waitFor(() => expect(screen.queryByTestId('addTodosWindow').className).toBe('absolute top-20 right-36 bg-[#0B5269] w-96 rounded z-50'));

        // edit input fields 
        fireEvent.change(screen.queryByTestId('addDescription'), { target: { value: 'asdasd' } });
        fireEvent.change(screen.queryByTestId('addProject'), { target: { value: 'asdasd' } });
        fireEvent.change(screen.queryByTestId('addComments'), { target: { value: 'asda' } });
        fireEvent.change(screen.queryByTestId('addDueDay'), { target: { value: '11' } });
        fireEvent.change(screen.queryByTestId('addDueMonth'), { target: { value: '12' } });
        fireEvent.change(screen.queryByTestId('addDueYear'), { target: { value: '2023' } });
        fireEvent.change(screen.queryByTestId('addDueHour'), { target: { value: '15' } });
        fireEvent.change(screen.queryByTestId('addDueMinutes'), { target: { value: '34' } });

        // submit add todo
        userEvent.click(screen.queryByTestId('addTodosWindow'));

        fireEvent.keyDown(screen.queryByTestId('addTodosWindow'), { key: 'Enter', code: 'Enter', keyCode: 13, charCode: 13 });

        await waitFor(() => expect(screen.queryByText('Todo added now during test.')).toBeInTheDocument());
    });

    it('should show warning when user tries to submit with empty input fields', async () => {
        await waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // open window
        fireEvent.click(screen.queryByTestId('addNewTodo'));

        await waitFor(() => expect(screen.queryByTestId('addTodosWindow').className).toBe('absolute top-20 right-36 bg-[#0B5269] w-96 rounded z-50'));
        
        // submit add todo
        fireEvent.click(screen.queryByTestId('submitAddTodo'));

        // warning pops up
        await waitFor(() => expect(screen.queryByTestId('addTodosWindowWarning')).toBeInTheDocument());
    });

    it('should show warning when user tries to submit with invalid inputs', async () => {
        await waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // open window
        fireEvent.click(screen.queryByTestId('addNewTodo'));

        await waitFor(() => expect(screen.queryByTestId('addTodosWindow').className).toBe('absolute top-20 right-36 bg-[#0B5269] w-96 rounded z-50'));
        
        // edit input fields 
        fireEvent.change(screen.queryByTestId('addDescription'), { target: { value: 'asdasd' } });
        fireEvent.change(screen.queryByTestId('addProject'), { target: { value: 'asdasd' } });
        fireEvent.change(screen.queryByTestId('addComments'), { target: { value: 'asda' } });
        fireEvent.change(screen.queryByTestId('addDueDay'), { target: { value: '111' } });
        fireEvent.change(screen.queryByTestId('addDueMonth'), { target: { value: '12' } });
        fireEvent.change(screen.queryByTestId('addDueYear'), { target: { value: '2023' } });
        fireEvent.change(screen.queryByTestId('addDueHour'), { target: { value: '15' } });
        fireEvent.change(screen.queryByTestId('addDueMinutes'), { target: { value: '34' } });

        // submit add todo
        fireEvent.click(screen.queryByTestId('submitAddTodo'));

        // warning pops up
        await waitFor(() => expect(screen.queryByTestId('addTodoInputInvalidWarning')).toBeInTheDocument());
    });

    it('should close the window when user clicks to close', async () => {
        await waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // open window
        fireEvent.click(screen.queryByTestId('addNewTodo'));

        await waitFor(() => expect(screen.queryByTestId('addTodosWindow').className).toBe('absolute top-20 right-36 bg-[#0B5269] w-96 rounded z-50'));

        // close window
        userEvent.click(screen.queryByTestId('addTodosWindowClose'));
        await waitFor(() => expect(screen.queryByTestId('addTodosWindow').className).toBe('absolute top-20 right-36 bg-[#0B5269] w-96 rounded -z-50'));
    });

    it('should close the window when user uses escape key (with no input field focused)', async () => {
        await waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // open window
        fireEvent.click(screen.queryByTestId('addNewTodo'));

        await waitFor(() => expect(screen.queryByTestId('addTodosWindow').className).toBe('absolute top-20 right-36 bg-[#0B5269] w-96 rounded z-50'));

        // close window
        fireEvent.click(screen.queryByTestId('addTodosWindow'));
        fireEvent.keyDown(screen.queryByTestId('addTodosWindow'), { key: 'Escape', code: 'Escape', keyCode: 27, charCode: 27 });
        await waitFor(() => expect(screen.queryByTestId('addTodosWindow').className).toBe('absolute top-20 right-36 bg-[#0B5269] w-96 rounded -z-50'));
    });
});