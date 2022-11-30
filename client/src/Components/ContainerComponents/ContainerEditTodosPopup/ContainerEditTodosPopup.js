import { EditTodosPopup } from "../../PresentationalComponents/EditTodosPopup/EditTodosPopup";
import { handleChange, handleDate, handleReset } from '../../../redux/features/updateTodoSlice';
import { useSelector, useDispatch } from "react-redux";
import { selectNewTodo } from "../../../redux/features/updateTodoSlice";
import { selectUserId } from "../../../redux/features/loginSlice";
import { updateTodoApi } from "../../../resources/utils/callBackendApi";
import { useEffect } from "react";
import { selectCsrfToken } from "../../../redux/features/csrfTokenSlice";

const ContainerEditTodosPopup = () => {
    const userId = useSelector(selectUserId);
    const newTodo = useSelector(selectNewTodo);
    var csrfToken = useSelector(selectCsrfToken);

    const dispatch = useDispatch();

    // convert the date inputs into one string date that can be submitted when the post request is sent
    useEffect(() => {
        dispatch(handleDate());
    }, [ newTodo ]);

    // close window handler
    const closePopuphandler = () => {
        document.getElementById('editTodosWindow').className = 'absolute top-1/3 left-1/2 bg-[#0B5269] w-96 rounded -z-50';

        // reset window inputs and addTodosSlice state
        document.getElementById('editDescription').value = '';
        document.getElementById('editProject').value = '';
        document.getElementById('editComments').value = '';
        document.getElementById('editDueDay').value = '';
        document.getElementById('editDueMonth').value = '';
        document.getElementById('editDueYear').value = '';
        document.getElementById('editDueHour').value = '';
        document.getElementById('editDueMinutes').value = '';
        document.getElementById('editPriority').value = 'lowPriority';
        dispatch(handleReset());

        // hide the warning in the edit todo window
        document.getElementById('editTodoWarning').className = 'bg-amber-700 text-center hidden';
        document.getElementById('editTodoInputInvalidWarning').className = 'bg-amber-700 text-center hidden';
    };

    // handle input changes and pass them into the variables state
    const eventChangeHandler = (event) => {
        dispatch(handleChange(event));
    };

    // send put request on button click
    const onSubmitEditHandler = () => {
        if (Number(document.getElementById('editDueMinutes').value) >= 0 && Number(document.getElementById('editDueMinutes').value) <= 59 && Number(document.getElementById('editDueHour').value) >= 0 && Number(document.getElementById('editDueHour').value) <= 23 && Number(document.getElementById('editDueDay').value) > 0 && Number(document.getElementById('editDueDay').value) <= 31 && Number(document.getElementById('editDueMonth').value) > 0 && Number(document.getElementById('editDueMonth').value) <= 12 && Number(document.getElementById('editDueYear').value) >= 2021 && Number(document.getElementById('editDueYear').value) < 2100) {
            if (newTodo.description && newTodo.project && newTodo.comments && newTodo.dueDate) {
                let credentials = {
                    editTodo: {
                        id: newTodo.id,
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
        
                dispatch(updateTodoApi(credentials));
        
                // close window and reset window inputs and updateTodoSlice state
                closePopuphandler();
            } else {
                document.getElementById('editTodoWarning').className = 'bg-amber-700 text-center';
            };
        } else {
            document.getElementById('editTodoInputInvalidWarning').className = 'bg-amber-700 text-center';
        }
    };

    // close edit todo popup windown on escape key keydown, and submit put request if enter key keydown
    const onKeyDownHandler = (event) => {
        if (event.key === 'Escape') {
            closePopuphandler();
        } else if (event.key === 'Enter') {
            onSubmitEditHandler();
        };
    };

    return(
        <EditTodosPopup
        onChange={ eventChangeHandler }
        closeWindow={ closePopuphandler }
        onClick={ onSubmitEditHandler }
        onKeyDown={ onKeyDownHandler }
        />
    );
};

export { ContainerEditTodosPopup };