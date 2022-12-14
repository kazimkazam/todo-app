import { NavLink } from "react-router-dom";

const Sidebar = (props) => {
    return(
        <div className={ 'xxl:w-72 xl:w-72 lg:w-60 mx-2' } onClick={ props.onClick }>
            <ul>
                <li className={ 'hover:bg-neutral-700 block w-full p-1.5 rounded my-3' } onClick={ props.onTabSelectResetSearch } >
                    <NavLink to={ '/inbox' } data-testid={ 'navigateToInbox' } >
                        <div className={ 'flex' } >
                            <img src={ require('../../../resources/icons/inbox.png') } width={ 30 } alt={ 'inbox icon' } className={ 'mr-3' } />
                            <p>Inbox</p>
                        </div>
                    </NavLink>
                </li>
                <li className={ 'hover:bg-neutral-700 block w-full p-1.5 rounded my-3' } onClick={ props.onTabSelectResetSearch } >
                    <NavLink to={ '/today' } data-testid={ 'navigateToToday' } >
                        <div className={ 'flex' } >
                            <img src={ require('../../../resources/icons/today.png') } width={ 30 } alt={ 'today icon' } className={ 'mr-3' } />
                            <p>Today</p>
                        </div>
                    </NavLink>
                    
                </li>
                <li className={ 'hover:bg-neutral-700 block w-full p-1.5 rounded my-3' } onClick={ props.onTabSelectResetSearch } >
                    <NavLink to={ '/upcoming' } data-testid={ 'navigateToUpcoming' } >
                        <div className={ 'flex' } >
                            <img src={ require('../../../resources/icons/upcoming.png') } width={ 30 } alt={ 'upcoming icon' } className={ 'mr-3' } />
                            <p>Upcoming</p>
                        </div>
                    </NavLink>
                </li>
                <li className={ 'hover:bg-neutral-700 block w-full p-1.5 rounded my-3' } onClick={ props.onTabSelectResetSearch } >
                    <NavLink to={ '/alltodos' } data-testid={ 'navigateToAllTodos' } >
                        <div className={ 'flex' } >
                            <img src={ require('../../../resources/icons/folders.png') } width={ 30 } alt={ 'all todos icon' } className={ 'mr-3' } />
                            <p>All todos</p>
                        </div>
                    </NavLink>
                </li>
            </ul>

            <span className={ 'flex w-full h-1 bg-[#0B5269] mt-5 rounded' } ></span>
            <div className={ 'flex place-items-center' } >
                <p className={ 'mt-3 text-xl underline cursor-default' } >Projects</p>
                <img src={ require('../../../resources/icons/plus.png') } width={ 30 } alt={ 'add new project' } title={ 'Add new project' } className={ 'ml-3 mt-4 p-1 bg-neutral-500 rounded hover:scale-110 cursor-pointer' } />
            </div>
        </div>
    );
};

export { Sidebar };
