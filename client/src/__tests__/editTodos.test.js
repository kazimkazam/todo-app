import { Provider } from 'react-redux';
import { store } from '../redux/store/store'
import { render, fireEvent, screen, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App/App';

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

        let editTodosState = store.getState().updateTodo;
        expect(editTodosState).toEqual(initialState);
    });

    it('should edit todo on click submission and show it on upcoming todos', async () => {
        // verify we are on inbox
        waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // navigate to upcoming window (to see the mock todo edited)
        waitFor(() => fireEvent.click(screen.queryByTestId('navigateToUpcoming')));

        waitFor(() => expect(screen.queryByTestId('upcoming')).toBeInTheDocument());
        
        // click on edit todo
        waitFor(() => fireEvent.click(screen.queryByTestId('editTodo')));

        waitFor(() => fireEvent.change(screen.queryByTestId('editTodoDescription'), { target: { value: 'asdasd' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('editTodoProject'), { target: { value: 'asdasd' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('editTodoComments'), { target: { value: 'asda' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('editTodoDueDay'), { target: { value: '11' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('editTodoDueMonth'), { target: { value: '12' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('editTodoDueYear'), { target: { value: '2022' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('editTodoDueHour'), { target: { value: '15' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('editTodoDueMinutes'), { target: { value: '34' } }));

        // submit on click
        waitFor(() => fireEvent.click(screen.queryByTestId('submitEditTodo')));

        // verify
        waitFor(() => expect(screen.findByText('Home todo was updated on upcoming window')).toBeInTheDocument());
    });

    it('should edit todo on enter keydown submission and show it on upcoming todos', async () => {
        // verify we are on inbox
        waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // navigate to upcoming window (to see the mock todo edited)
        waitFor(() => fireEvent.click(screen.queryByTestId('navigateToUpcoming')));

        waitFor(() => expect(screen.queryByTestId('upcoming')).toBeInTheDocument());

        // click on edit todo
        waitFor(() => fireEvent.click(screen.queryByTestId('editTodo')));

        // edit inputs
        waitFor(() => fireEvent.change(screen.queryByTestId('editTodoDescription'), { target: { value: 'asdasd' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('editTodoProject'), { target: { value: 'asdasd' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('editTodoComments'), { target: { value: 'asda' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('editTodoDueDay'), { target: { value: '11' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('editTodoDueMonth'), { target: { value: '12' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('editTodoDueYear'), { target: { value: '2022' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('editTodoDueHour'), { target: { value: '15' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('editTodoDueMinutes'), { target: { value: '34' } }));

        // submit on enter keydown
        let editTodosWindow = screen.queryByTestId('editTodosWindow');
        waitFor(() => fireEvent.focus(editTodosWindow));

        waitFor(() => fireEvent.keyDown(editTodosWindow, { key: 'Enter', code: 'Enter', keyCode: 13, charCode: 13 }));

        waitFor(() => expect(screen.findByText('Home todo was updated on upcoming window')).toBeInTheDocument());
    });

    it('should show warning when there are empty input fields', async () => {
        // verify we are on inbox
        waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // navigate to upcoming window (to see the mock todo edited)
        waitFor(() => fireEvent.click(screen.queryByTestId('navigateToUpcoming')));

        waitFor(() => expect(screen.queryByTestId('upcoming')).toBeInTheDocument());

        // submit on click
        waitFor(() => fireEvent.click(screen.queryByTestId('submitEditTodo')));

        // verify
        waitFor(() => expect(screen.queryByTestId('editTodoWarning')).toBeInTheDocument());
    });

    it('should show warning when user tries to submit with invalid inputs', async () => {
        // verify we are on inbox
        waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // navigate to upcoming window (to see the mock todo edited)
        waitFor(() => fireEvent.click(screen.queryByTestId('navigateToUpcoming')));

        waitFor(() => expect(screen.queryByTestId('upcoming')).toBeInTheDocument());

        // edit inputs
        waitFor(() => fireEvent.change(screen.queryByTestId('editTodoDescription'), { target: { value: 'asdasd' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('editTodoProject'), { target: { value: 'asdasd' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('editTodoComments'), { target: { value: 'asda' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('editTodoDueDay'), { target: { value: '11' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('editTodoDueMonth'), { target: { value: '15' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('editTodoDueYear'), { target: { value: '2022' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('editTodoDueHour'), { target: { value: '15' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('editTodoDueMinutes'), { target: { value: '34' } }));

        // submit on click
        waitFor(() => fireEvent.click(screen.queryByTestId('submitEditTodo')));

        // verify
        waitFor(() => expect(screen.queryByTestId('editTodoInputInvalidWarning')).toBeInTheDocument());
    });

    it('should close the window when user clicks to close', async () => {
        // verify we are on inbox
        waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // navigate to upcoming window (to see the mock todo edited)
        waitFor(() => fireEvent.click(screen.queryByTestId('navigateToUpcoming')));

        waitFor(() => expect(screen.queryByTestId('upcoming')).toBeInTheDocument());

        // click on edit todo
        waitFor(() => fireEvent.click(screen.queryByTestId('editTodo')));

        waitFor(() => expect(editTodosWindow.className).toBe('absolute top-1/3 left-1/2 bg-[#0B5269] w-96 rounded z-50'));

        let editTodosWindow = screen.queryByTestId('editTodosWindow');
        waitFor(() => fireEvent.focus(editTodosWindow));

        // close window
        waitFor(() => fireEvent.click(screen.queryByTestId('editTodosWindowClose')));
        waitFor(() => expect(editTodosWindow.className).toBe('absolute top-1/3 left-1/2 bg-[#0B5269] w-96 rounded -z-50'));
    });

    it('should close the window when user uses escape key (with no input field focused)', async () => {
        // verify we are on inbox
        waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // navigate to upcoming window (to see the mock todo edited)
        waitFor(() => fireEvent.click(screen.queryByTestId('navigateToUpcoming')));

        waitFor(() => expect(screen.queryByTestId('upcoming')).toBeInTheDocument());

        // click on edit todo
        waitFor(() => fireEvent.click(screen.queryByTestId('editTodo')));

        waitFor(() => expect(editTodosWindow.className).toBe('absolute top-1/3 left-1/2 bg-[#0B5269] w-96 rounded z-50'));

        let editTodosWindow = screen.queryByTestId('editTodosWindow');
        waitFor(() => fireEvent.focus(editTodosWindow));

        // close window
        waitFor(() => fireEvent.keyDown(editTodosWindow, { key: 'Escape', code: 'Escape', keyCode: 27, charCode: 27 }));
        waitFor(() => expect(editTodosWindow.className).toBe('absolute top-1/3 left-1/2 bg-[#0B5269] w-96 rounded -z-50'));
    });
});