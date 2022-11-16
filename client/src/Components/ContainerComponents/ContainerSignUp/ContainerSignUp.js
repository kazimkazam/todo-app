import { SignUp } from "../../PresentationalComponents/SignUp/SignUp";
import { useSelector, useDispatch } from "react-redux";
import { selectUsername, selectEmail, selectPassword, selectIsSignedUp, selectFetchStatus } from "../../../redux/features/signUpSlice";
import { handleChange, handleReset } from "../../../redux/features/signUpSlice";
import { useNavigate } from "react-router-dom";
import { signUpApi } from "../../../resources/utils/callBackendApi";
import { useEffect } from "react";

const ContainerSignUp = () => {
    const username = useSelector(selectUsername);
    const email = useSelector(selectEmail);
    const password = useSelector(selectPassword);
    const isSignedUp = useSelector(selectIsSignedUp);
    const fetchStatus = useSelector(selectFetchStatus);

    const dispatch = useDispatch();

    const navigate = useNavigate();

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
    const clickHandler = () => {
        const credentials = {
            username: username,
            email: email,
            password: password
        };
        dispatch(signUpApi(credentials));
    };

    // dispatch the sign up attempt on enter key keydown
    const enterKeyDownHandler = (event) => {
        const credentials = {
            username: username,
            email: email,
            password: password
        };

        if (event.key === 'Enter') {
            dispatch(signUpApi(credentials));
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