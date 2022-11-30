const Notifications = (props) => {
    return(
        <div className={ 'absolute top-20 right-20 bg-[#0B5269] w-96 rounded -z-50' } id={ 'notificationsWindow' } data-testid={ 'notificationsWindow' } >
            <div className={ 'flex justify-between m-1.5 bg-[#316B83] p-2 rounded' } >
                <h3 className={ 'text-lg font-bold' } >Add todo</h3>
                <img className={ 'cursor-pointer hover:scale-125' } src={ require('../../../resources/icons/close.png') } width={ 30 } title={ 'Close window' } alt={ 'Close' } onClick={ props.onClick } data-testid={ 'notificationsWindowClose' } />
            </div>

            <div className={ 'bg-neutral-900 m-2 rounded' } >
                <p className={ 'p-2' } >{ props.howManyInbox === 1 ? `You have ${props.howManyInbox} new todo in your inbox!` : `You have ${props.howManyInbox} new todos in your inbox!` }</p>
                <p className={ 'p-2' } >{ props.howManyToday === 1 ? `You have ${props.howManyToday} todo due today, do not miss it out!` : `You have ${props.howManyToday} todos due today!` }</p>
            </div>
        </div>
    );
};

export { Notifications };