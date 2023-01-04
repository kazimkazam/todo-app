import { NavLink } from "react-router-dom";

const Footer = (props) => {
    return(
        <div className={ 'text-center text-lg flex flex-col justify-between place-items-center' } onClick={ props.closeWindowsOnClick } >
            <h3 className={ 'font-bold my-1' } >todo 2023 ©</h3>
            <p className={ 'text-sm' } >Please read the acknowledgements and terms of use by clicking on the link below.</p>
            <NavLink to={ '/acknowledgements' } className={ 'p-2 my-1.5 w-80 rounded text-yellow-400 hover:bg-[#316B83] hover:text-white hover:font-medium hover:underline hover:underline-offset-4 hover:decoration-white' } >Acknowledgements and terms</NavLink>
        </div>
    );
};

export { Footer };