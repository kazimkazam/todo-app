import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ContainerHeader } from '../Components/ContainerComponents/ContainerHeader/ContainerHeader';
import { ContainerSidebar } from '../Components/ContainerComponents/ContainerSidebar/ContainerSidebar';
import { ContainerInbox } from '../Components/ContainerComponents/ContainerInbox/ContainerInbox';
import { ContainerToday } from '../Components/ContainerComponents/ContainerToday/ContainerToday';
import { ContainerUpcoming } from '../Components/ContainerComponents/ContainerUpcoming/ContainerUpcoming';
import { ContainerAllTodos } from '../Components/ContainerComponents/ContainerAllTodos/ContainerAllTodos';
import { ContainerSearchResults } from '../Components/ContainerComponents/ContainerSearchResults/ContainerSearchResults';
import { ContainerFooter } from '../Components/ContainerComponents/ContainerFooter/ContainerFooter';
import { Acknowledgements } from '../Components/PresentationalComponents/Acknowledgements/Acknowledgements';

const Layout = () => {
    return(
        <div id={ 'layout' } className={ 'bg-neutral-900 text-slate-50 font-myFonts' }>
            <div className={ 'bg-[#0B5269] h-14' } >
                <ContainerHeader />
            </div>

            <div className={ 'grid grid-cols-5 gap-2 min-h-[50rem] z-20' }>
                <div className={ 'col-1 bg-neutral-900 flex justify-center text-lg' } >
                    <ContainerSidebar />
                </div>

                <div className={ 'col-span-4 bg-neutral-800' } >
                    <Routes>
                        <Route path={ '/inbox' } element={ <ContainerInbox /> }></Route>
                        <Route path={ '/today' } element={ <ContainerToday /> } ></Route>
                        <Route path={ '/upcoming' } element={ <ContainerUpcoming /> } ></Route>
                        <Route path={ '/alltodos' } element={ <ContainerAllTodos /> } ></Route>
                        <Route path={ '/searchresults' } element={ <ContainerSearchResults /> } ></Route>
                        <Route path={ '/acknowledgements' } element={ <Acknowledgements /> } ></Route>
                    </Routes>
                </div>
            </div>

            <div className={ 'w-full h-max bg-[#0B5269] flex justify-center place-items-center' } >
                <ContainerFooter />
            </div>
        </div>
    );
};

export { Layout };