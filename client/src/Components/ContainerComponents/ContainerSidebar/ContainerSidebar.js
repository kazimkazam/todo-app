import { Sidebar } from "../../PresentationalComponents/Sidebar/Sidebar";
import { handleSearchReset } from "../../../redux/features/todosSlice";
import { useDispatch } from "react-redux";

const ContainerSidebar = () => {
    const dispatch = useDispatch();

    const closeOpenWindowsBeforeChangingPage = () => {
        document.getElementById('popupWindow').className = 'absolute top-20 right-36 bg-[#0B5269] w-96 rounded -z-50';
        document.getElementById('notificationsWindow').className = 'absolute top-20 right-20 bg-[#0B5269] w-96 rounded -z-50';
    };

    const resetSearchOnTabSelection = () => {
        dispatch(handleSearchReset);
    };

    return(
        <Sidebar
        onClick={ closeOpenWindowsBeforeChangingPage }
        onTabSelectResetSearch={ resetSearchOnTabSelection }
        />
    );
};

export { ContainerSidebar };