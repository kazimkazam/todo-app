import { Inbox } from '../../PresentationalComponents/Inbox/Inbox';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserId } from '../../../redux/features/loginSlice';
import { selectTodos, selectViewType } from '../../../redux/features/todosSlice';
import { handleChange } from "../../../redux/features/todosSlice";
import { getTodosApi, updateTodoApi, deleteTodoApi } from '../../../resources/utils/callBackendApi';
import { selectFetchStatus, handleReset } from '../../../redux/features/deleteTodosSlice';
import { handleId } from "../../../redux/features/updateTodoSlice";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getYearFromIso8601, getMonthFromIso8601, getDateDayFromIso8601, getHourFromIso8601, getMinutesFromIso8601 } from "../../../resources/utils/getDateFromIso8601";
import { handlePriority } from "../../../resources/utils/handlePriority";

const ContainerInbox = () => {
    const userId = useSelector(selectUserId);
    const allTodos = useSelector(selectTodos);
    const viewType = useSelector(selectViewType);
    const deleteFetchStatus = useSelector(selectFetchStatus);

    const inboxTodos = allTodos.filter(todo => todo.seen === false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // if user is not logged in, navigate to login page
        if (!userId) {
            navigate('/');
        };
    }, [ userId, navigate ]);

    // get all todos
    const trigger = allTodos.length;
    useEffect(() => {
        dispatch(getTodosApi({
            user_id: userId
        }));
    }, [ trigger, userId, dispatch ]);

    // update seen state of inbox todos from false to true
    // the next time, they will not appear on inbox
    useEffect(() => {
        for (let todo of inboxTodos) {
            const newTodo = {
                id: todo.id,
                description: todo.description,
                project: todo.project,
                comments: todo.comments,
                due_date: todo.due_date,
                priority: todo.priority,
                user_id: userId,
                seen: true
            };

            dispatch(updateTodoApi(newTodo));
        };
    });

    // handler to change todos view type
    const viewTypeChangeHandler = (event) => {
        dispatch(handleChange(event));
    };

    // handler to delete todos
    const deleteTodoHandler = (event) => {
        // delete todo, refetch todos to update all todos array and reset delete fetch state
        dispatch(deleteTodoApi(event.target.name));
        dispatch(getTodosApi({
            user_id: userId
        }));

        if (deleteFetchStatus === 'succeded') {
            dispatch(handleReset());
        };
    };

    // open todo edit window handler
    const onClickEditHandler = (event) => {
        dispatch(handleId(event));
        const selectedTodoToEdit = allTodos.filter(todo => todo.id === Number(event.target.name))[0];

        document.getElementById('editDescription').value = selectedTodoToEdit.description;
        document.getElementById('editProject').value = selectedTodoToEdit.project;
        document.getElementById('editComments').value = selectedTodoToEdit.comments;
        document.getElementById('editDueDay').value = getDateDayFromIso8601(selectedTodoToEdit.due_date);
        document.getElementById('editDueMonth').value = getMonthFromIso8601(selectedTodoToEdit.due_date); 
        document.getElementById('editDueYear').value = getYearFromIso8601(selectedTodoToEdit.due_date);
        document.getElementById('editDueHour').value = getHourFromIso8601(selectedTodoToEdit.due_date);
        document.getElementById('editDueMinutes').value = getMinutesFromIso8601(selectedTodoToEdit.due_date);
        document.getElementById('editPriority').value = handlePriority(selectedTodoToEdit.priority);

        document.getElementById('editTodosWindow').className = 'absolute top-1/3 left-1/2 bg-[#0B5269] w-96 rounded z-50';
    };

    // close popup windows if open when user clicks on the all todos window
    const closeOpenWindows = () => {
        document.getElementById('popupWindow').className = 'absolute top-20 right-36 bg-[#0B5269] w-96 rounded -z-50';
        document.getElementById('notificationsWindow').className = 'absolute top-20 right-20 bg-[#0B5269] w-96 rounded -z-50';
    };

    return(
        <Inbox
        todos={ inboxTodos }
        viewType={ viewType }
        onChange={ viewTypeChangeHandler }
        onClickDelete={ deleteTodoHandler }
        closeWindowsOnClick={ closeOpenWindows }
        onClickEdit={ onClickEditHandler }
        />
    );
};

export { ContainerInbox };