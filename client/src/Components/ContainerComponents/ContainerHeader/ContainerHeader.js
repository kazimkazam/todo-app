import { Header } from "../../PresentationalComponents/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { handleReset } from "../../../redux/features/loginSlice";
import { selectUsername } from "../../../redux/features/loginSlice";
import { logoutApi } from "../../../resources/utils/callBackendApi";
import { resetLogoutState } from "../../../redux/features/logoutSlice";
import { useNavigate } from 'react-router-dom';
import { ContainerAddTodoPopup } from "../ContainerAddTodoPopup/ContainerAddTodoPopup";
import { ContainerNotifications } from "../ContainerNotifications/ContainerNotifications";
import { ContainerEditTodosPopup } from "../ContainerEditTodosPopup/ContainerEditTodosPopup";
import { selectTodos } from "../../../redux/features/todosSlice";
import { getDateDayFromIso8601 } from "../../../resources/utils/getDateFromIso8601";
import { useEffect } from "react";

const ContainerHeader = () => {
    const username = useSelector(selectUsername);
    const allTodos = useSelector(selectTodos);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    // handler for the user logout
    const handleClick = () => {
        dispatch(handleReset());
        dispatch(logoutApi());
        
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

    // filter todos depending on user search

    const onSearchHandler = (event) => {
        const searchTopic = event.target.value;

        
    };

    // ----------------------------------------------------------------------------------------------------------

    return(
        <div>
            <Header
            username={ username }
            onClick={ handleClick }
            openPopup={ openPopupHandler }
            onKeyDown={ closePopupOnEscapeHandler }
            openNotifications={ openNotificationsHandler }
            />

            <ContainerAddTodoPopup />
            <ContainerNotifications />
            <ContainerEditTodosPopup />
        </div>
    );
};

export { ContainerHeader };
