import { Provider } from 'react-redux';
import { store } from '../redux/store/store'
import { render, fireEvent, screen, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App/App';

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
    beforeEach(async () => {
        render(
            <Provider store={ store } >
                <App />
            </Provider>
        );

        await waitFor(() => fireEvent.change(screen.queryByTestId('loginEmail'), { target: { value: 'troti@email.com' } }));
        await waitFor(() => fireEvent.change(screen.queryByTestId('loginPassword'), { target: { value: 'Pass1234' } }));
        await waitFor(() => fireEvent.click(screen.queryByTestId('loginSubmit')));
    });

    afterEach(() => {
        cleanup();
    });

    it('should load with initial state', async () => {
        waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        let todosState = store.getState().todosState;
        expect(todosState).toEqual(initialState);
    });
    
    it('should add new todo on click, close the window, and show new todo on Inbox', async () => {
        waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // open window
        waitFor(() => fireEvent.click(screen.queryByTestId('addNewTodo')));

        let addTodosWindow = screen.queryByTestId('addTodosWindow');

        waitFor(() => expect(addTodosWindow.className).toBe('absolute top-20 right-36 bg-[#0B5269] w-96 rounded z-50'));
        waitFor(() => expect(screen.queryByTestId('submitAddTodo')).toBeInTheDocument());

        // edit input fields 
        waitFor(() => fireEvent.change(screen.queryByTestId('addDescription'), { target: { value: 'asdasd' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('addProject'), { target: { value: 'asdasd' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('addComments'), { target: { value: 'asda' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('addDueDay'), { target: { value: '11' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('addDueMonth'), { target: { value: '12' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('addDueYear'), { target: { value: '2023' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('addDueHour'), { target: { value: '15' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('addDueMinutes'), { target: { value: '34' } }));
        
        // submit add todo
        waitFor(() => fireEvent.click(screen.queryByTestId('submitAddTodo')));

        // window closes
        addTodosWindow = screen.queryByTestId('addTodosWindow');
        waitFor(() => expect(addTodosWindow.className).toBe('absolute top-20 right-36 bg-[#0B5269] w-96 rounded -z-50'));
        waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // fetch succeded
        let addTodosState = store.getState().addTodos;

        waitFor(() => expect(addTodosState.fetchStatus).toBe('succeded'));

        let todosState = store.getState().todosState;

        waitFor(() => expect(todosState.fetchStatus).toBe('succeded'));
    });

    it('should add new todo on enter keydown, close the window, and show new todo on Inbox', async () => {
        waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // open window
        waitFor(() => fireEvent.click(screen.queryByTestId('addNewTodo')));
        let addTodosWindow = screen.queryByTestId('addTodosWindow');
        waitFor(() => expect(addTodosWindow.className).toBe('absolute top-20 right-36 bg-[#0B5269] w-96 rounded z-50'));
        waitFor(() => expect(screen.queryByTestId('submitAddTodo')).toBeInTheDocument());

        // edit input fields 
        waitFor(() => fireEvent.change(screen.queryByTestId('addDescription'), { target: { value: 'asdasd' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('addProject'), { target: { value: 'asdasd' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('addComments'), { target: { value: 'asda' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('addDueDay'), { target: { value: '11' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('addDueMonth'), { target: { value: '12' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('addDueYear'), { target: { value: '2023' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('addDueHour'), { target: { value: '15' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('addDueMinutes'), { target: { value: '34' } }));
        
        // submit add todo
        addTodosWindow = screen.queryByTestId('addTodosWindow');
        waitFor(() => fireEvent.focus(addTodosWindow));

        waitFor(() => fireEvent.keyDown(addTodosWindow, { key: 'Enter', code: 'Enter', keyCode: 13, charCode: 13 }));

        // window closes
        addTodosWindow = screen.queryByTestId('addTodosWindow');
        waitFor(() => expect(addTodosWindow.className).toBe('absolute top-20 right-36 bg-[#0B5269] w-96 rounded -z-50'));
        waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        let addTodosState = store.getState().addTodos;

        waitFor(() => expect(addTodosState.fetchStatus).toBe('succeded'));

        let todosState = store.getState().todosState;

        waitFor(() => expect(todosState.fetchStatus).toBe('succeded'));
    });

    it('should show warning when user tries to submit with empty input fields', async () => {
        waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // open window
        waitFor(() => fireEvent.click(screen.queryByTestId('addNewTodo')));
        let addTodosWindow = screen.queryByTestId('addTodosWindow');
        waitFor(() => expect(addTodosWindow.className).toBe('absolute top-20 right-36 bg-[#0B5269] w-96 rounded z-50'));
        waitFor(() => expect(screen.queryByTestId('submitAddTodo')).toBeInTheDocument());
        
        // submit add todo
        waitFor(() => fireEvent.click(screen.queryByTestId('submitAddTodo')));

        // warning pops up
        waitFor(() => expect(screen.queryByTestId('addTodosWindowWarning')).toBeInTheDocument());
    });

    it('should show warning when user tries to submit with invalid inputs', async () => {
        waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // open window
        waitFor(() => fireEvent.click(screen.queryByTestId('addNewTodo')));
        let addTodosWindow = screen.queryByTestId('addTodosWindow');
        waitFor(() => expect(addTodosWindow.className).toBe('absolute top-20 right-36 bg-[#0B5269] w-96 rounded z-50'));
        waitFor(() => expect(screen.queryByTestId('submitAddTodo')).toBeInTheDocument());
        
        // edit input fields 
        waitFor(() => fireEvent.change(screen.queryByTestId('addDescription'), { target: { value: 'asdasd' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('addProject'), { target: { value: 'asdasd' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('addComments'), { target: { value: 'asda' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('addDueDay'), { target: { value: '111' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('addDueMonth'), { target: { value: '12' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('addDueYear'), { target: { value: '2023' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('addDueHour'), { target: { value: '15' } }));
        waitFor(() => fireEvent.change(screen.queryByTestId('addDueMinutes'), { target: { value: '34' } }));

        // submit add todo
        waitFor(() => fireEvent.click(screen.queryByTestId('submitAddTodo')));

        // warning pops up
        waitFor(() => expect(screen.queryByTestId('addTodoInputInvalidWarning')).toBeInTheDocument());
    });

    it('should close the window when user clicks to close', async () => {
        waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // open window
        waitFor(() => fireEvent.click(screen.queryByTestId('addNewTodo')));
        let addTodosWindow = screen.queryByTestId('addTodosWindow');
        waitFor(() => expect(addTodosWindow.className).toBe('absolute top-20 right-36 bg-[#0B5269] w-96 rounded z-50'));

        // close window
        waitFor(() => fireEvent.click(screen.queryByTestId('addTodosWindowClose')));
        waitFor(() => expect(addTodosWindow.className).toBe('absolute top-20 right-36 bg-[#0B5269] w-96 rounded -z-50'));
    });

    it('should close the window when user uses escape key (with no input field focused)', async () => {
        waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());

        // open window
        waitFor(() => fireEvent.click(screen.queryByTestId('addNewTodo')));
        let addTodosWindow = screen.queryByTestId('addTodosWindow');
        waitFor(() => expect(addTodosWindow.className).toBe('absolute top-20 right-36 bg-[#0B5269] w-96 rounded z-50'));

        // close window
        waitFor(() => fireEvent.focus(addTodosWindow));
        waitFor(() => fireEvent.keyDown(addTodosWindow, { key: 'Escape', code: 'Escape', keyCode: 27, charCode: 27 }));
        waitFor(() => expect(addTodosWindow.className).toBe('absolute top-20 right-36 bg-[#0B5269] w-96 rounded -z-50'));
    });
});