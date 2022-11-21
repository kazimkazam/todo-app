import { SignUp } from "../../PresentationalComponents/SignUp/SignUp";
import { useSelector, useDispatch } from "react-redux";
import { selectUsername, selectEmail, selectPassword, selectIsSignedUp, selectFetchStatus } from "../../../redux/features/signUpSlice";
import { handleChange, handleReset } from "../../../redux/features/signUpSlice";
import { useNavigate } from "react-router-dom";
import { signUpApi } from "../../../resources/utils/callBackendApi";
import { useEffect } from "react";
import { selectCsrfToken } from "../../../redux/features/csrfTokenSlice";
import { getCsrfToken } from "../../../resources/utils/getCsrfToken";

const ContainerSignUp = () => {
    const username = useSelector(selectUsername);
    const email = useSelector(selectEmail);
    const password = useSelector(selectPassword);
    const isSignedUp = useSelector(selectIsSignedUp);
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
        if ((isSignedUp && fetchStatus === 'succeded')) {
            document.getElementById('warning').className = 'hidden text-center bg-amber-700 w-1/4 text-lg rounded-t';
            navigate('/');
            dispatch(handleReset());
        } else if (fetchStatus === 'idle') {
            document.getElementById('warning').className = 'hidden text-center bg-amber-700 w-1/4 text-lg rounded-t';
        } else {
            setTimeout(() => {
                document.getElementById('warning').className = 'text-center bg-amber-700 w-1/4 text-lg rounded-t';
            }, 500);
        };
    }, [ isSignedUp, fetchStatus, navigate, dispatch ]);

    // handle changes in the inputs by updating the store state
    const eventHandler = (event) => {
        dispatch(handleChange(event));
    };

    // dispatch the sign up attempt on button click
    const signupHandler = () => {
        // get a new csrf token
        dispatch(getCsrfToken());
        const credentials = {
            signupCredentials: {
                username: username,
                email: email,
                password: password
            },
            csrfToken: csrfToken
        };
        dispatch(signUpApi(credentials));
    };

    const clickHandler = () => {
        signupHandler();
    };

    // dispatch the sign up attempt on enter key keydown
    const enterKeyDownHandler = (event) => {
        if (event.key === 'Enter') {
            signupHandler();
        };
    };
    
    return(
        <SignUp
        onChange={ eventHandler }
        onClick={ clickHandler }
        onKeyDown={ enterKeyDownHandler }
        />
    );
};

export { ContainerSignUp };