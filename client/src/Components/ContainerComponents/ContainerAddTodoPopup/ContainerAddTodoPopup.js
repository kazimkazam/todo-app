import { AddTodoPopup } from "../../PresentationalComponents/addTodoPopup/AddTodoPopup";
import { useSelector, useDispatch } from "react-redux";
import { selectNewTodo } from "../../../redux/features/addTodosSlice";
import { handleChange, handleDate, handleReset } from "../../../redux/features/addTodosSlice";
import { selectUserId } from "../../../redux/features/loginSlice";
import { getTodosApi, addTodoApi } from "../../../resources/utils/callBackendApi";
import { useEffect } from "react";
import { selectCsrfToken } from "../../../redux/features/csrfTokenSlice";
import { getCsrfToken } from '../../../resources/utils/getCsrfToken';

const ContainerAddTodoPopup = () => {
    const newTodo = useSelector(selectNewTodo);
    const userId = useSelector(selectUserId);
    var csrfToken = useSelector(selectCsrfToken);

    const dispatch = useDispatch();

    // convert the date inputs into one string date that can be submitted when the post request is sent
    useEffect(() => {
        dispatch(handleDate());
    }, [ newTodo ]);

    // close window handler
    const closePopuphandler = () => {
        document.getElementById('popupWindow').className = 'absolute top-20 right-36 bg-[#0B5269] w-96 rounded -z-50';

        // reset window inputs and addTodosSlice state
        document.getElementById('description').value = '';
        document.getElementById('project').value = '';
        document.getElementById('comments').value = '';
        document.getElementById('dueDay').value = '';
        document.getElementById('dueMonth').value = '';
        document.getElementById('dueYear').value = '';
        document.getElementById('dueHour').value = '';
        document.getElementById('dueMinutes').value = '';
        document.getElementById('priority').value = 'lowPriority';
        dispatch(handleReset());

        // hide the warning in the add todo window
        document.getElementById('addTodoWarning').className = 'bg-amber-700 text-center hidden';
        document.getElementById('addTodoInputInvalidWarning').className = 'bg-amber-700 text-center hidden';
    };

    // handle input changes and pass them into the variables state
    const eventChangeHandler = (event) => {
        dispatch(handleChange(event));
    };

    // send post request on button click
    const onAddHandler = () => {
        if (Number(document.getElementById('dueMinutes').value) >= 0 && Number(document.getElementById('dueMinutes').value) <= 59 && Number(document.getElementById('dueHour').value) >= 0 && Number(document.getElementById('dueHour').value) <= 23 && Number(document.getElementById('dueDay').value) > 0 && Number(document.getElementById('dueDay').value) <= 31 && Number(document.getElementById('dueMonth').value) > 0 && Number(document.getElementById('dueMonth').value) <= 12 && Number(document.getElementById('dueYear').value) >= 2021 && Number(document.getElementById('dueYear').value) < 2100) {
            if (newTodo.description && newTodo.project && newTodo.comments && newTodo.dueDate) {
                // get a new csrf token
                dispatch(getCsrfToken());
                let credentials = {
                    newTodo: {
                        description: newTodo.description,
                        project: newTodo.project,
                        comments: newTodo.comments,
                        due_date: newTodo.dueDate,
                        priority: newTodo.priority,
                        user_id: userId,
                        seen: false
                    },
                    csrfToken: csrfToken
                };
                dispatch(addTodoApi(credentials));
                
                // get a new csrf token
                dispatch(getCsrfToken());
                credentials = {
                    getTodos: {
                        user_id: userId
                    },
                    csrfToken: csrfToken
                };
                dispatch(getTodosApi(credentials))
        
                // close window and reset window inputs and addTodosSlice state
                closePopuphandler();
            } else {
                document.getElementById('addTodoWarning').className = 'bg-amber-700 text-center';
            };
        } else {
            document.getElementById('addTodoInputInvalidWarning').className = 'bg-amber-700 text-center';
        };
    };

    // close add todo popup windown on escape key keydown, and submit post request if enter key keydown
    const onKeyDownHandler = (event) => {
        if (event.key === 'Escape') {
            closePopuphandler();
        } else if (event.key === 'Enter') {
            onAddHandler();
        };
    };

    return(
        <AddTodoPopup
        onChange={ eventChangeHandler }
        closeWindow={ closePopuphandler }
        onClick={ onAddHandler }
        onKeyDown={ onKeyDownHandler }
        />
    );
};

export { ContainerAddTodoPopup };