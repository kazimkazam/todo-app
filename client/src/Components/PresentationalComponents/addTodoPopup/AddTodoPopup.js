const AddTodoPopup = (props) => {
    return(
        <div className={ 'absolute top-20 right-36 bg-[#0B5269] w-96 rounded -z-50' } id={ 'popupWindow' } onKeyDown={ props.onKeyDown } data-testid={ 'addTodosWindow' } >
            <div className={ 'flex justify-between m-1.5 bg-[#316B83] p-2 rounded' } >
                <h3 className={ 'text-lg font-bold' } >Add todo</h3>
                <img className={ 'cursor-pointer hover:scale-125' } src={ require('../../../resources/icons/close.png') } width={ 30 } title={ 'Close window' } alt={ 'Close' } onClick={ props.closeWindow } data-testid={ 'addTodosWindowClose' } />
            </div>

            <div id={ 'addTodoWarning' } className={ 'bg-amber-700 text-center hidden' } data-testid={ 'addTodosWindowWarning' } >
                <p>Please make sure there are no empty fields before submitting.</p>
            </div>

            <div id={ 'addTodoInputInvalidWarning' } className={ 'bg-amber-700 text-center hidden' } data-testid={ 'addTodoInputInvalidWarning' } >
                <p>Please make sure to submit valid input values.</p>
            </div>
            
            <div className={ 'flex flex-col justify-evenly place-items-center p-2 mb-4' } >
                <label className={ 'text-lg' } >Description</label>
                <textarea className={ 'bg-neutral-900 text-white outline-none ring-2 ring-black rounded w-72 h-20 resize-none hover:ring-white focus:ring-white' } id={ 'description' } name={ 'description' } type={ 'text' } placeholder={ 'Insert a description.' } onChange={ props.onChange } data-testid={ 'addDescription' } />

                <label className={ 'text-lg' } >Project</label>
                <input className={ 'bg-neutral-900 text-white outline-none ring-2 ring-black rounded w-72 hover:ring-white focus:ring-white' } id={ 'project' } name={ 'project' } type={ 'text' } placeholder={ 'Associate the todo with a project.' } onChange={ props.onChange } data-testid={ 'addProject' } />

                <label className={ 'text-lg' } >Comments</label>
                <input className={ 'bg-neutral-900 text-white outline-none ring-2 ring-black rounded w-72 hover:ring-white focus:ring-white' } id={ 'comments' } name={ 'comments' } type={ 'text' } placeholder={ 'Insert your comments here.' } onChange={ props.onChange } data-testid={ 'addComments' } />
                
                <label className={ 'text-lg' } >Due date</label>
                <div className={ 'flex' } >
                    <input type={ 'text' } placeholder={ 'DD' } className={ 'bg-neutral-900 text-white text-center outline-none ring-1 ring-black mx-0.5 w-16 rounded hover:ring-white focus:ring-white' } id={ 'dueDay' } name={ 'dueDay' } onChange={ props.onChange } data-testid={ 'addDueDay' } />
                    <input type={ 'text' } placeholder={ 'MM' } className={ 'bg-neutral-900 text-white text-center outline-none ring-1 ring-black mx-0.5 w-20 rounded hover:ring-white focus:ring-white' } id={ 'dueMonth' } name={ 'dueMonth' } onChange={ props.onChange } data-testid={ 'addDueMonth' } />
                    <input type={ 'text' } placeholder={ 'YYYY' } className={ 'bg-neutral-900 text-white text-center outline-none ring-1 ring-black mx-0.5 w-20 rounded hover:ring-white focus:ring-white' } id={ 'dueYear' } name={ 'dueYear' } onChange={ props.onChange } data-testid={ 'addDueYear' } />
                    <input type={ 'text' } placeholder={ 'HH' } className={ 'bg-neutral-900 text-white text-center outline-none ring-1 ring-black mx-0.5 w-16 rounded hover:ring-white focus:ring-white' } id={ 'dueHour' } name={ 'dueHour' } onChange={ props.onChange } data-testid={ 'addDueHour' } />
                    <input type={ 'text' } placeholder={ 'mm' } className={ 'bg-neutral-900 text-white text-center outline-none ring-1 ring-black mx-0.5 w-16 rounded hover:ring-white focus:ring-white' } id={ 'dueMinutes' } name={ 'dueMinutes' } onChange={ props.onChange } data-testid={ 'addDueMinutes' } />
                </div>

                <label className={ 'text-lg' } >Priority</label>
                <select className={ 'bg-neutral-900 text-white outline-none ring-2 ring-black rounded w-72 resize-none hover:ring-white focus:ring-white text-center' } id={ 'priority' } name={ 'priority' } onChange={ props.onChange } >
                    <option value={ 'lowPriority' } defaultValue>Low priority</option>
                    <option value={ 'mediumPriority' } >Medium priority</option>
                    <option value={ 'highPriority' } >High priority</option>
                </select>

                <button className={ 'bg-[#316B83] w-24 h-10 mt-5 rounded' } onClick={ props.onClick } data-testid={ 'submitAddTodo' } >Add</button>
            </div>
        </div>
    );
};

export { AddTodoPopup };