import { Sidebar } from "../../PresentationalComponents/Sidebar/Sidebar";

const ContainerSidebar = () => {
    const closeOpenWindowsBeforeChangingPage = () => {
        document.getElementById('popupWindow').className = 'absolute top-20 right-36 bg-[#0B5269] w-96 rounded -z-50';
        document.getElementById('notificationsWindow').className = 'absolute top-20 right-20 bg-[#0B5269] w-96 rounded -z-50';
    };

    return(
        <Sidebar
        onClick={ closeOpenWindowsBeforeChangingPage }
        />
    );
};

export { ContainerSidebar };