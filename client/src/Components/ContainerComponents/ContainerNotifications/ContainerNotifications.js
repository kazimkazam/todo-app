import { Notifications } from "../../PresentationalComponents/Notifications/Notifications";
import { useSelector } from "react-redux";
import { selectTodos } from "../../../redux/features/todosSlice";
import { getDateDayFromIso8601 } from '../../../resources/utils/getDateFromIso8601';

const ContainerNotifications = () => {
    const allTodos = useSelector(selectTodos);
    
    const date = new Date();
    const dateToday = date.getDate();

    const inboxTodos = allTodos.filter(todo => todo.seen === false);
    const inboxTodosLength = inboxTodos.length;

    const todayTodos = allTodos.filter(todo => getDateDayFromIso8601(todo.due_date) === dateToday);
    const todayTodosLength = todayTodos.length;

    const closeNotificationsHandler = () => {
        document.getElementById('notificationsWindow').className = 'absolute top-20 right-20 bg-[#0B5269] w-96 rounded -z-50';

        // hide new notifications warning after the user closes the notifications window
        document.getElementById('newNotificationsDiv').className = 'hidden absolute top-1 right-[4.5rem]';
    };
    
    return(
        <Notifications
        howManyInbox={ inboxTodosLength }
        howManyToday={ todayTodosLength }
        onClick={ closeNotificationsHandler }
        />
    );
};

export { ContainerNotifications };