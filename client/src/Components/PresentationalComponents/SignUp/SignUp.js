import { NavLink } from "react-router-dom";

const SignUp = (props) => {
    return(
        <div className={ 'Authentication bg-neutral-900 text-slate-50 font-sans h-screen flex flex-col justify-between' } >
            <div className={ 'flex flex-col justify-center place-items-center my-40' }>
                <div id={ 'warning' } className={ 'hidden text-center bg-amber-700 w-1/4 text-lg rounded-t' } >
                    <p>Ooops... Wrong email and/or password! Please try again.</p>
                </div>
                
                <div className={ 'bg-[#0B5269] flex flex-col justify-evenly place-items-center w-1/4 h-96 rounded' } >
                    <div className={ 'flex place-items-center' } >
                        <img src={ require('../../../resources/logo/logo192.png') } alt={ 'page logo' } className={ 'w-12 h-12' } />
                        <h1 className={ 'text-2xl font-bold pl-2' } >todo</h1>
                    </div>

                    <div>
                        <input className={ 'text-center bg-neutral-50 placeholder:text-neutral-900 ring-2 ring-black text-black w-72 h-7 rounded-md outline-none hover:bg-neutral-900 hover:ring-white hover:text-white hover:placeholder:text-white focus:bg-neutral-900 focus:text-white focus:ring-white' } id={ 'username' } name={ 'username' } type={ 'text' } placeholder={ 'Username' } onChange={ props.onChange } onKeyDown={ props.onKeyDown } />
                    </div>

                    <div>
                        <input className={ 'text-center bg-neutral-50 placeholder:text-neutral-900 ring-2 ring-black text-black w-72 h-7 rounded-md outline-none hover:bg-neutral-900 hover:ring-white hover:text-white hover:placeholder:text-white focus:bg-neutral-900 focus:text-white focus:ring-white' } id={ 'email' } name={ 'email' } type={ 'email' } placeholder={ 'Email' } onChange={ props.onChange } onKeyDown={ props.onKeyDown } />
                    </div>
                    
                    <div>
                        <input className={ 'text-center bg-neutral-50 placeholder:text-neutral-900 ring-2 ring-black text-black w-72 h-7 rounded-md outline-none hover:bg-neutral-900 hover:ring-white hover:text-white hover:placeholder:text-white focus:bg-neutral-900 focus:text-white focus:ring-white' } id={ 'password' } name={ 'password' } type={ 'password' } placeholder={ 'Password' } onChange={ props.onChange } onKeyDown={ props.onKeyDown } />
                    </div>
                    
                    <input className={ 'bg-neutral-900 font-bold text-xl w-48 h-14 rounded outline-none ring-2 ring-neutral-50 cursor-pointer' } type={ 'submit' } value={ 'Sign Up' } onClick={ props.onClick } />
                </div>

                <div className={ 'bg-[#2FA4FF] my-12 flex justify-center place-items-center font-bold text-xl w-64 h-14 rounded outline-none ring-2 ring-neutral-50 cursor-pointer' }>
                    <NavLink to={ '/' } >Or log into your account</NavLink>
                </div>
            </div>

            <div className={ 'bg-[#0B5269] text-center text-lg flex flex-col justify-center place-items-center h-32' } >
                <h3 className={ 'font-bold my-1' } >todo 2022 ©</h3>
            </div>
        </div>
    );
};

export { SignUp };