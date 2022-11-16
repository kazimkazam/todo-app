import { NavLink } from "react-router-dom";

const Sidebar = (props) => {
    return(
        <div onClick={ props.onClick }>
            <ul>
                <li className={ 'hover:bg-neutral-700 block w-72 p-1.5 rounded my-3' } >
                    <NavLink to={ '/inbox' } >
                        <div className={ 'flex' } >
                            <img src={ require('../../../resources/icons/inbox.png') } width={ 30 } alt={ 'inbox icon' } className={ 'mr-3' } />
                            <p>Inbox</p>
                        </div>
                    </NavLink>
                </li>
                <li className={ 'hover:bg-neutral-700 block w-72 p-1.5 rounded my-3' } >
                    <NavLink to={ '/today' } >
                        <div className={ 'flex' } >
                            <img src={ require('../../../resources/icons/today.png') } width={ 30 } alt={ 'today icon' } className={ 'mr-3' } />
                            <p>Today</p>
                        </div>
                    </NavLink>
                    
                </li>
                <li className={ 'hover:bg-neutral-700 block w-72 p-1.5 rounded my-3' } >
                    <NavLink to={ '/upcoming' } >
                        <div className={ 'flex' } >
                            <img src={ require('../../../resources/icons/upcoming.png') } width={ 30 } alt={ 'upcoming icon' } className={ 'mr-3' } />
                            <p>Upcoming</p>
                        </div>
                    </NavLink>
                </li>
                <li className={ 'hover:bg-neutral-700 block w-72 p-1.5 rounded my-3' } >
                    <NavLink to={ '/alltodos' } >
                        <div className={ 'flex' } >
                            <img src={ require('../../../resources/icons/folders.png') } width={ 30 } alt={ 'all todos icon' } className={ 'mr-3' } />
                            <p>All todos</p>
                        </div>
                    </NavLink>
                </li>
            </ul>

            <span className={ 'flex w-72 h-1 bg-[#0B5269] mt-5 rounded' } ></span>
            <div className={ 'flex place-items-center' } >
                <p className={ 'mt-3 text-xl underline cursor-default' } >Projects</p>
                <img src={ require('../../../resources/icons/plus.png') } width={ 30 } alt={ 'add new project' } title={ 'Add new project' } className={ 'ml-3 mt-4 p-1 bg-neutral-500 rounded hover:scale-110 cursor-pointer' } />
            </div>
            
            
        </div>
    );
};

export { Sidebar };
