import { Upcoming } from "../../PresentationalComponents/Upcoming/Upcoming";
import { useSelector, useDispatch } from "react-redux";
import { selectUserId, selectSid } from "../../../redux/features/loginSlice";
import { handleChange, selectTodos, selectViewType } from "../../../redux/features/todosSlice";
import { selectFetchStatus, handleReset } from "../../../redux/features/deleteTodosSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getTodosApi, deleteTodoApi } from "../../../resources/utils/callBackendApi";
import { handleId } from "../../../redux/features/updateTodoSlice";
import { getYearFromIso8601, getMonthFromIso8601, getDateDayFromIso8601, getHourFromIso8601, getMinutesFromIso8601 } from "../../../resources/utils/getDateFromIso8601";
import { handlePriority } from "../../../resources/utils/handlePriority";
import { getCsrfToken } from "../../../resources/utils/getCsrfToken";
import { selectCsrfToken } from "../../../redux/features/csrfTokenSlice";
import { selectFetchStatus as selectAddTodosFetchStatus } from '../../../redux/features/addTodosSlice';

const ContainerUpcoming = () => {
    const userId = useSelector(selectUserId);
    const allTodos = useSelector(selectTodos);
    const viewType = useSelector(selectViewType);
    const deleteFetchStatus = useSelector(selectFetchStatus);
    const possibleNewTodo = useSelector(selectAddTodosFetchStatus); // fetch may be successful or unsuccessful
    var csrfToken = useSelector(selectCsrfToken);

    const sid = useSelector(selectSid);

    const date = new Date();
    const dateToday = date.getDate();
    const dateMonth = date.getMonth() + 1;
    const dateYear = date.getFullYear();

    const upcomingTodos = allTodos.filter(todo => {
        const todoDueDay = Number(getDateDayFromIso8601(todo.due_date));
        const todoDueMonth = Number(getMonthFromIso8601(todo.due_date));
        const todoDueYear = Number(getYearFromIso8601(todo.due_date));

        if ((todoDueDay < dateToday && todoDueMonth > dateMonth && todoDueYear >= dateYear) || (todoDueDay > dateToday && todoDueMonth >= dateMonth && todoDueYear >= dateYear)) {
            return todo;
        };

        return null;
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // if user is not logged in, navigate to login page
        if (!userId) {
            navigate('/');
        };
    }, [ userId ]);

    // get csrf token at first render
    useEffect(() => {
        dispatch(getCsrfToken());
    }, [ ]);

    // get all todos
    const trigger = allTodos.length;
    useEffect(() => {
        // get a new csrf token
        dispatch(getCsrfToken());
        let credentials = {
            getTodos: {
                user_id: userId,
                sid: sid
            },
            csrfToken: csrfToken
        };
        dispatch(getTodosApi(credentials))
    }, [ possibleNewTodo ]);

    // handler to change todos view type
    const viewTypeChangeHandler = (event) => {
        dispatch(handleChange(event));
    };

    // handler to delete todos
    const deleteTodoHandler = (event) => {
        // delete todo, refetch todos to update all todos array and reset delete fetch state
        // get a new csrf token
        dispatch(getCsrfToken());
        let credentials = {
            todoId: event.target.name,
            sid: sid,
            csrfToken: csrfToken
        };
        dispatch(deleteTodoApi(credentials));

        // get a new csrf token
        dispatch(getCsrfToken());
        credentials = {
            getTodos: {
                user_id: userId,
                sid: sid
            },
            csrfToken: csrfToken
        };
        dispatch(getTodosApi(credentials))

        if (deleteFetchStatus === 'succeded') {
            dispatch(handleReset());
        };
    };

    // open todo edit window handler
    const onClickEditHandler = (event) => {
        dispatch(handleId(event));
        const selectedTodoToEdit = allTodos.filter(todo => todo.id === Number(event.target.name))[0];

        document.getElementById('editDescription').placeholder = selectedTodoToEdit.description;
        document.getElementById('editProject').placeholder = selectedTodoToEdit.project;
        document.getElementById('editComments').placeholder = selectedTodoToEdit.comments;
        document.getElementById('editDueDay').placeholder = getDateDayFromIso8601(selectedTodoToEdit.due_date);
        document.getElementById('editDueMonth').placeholder = getMonthFromIso8601(selectedTodoToEdit.due_date); 
        document.getElementById('editDueYear').placeholder = getYearFromIso8601(selectedTodoToEdit.due_date);
        document.getElementById('editDueHour').placeholder = getHourFromIso8601(selectedTodoToEdit.due_date);
        document.getElementById('editDueMinutes').placeholder = getMinutesFromIso8601(selectedTodoToEdit.due_date);
        document.getElementById('editPriority').placeholder = handlePriority(selectedTodoToEdit.priority);

        document.getElementById('editTodosWindow').className = 'absolute top-1/3 left-1/2 bg-[#0B5269] w-96 rounded z-50';
    };

    // close popup windows if open when user clicks on the upcoming todos window
    const closeOpenWindows = () => {
        document.getElementById('popupWindow').className = 'absolute top-20 right-36 bg-[#0B5269] w-96 rounded -z-50';
        document.getElementById('notificationsWindow').className = 'absolute top-20 right-20 bg-[#0B5269] w-96 rounded -z-50';
    };

    return(
        <Upcoming
        todos={ upcomingTodos }
        viewType={ viewType }
        onChange={ viewTypeChangeHandler }
        onClickDelete={ deleteTodoHandler }
        closeWindowsOnClick={ closeOpenWindows }
        onClickEdit={ onClickEditHandler }
        />
    );
};

export { ContainerUpcoming };