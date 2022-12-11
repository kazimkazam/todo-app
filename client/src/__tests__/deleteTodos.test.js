import { Provider } from 'react-redux';
import { store } from '../redux/store/store'
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../App/App';
import { server } from '../mocks/server';
import { rest } from 'msw';

describe('tests related with editing todos', () => {
    // cleanUp and login to navigate to inbox
    beforeEach(async () => {
        render(
            <Provider store={ store } >
                <App />
            </Provider>
        );

        fireEvent.change(screen.queryByTestId('loginEmail'), { target: { value: 'test@email.com' } });
        fireEvent.change(screen.queryByTestId('loginPassword'), { target: { value: 'Pass1234' } });
        fireEvent.click(screen.queryByTestId('loginSubmit'));

        userEvent.click(await screen.findByTestId('navigateToAllTodos'));
    });

    afterEach(() => {
        // return to login for next test (odd behavior - test not cleaning up react tree in time...)
        fireEvent.click(screen.queryByTestId('logout'));
    });

    it('should delete todo on click', async () => {
        // override server interception on this gettodos request
        server.use(
            rest.post('https://server-todo-app.glitch.me/gettodos', async (req, res, ctx) => {
                const response = res.once(
                    ctx.status(200),
                    ctx.delay(),
                    ctx.json([
                        {
                            "id": 12,
                            "description": "Todos loaded and ready to be deleted.",
                            "project": "Home",
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
        
        // verify we are on all todos page
        await waitFor(() => expect(screen.queryByTestId('allTodos')).toBeInTheDocument());

        // verify todos loaded on screen
        await waitFor(() => expect(screen.queryByText('Todos loaded and ready to be deleted.')).toBeInTheDocument());

        // click on delete todo
        userEvent.click(screen.queryByTestId('deleteTodo'));

        // override server interception on this gettodos request after delete was completed
        server.use(
            rest.post('https://server-todo-app.glitch.me/gettodos', async (req, res, ctx) => {
                const response = res.once(
                    ctx.status(200),
                    ctx.delay(),
                    ctx.json([
                        {
                            "id": 12,
                            "description": "This is another todo.",
                            "project": "Home",
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

        // verify
        await waitFor(() => expect(screen.queryByText('This is another todo.')).toBeInTheDocument());
    });
});