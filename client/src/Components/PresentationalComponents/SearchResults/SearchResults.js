import { getDateFromIso8601 } from '../../../resources/utils/getDateFromIso8601';

const SearchResults = (props) => {
    if (props.searchResults.length === 0) {
        return(
            <div className={ 'm-4' } onClick={ props.closeWindowsOnClick } >
            <div>
                <p className={ 'text-lg text-white underline underline-offset-4' } >Searching for: { props.topic }</p>
            </div>

            <div className={ 'flex flex-wrap ml-10 h-min' }>
                <p data-testid={ 'noResultsFoundWarning' } >No todos related with { props.topic } were found...</p>
            </div>
        </div>
        );
    } else {
        return(
            <div className={ 'm-4' } onClick={ props.closeWindowsOnClick } >
                <div>
                    <p className={ 'text-lg text-white underline underline-offset-4' } >Searching for: { props.topic }</p>
                </div>
    
                <div className={ 'flex flex-wrap ml-10 h-min' }>
                    { props.searchResults.map(todo => {
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
                                        <img src={ require('../../../resources/icons/edit.png') } width={ 30 } className={ 'mt-3 mr-4 cursor-pointer hover:scale-125' } alt={ 'edit todo' } title={ 'Edit todo' } name={ todo.id } onClick={ props.onClickEdit } />
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
    };
};

export { SearchResults }