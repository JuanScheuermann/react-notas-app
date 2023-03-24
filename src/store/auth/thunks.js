import { 
    loginWithEmailPassword, 
    logOutFirebase, 
    registerUserWithEmailPassword, 
    signInWithGoogle 
} from "../../firebase/probiders";
import { clearNotesLogOut } from "../journal/journalSlice";

import { chekingCredentials, login, logout } from "./authSlice"


export const checkingAuthentication = (email = '', password = '') => {

    return async(dispatch) => {

        dispatch(chekingCredentials());
    };
};

export const startGoogleSignIn = () => {

    return async (dispatch) => {

        dispatch(checkingAuthentication());

        const result = await signInWithGoogle();
        if(!result.ok){
            return dispatch(logout(result.errorMessage));
        }

        dispatch(login(result));
    }
};

export const startCreatingUserWithEmailPassword = ({email , password, displayName}) =>{

    return async(dispatch) => {

        dispatch(chekingCredentials());

        const {ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({email, password, displayName});

        if(!ok) return dispatch(logout({errorMessage}))

        dispatch(login({uid, email, displayName, photoURL}))
    }
}

export const startLoginWithEnailPassword = ({email, password}) => {

    return async(dispatch) => {
        dispatch(chekingCredentials);

        const {ok, uid, errorMessage, displayName, photoURL} = await loginWithEmailPassword({email, password});

        if(!ok) return dispatch(logout({errorMessage}));

        dispatch(login({uid, email, displayName, photoURL }));
    };
};

export const startLogOut = () => {
    return async(dispatch) => {
        

        await logOutFirebase();
        dispatch(clearNotesLogOut());
        dispatch(logout({}));
    }
}