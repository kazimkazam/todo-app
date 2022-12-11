import { Provider } from 'react-redux';
import { store } from '../redux/store/store'
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../App/App';
import { server } from '../mocks/server';
import { rest } from 'msw';

describe('tests related with editing todos', () => {
    const initialState = {
        newTodo: {
            id: null,
            description: '',
            project: '',
            comments: '',
            dueDay: '',
            dueMonth: '',
            dueYear: '',
            dueHour: '',
            dueMinutes: '',
            dueDate: '',
            priority: 3,
            userId: null,
            seen: false,
        },
        fetchStatus: 'idle',
        errorStatus: null
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
        // verify we are on inbox
        await waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        let editTodosState = store.getState().updateTodo;
        expect(editTodosState).toEqual(initialState);
    });

    it('should edit todo on click submission and show it on upcoming todos', async () => {
        // override server interception on this gettodos request
        server.use(
            rest.post('https://server-todo-app.glitch.me/gettodos', async (req, res, ctx) => {
                const response = res.once(
                    ctx.status(200),
                    ctx.delay(),
                    ctx.json([
                        {
                            "id": 12,
                            "description": "Get a pen updated on upcoming window.",
                            "project": "Home todo was updated on upcoming window",
                            "comments": "Blue",
                            "due_date": "2022-12-25T15:00:00.000Z",
                            "priority": 3,
                            "user_id": 21,
                            "seen": true
                        },
                    ])
                );
                return response;
            }),
        );

        // verify we are on inbox
        await waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // navigate to upcoming window (to see the mock todo edited)
        userEvent.click(await screen.findByTestId('navigateToUpcoming'));

        await waitFor(() => expect(screen.queryByTestId('upcoming')).toBeInTheDocument());
        
        // click on edit todo
        userEvent.click(screen.queryByTestId('editTodo'));
        await waitFor(() => expect(screen.queryByTestId('editTodosWindow').className).toBe('absolute top-1/3 left-1/2 bg-[#0B5269] w-96 rounded z-50'));

        fireEvent.change(screen.queryByTestId('editTodoDescription'), { target: { value: 'asdasd' } });
        fireEvent.change(screen.queryByTestId('editTodoProject'), { target: { value: 'asdasd' } });
        fireEvent.change(screen.queryByTestId('editTodoComments'), { target: { value: 'asda' } });
        fireEvent.change(screen.queryByTestId('editTodoDueDay'), { target: { value: '11' } });
        fireEvent.change(screen.queryByTestId('editTodoDueMonth'), { target: { value: '12' } });
        fireEvent.change(screen.queryByTestId('editTodoDueYear'), { target: { value: '2022' } });
        fireEvent.change(screen.queryByTestId('editTodoDueHour'), { target: { value: '15' } });
        fireEvent.change(screen.queryByTestId('editTodoDueMinutes'), { target: { value: '34' } });

        // submit on click and window should close
        userEvent.click(screen.queryByTestId('submitEditTodo'));
        
        // verify
        await waitFor(() => expect(screen.queryByTestId('upcoming')).toBeInTheDocument());
        await waitFor(() => expect(screen.queryByText('Get a pen updated on upcoming window.')).toBeInTheDocument());
    });

    it('should edit todo on enter keydown submission and show it on upcoming todos', async () => {
        // override server interception on this gettodos request
        server.use(
            rest.post('https://server-todo-app.glitch.me/gettodos', async (req, res, ctx) => {
                const response = res.once(
                    ctx.status(200),
                    ctx.delay(),
                    ctx.json([
                        {
                            "id": 12,
                            "description": "Get a pen updated on upcoming window.",
                            "project": "Home todo was updated on upcoming window",
                            "comments": "Blue",
                            "due_date": "2022-12-25T15:00:00.000Z",
                            "priority": 3,
                            "user_id": 21,
                            "seen": true
                        },
                    ])
                );
                return response;
            }),
        );

        // verify we are on inbox
        await waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // navigate to upcoming window (to see the mock todo edited)
        userEvent.click(await screen.findByTestId('navigateToUpcoming'));

        await waitFor(() => expect(screen.queryByTestId('upcoming')).toBeInTheDocument());
        
        // click on edit todo
        userEvent.click(screen.queryByTestId('editTodo'));
        await waitFor(() => expect(screen.queryByTestId('editTodosWindow').className).toBe('absolute top-1/3 left-1/2 bg-[#0B5269] w-96 rounded z-50'));

        fireEvent.change(screen.queryByTestId('editTodoDescription'), { target: { value: 'asdasd' } });
        fireEvent.change(screen.queryByTestId('editTodoProject'), { target: { value: 'asdasd' } });
        fireEvent.change(screen.queryByTestId('editTodoComments'), { target: { value: 'asda' } });
        fireEvent.change(screen.queryByTestId('editTodoDueDay'), { target: { value: '11' } });
        fireEvent.change(screen.queryByTestId('editTodoDueMonth'), { target: { value: '12' } });
        fireEvent.change(screen.queryByTestId('editTodoDueYear'), { target: { value: '2022' } });
        fireEvent.change(screen.queryByTestId('editTodoDueHour'), { target: { value: '15' } });
        fireEvent.change(screen.queryByTestId('editTodoDueMinutes'), { target: { value: '34' } });

        // submit on enter keydown and window should close
        fireEvent.click(screen.queryByTestId('editTodoDueMinutes'));

        userEvent.type(screen.queryByTestId('editTodoDueMinutes'), '{enter}');

        await waitFor(() => expect(screen.queryByText('Get a pen updated on upcoming window.')).toBeInTheDocument());
    });

    it('should show warning when there are empty input fields', async () => {
        // verify we are on inbox
        await waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // navigate to upcoming window
        userEvent.click(await screen.findByTestId('navigateToUpcoming'));

        await waitFor(() => expect(screen.queryByTestId('upcoming')).toBeInTheDocument());

        // click on edit todo
        userEvent.click(screen.queryByTestId('editTodo'));
        await waitFor(() => expect(screen.queryByTestId('editTodosWindow').className).toBe('absolute top-1/3 left-1/2 bg-[#0B5269] w-96 rounded z-50'));

        // submit on click
        fireEvent.click(screen.queryByTestId('submitEditTodo'));

        // verify
        await waitFor(() => expect(screen.queryByTestId('editTodoWarning')).toBeInTheDocument());
    });

    it('should show warning when user tries to submit with invalid inputs', async () => {
        // verify we are on inbox
        await waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // navigate to upcoming window
        userEvent.click(await screen.findByTestId('navigateToUpcoming'));

        await waitFor(() => expect(screen.queryByTestId('upcoming')).toBeInTheDocument());

        // click on edit todo
        userEvent.click(screen.queryByTestId('editTodo'));
        await waitFor(() => expect(screen.queryByTestId('editTodosWindow').className).toBe('absolute top-1/3 left-1/2 bg-[#0B5269] w-96 rounded z-50'));

        // edit inputs
        fireEvent.change(screen.queryByTestId('editTodoDescription'), { target: { value: 'asdasd' } });
        fireEvent.change(screen.queryByTestId('editTodoProject'), { target: { value: 'asdasd' } });
        fireEvent.change(screen.queryByTestId('editTodoComments'), { target: { value: 'asda' } });
        fireEvent.change(screen.queryByTestId('editTodoDueDay'), { target: { value: '11' } });
        // invalid month input
        fireEvent.change(screen.queryByTestId('editTodoDueMonth'), { target: { value: '15' } });
        fireEvent.change(screen.queryByTestId('editTodoDueYear'), { target: { value: '2022' } });
        fireEvent.change(screen.queryByTestId('editTodoDueHour'), { target: { value: '15' } });
        fireEvent.change(screen.queryByTestId('editTodoDueMinutes'), { target: { value: '34' } });

        // submit on click
        fireEvent.click(screen.queryByTestId('submitEditTodo'));

        // verify
        await waitFor(() => expect(screen.queryByTestId('editTodoInputInvalidWarning')).toBeInTheDocument());
    });

    it('should close the window when user clicks to close', async () => {
        // verify we are on inbox
        await waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // navigate to upcoming window
        userEvent.click(await screen.findByTestId('navigateToUpcoming'));

        await waitFor(() => expect(screen.queryByTestId('upcoming')).toBeInTheDocument());

        // click on edit todo
        userEvent.click(screen.queryByTestId('editTodo'));
        await waitFor(() => expect(screen.queryByTestId('editTodosWindow').className).toBe('absolute top-1/3 left-1/2 bg-[#0B5269] w-96 rounded z-50'));

        // close window
        userEvent.click(screen.queryByTestId('editTodosWindowClose'));
        await waitFor(() => expect(screen.queryByTestId('editTodosWindow').className).toBe('absolute top-1/3 left-1/2 bg-[#0B5269] w-96 rounded -z-50'));
    });

    it('should close the window when user uses escape key (with no input field focused)', async () => {
        // verify we are on inbox
        await waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // navigate to upcoming window
        userEvent.click(await screen.findByTestId('navigateToUpcoming'));

        await waitFor(() => expect(screen.queryByTestId('upcoming')).toBeInTheDocument());

        // click on edit todo
        userEvent.click(screen.queryByTestId('editTodo'));

        // close window
        userEvent.click(screen.queryByTestId('editTodosWindow'));
        fireEvent.keyDown(screen.queryByTestId('editTodosWindow'), { key: 'Escape', code: 'Escape', keyCode: 27, charCode: 27 });
        await waitFor(() => expect(screen.queryByTestId('editTodosWindow').className).toBe('absolute top-1/3 left-1/2 bg-[#0B5269] w-96 rounded -z-50'));
    });
});