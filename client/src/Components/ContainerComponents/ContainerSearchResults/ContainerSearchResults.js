import { SearchResults } from "../../PresentationalComponents/SearchResults/SearchResults";
import { useSelector, useDispatch } from "react-redux";
import { selectTodos, selectSearchTopic, selectSearchResults } from "../../../redux/features/todosSlice";
import { getTodosApi, deleteTodoApi } from "../../../resources/utils/callBackendApi";
import { selectUserId } from "../../../redux/features/loginSlice";
import { selectFetchStatus, handleReset } from "../../../redux/features/deleteTodosSlice";
import { handleId } from "../../../redux/features/updateTodoSlice";
import { getYearFromIso8601, getMonthFromIso8601, getDateDayFromIso8601, getHourFromIso8601, getMinutesFromIso8601 } from "../../../resources/utils/getDateFromIso8601";
import { handlePriority } from "../../../resources/utils/handlePriority";

const ContainerSearchResults = () => {
    const userId = useSelector(selectUserId);
    const allTodos = useSelector(selectTodos);
    const searchTopic = useSelector(selectSearchTopic);
    const searchResults = useSelector(selectSearchResults);
    const deleteFetchStatus = useSelector(selectFetchStatus);

    const dispatch = useDispatch();

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
    const editTodoHandler = (event) => {
        console.log(event)

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
    const closeOpenWindowsHandler = () => {
        document.getElementById('popupWindow').className = 'absolute top-20 right-36 bg-[#0B5269] w-96 rounded -z-50';
        document.getElementById('notificationsWindow').className = 'absolute top-20 right-20 bg-[#0B5269] w-96 rounded -z-50';
    };
    
    return(
        <SearchResults
        topic={ searchTopic }
        searchResults={ searchResults }
        onClickDelete={ deleteTodoHandler }
        onClickEdit={ editTodoHandler }
        closeWindowsonClick={ closeOpenWindowsHandler }
        />
    );
};

export { ContainerSearchResults };