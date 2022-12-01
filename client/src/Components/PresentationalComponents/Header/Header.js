import { NavLink } from "react-router-dom";

const Header = (props) => {
    return(
        <div className={ 'flex justify-between w-full h-14' } id={ 'header' } onKeyDown={ props.onEscapeKeyDown } >
            {/* logo and title */}
            <div className={ 'col-1 inline-flex justify-start place-items-center mx-14' }>
                <NavLink to={ '/inbox' } >
                    <div className={ 'col-1 inline-flex justify-start place-items-center mx-14' }>
                        <img src={ require('../../../resources/logo/logo192.png') } alt={ 'page logo' } className={ 'w-8 h-8' } />
                        <h1 className={ 'text-2xl font-bold pl-2' } >todo</h1>
                    </div>
                </NavLink>
                
            </div>

            {/* search input */}
            <div className={ 'flex justify-center place-items-center' }>
                <div className={ 'flex place-items-center rounded-md' } >
                    <img src={ require('../../../resources/icons/search.png') } width={ 20 } alt={ 'Search' } className={ 'mx-2.5 absolute invert' } />
                    <input type={ 'text' } id={ 'searchInput' } name={ 'searchTopic' } data-testid={ 'searchInput' } className={ 'bg-[#1D3E53] ring-2 ring-black text-white w-72 h-7 rounded-md outline-none px-10 hover:bg-neutral-900 hover:ring-white focus:bg-neutral-900 focus:ring-white' } onChange={ props.onChange } onKeyDown={ props.onSearchKeydown } />
                </div>
            </div>

            {/* settings */}
            <div className={ 'flex justify-end place-items-center' }>
                <ul className={ 'inline-flex mr-1.5' }>
                    <li className={ 'mx-4 py-1.5 px-4 rounded bg-[#316B83] cursor-default' } >
                        <p>Welcome <strong>{ props.username }</strong>!</p>
                    </li>
                    <li className={ 'mx-4 hover:scale-125' } >
                        <button id={ 'newTask' } ><img src={ require('../../../resources/icons/newTask.png') } width={ 30 } title={ 'Add new task' } alt={ 'add new task' } data-testid={ 'addNewTodo' } onClick={ props.openPopup } /></button>
                    </li>
                    <li className={ 'mx-4 hover:scale-125' } >
                        <button id={ 'notifications' } ><img src={ require('../../../resources/icons/notifications.png') } width={ 30 } title={ 'Notifications' } alt={ 'notifications' } onClick={ props.openNotifications } data-testid={ 'openNotifications' } /></button>
                        <div className={ 'absolute top-1 right-[4.5rem]' } id={ 'newNotificationsDiv' } data-testid={ 'notificationsWarning' } >
                            <img src={ require('../../../resources/icons/warning.png') } width={ 22 } alt={ 'warning new notifications' } title={ 'Warning new notifications' } />
                        </div>
                    </li>
                    <li className={ 'mx-4 hover:scale-125' } >
                        <button id={ 'logout' } onClick={ props.onClick } ><img src={ require('../../../resources/icons/logout.png') } width={ 30 } title={ 'Logout' } alt={ 'logout' } /></button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export { Header };