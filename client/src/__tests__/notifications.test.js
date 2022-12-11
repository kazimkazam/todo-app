import { Provider } from 'react-redux';
import { store } from '../redux/store/store'
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
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

        fireEvent.change(screen.queryByTestId('loginEmail'), { target: { value: 'test@email.com' } });
        fireEvent.change(screen.queryByTestId('loginPassword'), { target: { value: 'Pass1234' } });
        fireEvent.click(screen.queryByTestId('loginSubmit'));
    });

    afterEach(() => {
        // return to login for next test (odd behavior - test not cleaning up react tree in time...)
        fireEvent.click(screen.queryByTestId('logout'));
    });

    it('should open window and show notifications, before the opening, a warning saying there are notifications should be visible, and after window closes, the warning disappears', async () => {
        // verify we are on inbox
        await waitFor(() => expect(screen.queryByTestId('inbox')).toBeInTheDocument());
        
        // verify notifications warning is appearing
        let notificationsWarning = screen.queryByTestId('notificationsWarning');
        await waitFor(() => expect(notificationsWarning.className).toBe('absolute top-1 right-[4.5rem]'));
        
        // open notifications window and verify it is open
        fireEvent.click(screen.queryByTestId('openNotifications'));

        let notificationsWindow = screen.queryByTestId('notificationsWindow');
        await waitFor(() => expect(notificationsWindow.className).toBe('absolute top-20 right-20 bg-[#0B5269] w-96 rounded z-50'));

        // close window and verify it is closed
        fireEvent.click(screen.queryByTestId('notificationsWindowClose'));

        await waitFor(() => expect(notificationsWindow.className).toBe('absolute top-20 right-20 bg-[#0B5269] w-96 rounded -z-50'));

        // verify notifications warning disappeared
        await waitFor(() => expect(notificationsWarning.className).toBe('hidden absolute top-1 right-[4.5rem]'));
    });
});