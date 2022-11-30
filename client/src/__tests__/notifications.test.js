import { Provider } from 'react-redux';
import { store } from '../redux/store/store'
import { render, fireEvent, screen, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App/App';

describe('tests related with notifications window', () => {
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

    it('should open window and show notifications, before the opening, a warning saying there are notifications should be visible, and after window closes, the warning disappears', async () => {
        // verify we are on inbox
        waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());
        
        // verify notifications warning is appearing
        let notificationsWarning = screen.queryByTestId('notificationsWarning');
        waitFor(() => expect(notificationsWarning.className).toBe('absolute top-1 right-[4.5rem]'));
        
        // open notifications window and verify it is open
        waitFor(() => fireEvent.click(screen.queryByTestId('openNotifications')));

        let notificationsWindow = screen.queryByTestId('notificationsWindow');
        waitFor(() => expect(notificationsWindow.className).toBe('absolute top-20 right-20 bg-[#0B5269] w-96 rounded z-50'));

        // close window and verify it is closed
        waitFor(() => fireEvent.click(screen.queryByTestId('notificationsWindowClose')));

        notificationsWindow = screen.queryByTestId('notificationsWindow');
        waitFor(() => expect(notificationsWindow.className).toBe('absolute top-20 right-20 bg-[#0B5269] w-96 rounded -z-50'));

        // verify notifications warning disappeared
        notificationsWarning = screen.queryByTestId('notificationsWarning');
        waitFor(() => expect(notificationsWarning.className).toBe('hidden absolute top-1 right-[4.5rem]'));
    });
});