import { NavLink } from "react-router-dom";

const SignUp = (props) => {
    return(
        <div className={ 'bg-neutral-900 text-slate-50 font-sans h-screen flex flex-col justify-between' } >
            <div className={ 'flex flex-col justify-center place-items-center xxl:mt-40 xl:mt-32 lg:mt-32' }>
                <div id={ 'signupWarning' } className={ 'hidden text-center bg-amber-700 w-1/4 text-lg rounded-t' } data-testid={ 'signupWarning' } >
                    <p>Ooops... Username is already in use! Please try again.</p>
                </div>
                
                <div className={ 'bg-[#0B5269] flex flex-col justify-evenly place-items-center xxl:w-1/4 xl:w-1/4 lg:w-72 h-96 rounded' } >
                    <div className={ 'flex place-items-center' } >
                        <img src={ require('../../../resources/logo/logo192.png') } alt={ 'page logo' } className={ 'w-12 h-12' } />
                        <h1 className={ 'text-2xl font-bold pl-2' } >todo</h1>
                    </div>

                    <input className={ 'text-center bg-neutral-50 placeholder:text-neutral-900 ring-2 ring-black text-black xxl:w-72 xl:w-72 lg:w-60 h-7 rounded-md outline-none hover:bg-neutral-900 hover:ring-white hover:text-white hover:placeholder:text-white focus:bg-neutral-900 focus:text-white focus:ring-white' } id={ 'username' } data-testid={ 'signupUsername' } name={ 'username' } type={ 'text' } placeholder={ 'Username' } onChange={ props.onChange } onKeyDown={ props.onKeyDown } />

                    <div id={ 'signupEmailWarning' } className={ 'hidden text-center bg-amber-700 w-full text-lg rounded' } data-testid={ 'signupEmailWarning' } >
                        <p>Please insert a valid email address!</p>
                    </div>
                    <input className={ 'text-center bg-neutral-50 placeholder:text-neutral-900 ring-2 ring-black text-black xxl:w-72 xl:w-72 lg:w-60 h-7 rounded-md outline-none hover:bg-neutral-900 hover:ring-white hover:text-white hover:placeholder:text-white focus:bg-neutral-900 focus:text-white focus:ring-white' } id={ 'email' } data-testid={ 'signupEmail' } name={ 'email' } type={ 'email' } placeholder={ 'Email' } onChange={ props.onChange } onKeyDown={ props.onKeyDown } />
                    
                    <div id={ 'signupPasswordWarning' } className={ 'hidden text-center bg-amber-700 w-full text-lg rounded' } data-testid={ 'signupPasswordWarning' } >
                        <p>Please insert a valid password! It must contain at least 8 characters, 1 capital letter and 1 number.</p>
                    </div>
                    <input className={ 'text-center bg-neutral-50 placeholder:text-neutral-900 ring-2 ring-black text-black xxl:w-72 xl:w-72 lg:w-60 h-7 rounded-md outline-none hover:bg-neutral-900 hover:ring-white hover:text-white hover:placeholder:text-white focus:bg-neutral-900 focus:text-white focus:ring-white' } id={ 'password' } data-testid={ 'signupPassword' } name={ 'password' } type={ 'password' } placeholder={ 'Password' } onChange={ props.onChange } onKeyDown={ props.onKeyDown } />
                    
                    <input className={ 'bg-teal-500 font-bold text-xl w-48 h-14 rounded outline-none ring-2 ring-neutral-50 cursor-pointer' } type={ 'submit' } value={ 'Sign Up' } data-testid={ 'signupSubmit' } onClick={ props.onClick } />
                </div>

                <div className={ 'bg-[#2FA4FF] my-12 flex justify-center place-items-center font-bold text-xl w-64 h-14 rounded outline-none ring-2 ring-neutral-50 cursor-pointer' }>
                    <NavLink to={ '/' } >Or log into your account</NavLink>
                </div>
            </div>

            <div className={ 'bg-[#0B5269] text-center text-lg flex flex-col justify-center place-items-center xxl:h-32 xl:h-32 lg:h-20' } >
                <h3 className={ 'font-bold my-1' } >todo 2023 ??</h3>
            </div>
        </div>
    );
};

export { SignUp };