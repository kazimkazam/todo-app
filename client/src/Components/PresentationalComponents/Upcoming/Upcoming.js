import { getDateFromIso8601 } from '../../../resources/utils/getDateFromIso8601';

const Upcoming = (props) => {
    if (props.viewType === 'board') {
        return(
            <div className={ 'm-4' } onClick={ props.closeWindowsOnClick } data-testid={ 'upcoming' } >
                <div className={ 'bg-[#0B5269] ml-auto p-2 w-52 rounded flex justify-center' } >
                    <label className={ 'text-xl ' } >View :</label>
                    <select name={ 'viewType' } className={ 'bg-[#0B5269] text-lg text-center w-28 outline-none cursor-pointer' } value={ props.viewType } onChange={ props.onChange } >
                        <option value={ 'board' } >Board</option>
                        <option value={ 'list' } >List</option>
                    </select>
                </div>
                
                <div className={ 'flex flex-wrap ml-10 h-min' } id={ 'todos' } >
                    { props.todos.map(todo => {
                        const content = <div className={ 'flex flex-col justify-evenly rounded m-2 cursor-default' } >
                            <p className={ 'text-xl text-white mx-2'} >Description:</p>
                            <textarea className={ 'resize-none bg-neutral-900 text-white px-1 mx-1 overflow-y-auto rounded scrollbar-hide' } value={ todo.description } disabled />
                            <p className={ 'text-xl text-white mx-2'} >Project:</p>
                            <textarea className={ 'resize-none bg-neutral-900 text-white px-1 mx-1 overflow-y-auto rounded scrollbar-hide' } value={ todo.project } disabled />
                            <p className={ 'text-xl text-white mx-2'} >Comments:</p>
                            <textarea className={ 'resize-none bg-neutral-900 text-white px-1 mx-1 overflow-y-auto rounded scrollbar-hide' } value={ todo.comments } disabled />
                            <p className={ 'text-xl text-white mx-2'} >Due date:</p>
                            <textarea className={ 'resize-none bg-neutral-900 text-white px-1 mx-1 overflow-y-auto rounded scrollbar-hide' } value={ getDateFromIso8601(todo.due_date) } disabled />
                        </div>

                        if (todo.priority === 3) {
                            return(
                                <div className={ 'border-[1px] border-teal-400 w-[21rem] rounded m-3' } key={ todo.id } >
                                    <div className={ 'flex justify-between' } >
                                        <span className={ 'w-52 h-6 bg-teal-400 mt-3 ml-3 rounded' } ></span>
                                        <div className={ 'flex justify-between' } >
                                            <img src={ require('../../../resources/icons/edit.png') } data-testid={ 'editTodo' } width={ 30 } className={ 'mt-3 mr-4 cursor-pointer hover:scale-125' } alt={ 'edit todo' } title={ 'Edit todo' } name={ todo.id } onClick={ props.onClickEdit } />
                                            <img src={ require('../../../resources/icons/delete.png') } width={ 30 } className={ 'mt-3 mr-3 cursor-pointer hover:scale-125' } alt={ 'delete todo' } title={ 'Delete todo' } name={ todo.id } onClick={ props.onClickDelete } />
                                        </div>
                                    </div>
                                    
                                    { content }
                                </div>
                            )
                        } else if (todo.priority === 2) {
                            return(
                                <div className={ 'border-[1px] border-[#FDD998] w-[21rem] rounded m-3' } key={ todo.id } >
                                    <div className={ 'flex justify-between' } >
                                        <span className={ 'w-52 h-6 bg-[#FDD998] mt-3 ml-3 rounded' } ></span>
                                        <div className={ 'flex justify-between' } >
                                            <img src={ require('../../../resources/icons/edit.png') } width={ 30 } className={ 'mt-3 mr-4 cursor-pointer hover:scale-125' } alt={ 'edit todo' } title={ 'Edit todo' } name={ todo.id } onClick={ props.onClickEdit } />
                                            <img src={ require('../../../resources/icons/delete.png') } width={ 30 } className={ 'mt-3 mr-3 cursor-pointer hover:scale-125' } alt={ 'delete todo' } title={ 'Delete todo' } name={ todo.id } onClick={ props.onClickDelete } />
                                        </div>
                                    </div>
                                    
                                    { content }
                                </div>
                            )
                        } else if (todo.priority === 1) {
                            return(
                                <div className={ 'border-[1px] border-[#D35D6E] w-[21rem] rounded m-3' } key={ todo.id } >
                                    <div className={ 'flex justify-between' } >
                                        <span className={ 'w-52 h-6 bg-[#D35D6E] mt-3 ml-3 rounded' } ></span>
                                        <div className={ 'flex justify-between' } >
                                            <img src={ require('../../../resources/icons/edit.png') } width={ 30 } className={ 'mt-3 mr-4 cursor-pointer hover:scale-125' } alt={ 'edit todo' } title={ 'Edit todo' } name={ todo.id } onClick={ props.onClickEdit } />
                                            <img src={ require('../../../resources/icons/delete.png') } width={ 30 } className={ 'mt-3 mr-3 cursor-pointer hover:scale-125' } alt={ 'delete todo' } title={ 'Delete todo' } name={ todo.id } onClick={ props.onClickDelete } />
                                        </div>
                                    </div>
                                    
                                    { content }
                                </div>
                            )
                        }
                        return null;
                    }
                    ) }
                </div>
            </div>
        );
    } else if (props.viewType === 'list') {
        return(
            <div className={ 'm-4' } onClick={ props.closeWindowsOnClick } data-testid={ 'upcoming' } >
                <div className={ 'bg-[#0B5269] ml-auto p-2 w-52 rounded flex justify-center' } >
                    <label className={ 'text-xl' } >View :</label>
                    <select name={ 'viewType' } className={ 'bg-[#0B5269] text-lg text-center w-28 outline-none cursor-pointer' } value={ props.viewType } onChange={ props.onChange } >
                        <option value={ 'board' } >Board</option>
                        <option value={ 'list' } >List</option>
                    </select>
                </div>

                <div className={ 'my-4 h-min w-11/12 mx-auto' } id={ 'todos' } >
                    { props.todos.map(todo => {
                        const content = <div className={ 'flex justify-evenly place-items-center rounded my-1 cursor-default' } >
                            <div>
                                <p className={ 'text-lg text-white'} >Description:</p>
                                <textarea className={ 'resize-none bg-neutral-900 text-white px-1 overflow-y-auto rounded scrollbar-hide' } value={ todo.description } cols={ 30 } disabled />
                            </div>
                            <div>
                                <p className={ 'text-lg text-white'} >Project:</p>
                                <textarea className={ 'resize-none bg-neutral-900 text-white px-1 overflow-y-auto rounded scrollbar-hide' } value={ todo.project } cols={ 30 } disabled />
                            </div>
                            <div>
                                <p className={ 'text-lg text-white'} >Comments:</p>
                                <textarea className={ 'resize-none bg-neutral-900 text-white px-1 overflow-y-auto rounded scrollbar-hide' } value={ todo.comments } cols={ 30 } disabled />
                            </div>
                            <div>
                                <p className={ 'text-lg text-white'} >Due date:</p>
                                <textarea className={ 'resize-none bg-neutral-900 text-white px-1 overflow-y-auto rounded scrollbar-hide' } value={ getDateFromIso8601(todo.due_date) } cols={ 30 } disabled />
                            </div>
                        </div>

                        if (todo.priority === 3) {
                            return(
                                <div className={ 'border-[1px] border-teal-400 rounded p-1 mt-6' } key={ todo.id } >
                                    <div className={ 'flex justify-between' } >
                                        <span className={ 'w-4/12 h-4 bg-teal-400 mt-3 mx-auto rounded' } ></span>
                                        <img src={ require('../../../resources/icons/edit.png') } width={ 30 } className={ 'mt-3 mr-5 cursor-pointer hover:scale-125' } alt={ 'edit todo' } title={ 'Edit todo' } name={ todo.id } onClick={ props.onClickEdit } />
                                        <img src={ require('../../../resources/icons/delete.png') } width={ 30 } className={ 'mt-3 mr-3 cursor-pointer hover:scale-125' } alt={ 'delete todo' } title={ 'Delete todo' } name={ todo.id } onClick={ props.onClickDelete } />
                                    </div>
                                    
                                    { content }
                                </div>
                            )
                        } else if (todo.priority === 2) {
                            return(
                                <div className={ 'border-[1px] border-[#FDD998] rounded p-1 mt-6' } key={ todo.id } >
                                    <div className={ 'flex justify-between' } >
                                        <span className={ 'w-4/12 h-4 bg-[#FDD998] mt-3 mx-auto rounded' } ></span>
                                        <img src={ require('../../../resources/icons/edit.png') } width={ 30 } className={ 'mt-3 mr-5 cursor-pointer hover:scale-125' } alt={ 'edit todo' } title={ 'Edit todo' } name={ todo.id } onClick={ props.onClickEdit } />
                                        <img src={ require('../../../resources/icons/delete.png') } width={ 30 } className={ 'mt-3 mr-3 cursor-pointer hover:scale-125' } alt={ 'delete todo' } title={ 'Delete todo' } name={ todo.id } onClick={ props.onClickDelete } />
                                    </div>
                                    
                                    { content }
                                </div>
                            )
                        } else if (todo.priority === 1) {
                            return(
                                <div className={ 'border-[1px] border-[#BB6464] rounded p-1 mt-6' } key={ todo.id } >
                                    <div className={ 'flex justify-between' } >
                                        <span className={ 'w-4/12 h-4 bg-[#BB6464] mt-3 mx-auto rounded' } ></span>
                                        <img src={ require('../../../resources/icons/edit.png') } width={ 30 } className={ 'mt-3 mr-5 cursor-pointer hover:scale-125' } alt={ 'edit todo' } title={ 'Edit todo' } name={ todo.id } onClick={ props.onClickEdit } />
                                        <img src={ require('../../../resources/icons/delete.png') } width={ 30 } className={ 'mt-3 mr-3 cursor-pointer hover:scale-125' } alt={ 'delete todo' } title={ 'Delete todo' } name={ todo.id } onClick={ props.onClickDelete } />
                                    </div>
                                    
                                    { content }
                                </div>
                            )
                        }
                        return null;
                    }
                    ) }
                </div>
            </div>
        );
    };
};

export { Upcoming };