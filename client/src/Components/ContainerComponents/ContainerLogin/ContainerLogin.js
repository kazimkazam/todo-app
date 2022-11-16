import { Login } from "../../PresentationalComponents/Login/Login";
import { loginApi } from "../../../resources/utils/callBackendApi";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { selectEmail, selectPassword, selectIsLoggedIn, selectFetchStatus } from "../../../redux/features/loginSlice";
import { handleChange } from '../../../redux/features/loginSlice';
import { useEffect } from "react";

const ContainerLogin = () => {
    const email = useSelector(selectEmail);
    const password = useSelector(selectPassword);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const fetchStatus = useSelector(selectFetchStatus);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    // check if user/password input warning should or should not appear
    useEffect(() => {
        if (isLoggedIn && fetchStatus === 'succeded') {
            document.getElementById('warning').className = 'hidden text-center bg-amber-700 w-1/4 text-lg rounded-t';
            navigate('/inbox');
        } else if (fetchStatus === 'idle') {
            document.getElementById('warning').className = 'hidden text-center bg-amber-700 w-1/4 text-lg rounded-t';
        } else {
            setTimeout(() => {
                const element = document.getElementById('warning');
                if (element) {
                    element.className = 'text-center bg-amber-700 w-1/4 text-lg rounded-t';
                };
            }, 500);
        };
    }, [ isLoggedIn, fetchStatus, navigate, dispatch ]);

    // handle changes in the inputs by updating the store state
    const eventHandler = (event) => {
        dispatch(handleChange(event));
    };

    // dispatch the login attempt on button click
    const clickHandler = () => {
        const credentials = {
            email: email,
            password: password
        };

        dispatch(loginApi(credentials));
    };

    // dispatch the login attempt on enter key keydown
    const enterKeyDownHandler = (event) => {
        const credentials = {
            email: email,
            password: password
        };

        if (event.key === 'Enter') {
            dispatch(loginApi(credentials));
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