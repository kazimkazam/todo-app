import { Header } from "../../PresentationalComponents/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { handleReset as loginReset } from "../../../redux/features/loginSlice";
import { selectUsername, selectSid } from "../../../redux/features/loginSlice";
import { logoutApi } from "../../../resources/utils/callBackendApi";
import { resetLogoutState } from "../../../redux/features/logoutSlice";
import { useNavigate } from 'react-router-dom';
import { ContainerAddTodoPopup } from "../ContainerAddTodoPopup/ContainerAddTodoPopup";
import { ContainerNotifications } from "../ContainerNotifications/ContainerNotifications";
import { ContainerEditTodosPopup } from "../ContainerEditTodosPopup/ContainerEditTodosPopup";
import { selectTodos } from "../../../redux/features/todosSlice";
import { handleChange, handleSearch, handleSearchReset } from "../../../redux/features/todosSlice";
import { handleReset as addTodosReset } from "../../../redux/features/addTodosSlice";
import { handleReset as updateTodosReset } from "../../../redux/features/updateTodoSlice";
import { handleReset as todosReset } from "../../../redux/features/todosSlice";
import { getDateDayFromIso8601 } from "../../../resources/utils/getDateFromIso8601";
import { useEffect } from "react";
import { getCsrfToken } from '../../../resources/utils/getCsrfToken';
import { selectCsrfToken } from '../../../redux/features/csrfTokenSlice';

const ContainerHeader = () => {
    const username = useSelector(selectUsername);
    const allTodos = useSelector(selectTodos);
    const sid = useSelector(selectSid);
    var csrfToken = useSelector(selectCsrfToken);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    // handler for the user logout
    const handleClick = () => {
        // reset all states
        dispatch(loginReset());
        dispatch(addTodosReset())
        dispatch(updateTodosReset())
        dispatch(todosReset())

        // get a new csrf token
        dispatch(getCsrfToken());

        // credentials for logout
        const credentials = {
            csrfToken: csrfToken,
            sid: {
                sid: sid
            }
        };

        dispatch(logoutApi(credentials));
        
        navigate('/');

        setTimeout(() => {
            dispatch(resetLogoutState());
        }, 1000);
    };

    // handler to open add new todo popup window
    const openPopupHandler = () => {
        document.getElementById('popupWindow').className = 'absolute top-20 right-36 bg-[#0B5269] w-96 rounded z-50';
    };

    // handler to open the notifications popup window
    const openNotificationsHandler = () => {
        document.getElementById('notificationsWindow').className = 'absolute top-20 right-20 bg-[#0B5269] w-96 rounded z-50';
    };

    // handler to close popup windows when escape is pressed
    const closePopupOnEscapeHandler = (event) => {
        if (event.key === 'Escape') {
            document.getElementById('popupWindow').className = 'absolute top-20 right-36 bg-[#0B5269] w-96 rounded -z-50';
            document.getElementById('notificationsWindow').className = 'absolute top-20 right-20 bg-[#0B5269] w-96 rounded -z-50';
        };
    };

    // --------------------------------------------------------------------------------------------------

    // filter inbox and today todos to determine if the notifications icon should alert the user or not
    const date = new Date();
    const dateToday = date.getDate();
    
    const inboxTodos = allTodos.filter(todo => todo.seen === false);
    const inboxTodosLength = inboxTodos.length;

    const todayTodos = allTodos.filter(todo => Number(getDateDayFromIso8601(todo.due_date)) === dateToday);
    const todayTodosLength = todayTodos.length;

    useEffect(() => {
        if (inboxTodosLength > 0 || todayTodosLength > 0) {
            document.getElementById('newNotificationsDiv').className = 'absolute top-1 right-[4.5rem]';
        } else if (inboxTodosLength === 0 && todayTodosLength === 0) {
            document.getElementById('newNotificationsDiv').className = 'hidden absolute top-1 right-[4.5rem]';
        };
    }, [ inboxTodosLength, todayTodosLength ]);

    // ----------------------------------------------------------------------------------------------------------

    // handle user todo search
    const searchTopicChangeHandler = (event) => {
        dispatch(handleChange(event));
    };

    const onSearchHandler = () => {
        dispatch(handleSearch());
        navigate('/searchresults');
    };
    
    // if user escapes from search input, input is cleared and state reset
    const searchOnKeyDownHandler = (event) => {
        if (event.key === 'Enter') {
            onSearchHandler();
            document.getElementById('searchInput').value = '';
        } else if (event.key === 'Escape') {
            dispatch(handleSearchReset());
            document.getElementById('searchInput').value = '';
            navigate('/inbox');
        };
    };

    // ----------------------------------------------------------------------------------------------------------

    return(
        <div>
            <Header
            username={ username }
            onClick={ handleClick }
            onChange={ searchTopicChangeHandler }
            onSearchKeydown={ searchOnKeyDownHandler }
            openPopup={ openPopupHandler }
            onEscapeKeyDown={ closePopupOnEscapeHandler }
            openNotifications={ openNotificationsHandler }
            />

            <ContainerAddTodoPopup />
            <ContainerNotifications />
            <ContainerEditTodosPopup />
        </div>
    );
};

export { ContainerHeader };
