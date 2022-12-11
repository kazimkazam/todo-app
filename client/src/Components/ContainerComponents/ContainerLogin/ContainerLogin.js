import { Login } from "../../PresentationalComponents/Login/Login";
import { loginApi } from "../../../resources/utils/callBackendApi";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { selectEmail, selectPassword, selectFetchStatus } from "../../../redux/features/loginSlice";
import { handleChange } from '../../../redux/features/loginSlice';
import { useEffect } from "react";
import { selectCsrfToken } from "../../../redux/features/csrfTokenSlice";
import { getCsrfToken } from "../../../resources/utils/getCsrfToken";

const ContainerLogin = () => {
    const email = useSelector(selectEmail);
    const password = useSelector(selectPassword);
    const fetchStatus = useSelector(selectFetchStatus);
    var csrfToken = useSelector(selectCsrfToken);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    // get csrf token at first render
    useEffect(() => {
        dispatch(getCsrfToken());
    }, [ ]);

    // check if user/password input warning should or should not appear
    useEffect(() => {
        if (fetchStatus === 'succeded') {
            document.getElementById('loginWarning').className = 'hidden text-center bg-amber-700 w-1/4 text-lg rounded-t';
            navigate('/inbox');
        } else if (fetchStatus === 'idle') {
            document.getElementById('loginWarning').className = 'hidden text-center bg-amber-700 w-1/4 text-lg rounded-t';
        } else if (fetchStatus === 'failed') {
                const element = document.getElementById('loginWarning');
                element.className = 'text-center bg-amber-700 w-1/4 text-lg rounded-t';
        };
    }, [ fetchStatus ]);

    // handle changes in the inputs by updating the store state
    const eventHandler = (event) => {
        dispatch(handleChange(event));
    };

    // dispatch the login attempt on button click
    const loginHandler = () => {
        // get a new csrf token
        dispatch(getCsrfToken());
        let credentials = {
            loginCredentials: {
                email: email,
                password: password
            },
            csrfToken: csrfToken
        };
        dispatch(loginApi(credentials));
    };

    const clickHandler = () => {
        loginHandler();
    };

    // dispatch the login attempt on enter key keydown
    const enterKeyDownHandler = (event) => {
        if (event.key === 'Enter') {
            loginHandler();
        };
    };

    return(
        <Login
        onChange={ eventHandler }
        onClick={ clickHandler }
        onKeyDown={ enterKeyDownHandler }
        />
    );
};

export { ContainerLogin };