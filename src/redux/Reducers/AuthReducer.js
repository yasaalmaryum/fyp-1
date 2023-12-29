import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosInstance from "../../API/Axios/AxiosConfig";

const initialState = {
    token: null,
    profile: {
        name: null,
        email: null,
        phone: null,
        address: null,
        dp_uri: {
            id: null,
            file: null,
        },
        is_student: null,
        is_staff: null,
        is_superuser: null,
        date_joined: null,
        studentProfile: {
            id: null,
            department_data: {
                id: null,
                name: null,
            },
            reg_no: null,
            section: null,
            semester: null,
            program: null,
            isDeleted: null,

        },
        staffProfile: {
            id: null,
            department_data: {
                id: null,
                name: null,
            },
            staff_id: null,
            isDeleted: null,
        }
    }
}

export const AUTH_ACTIONS = {
    CLEAR_SESSION: "CLEAR_SESSION",
    SET_SESSION: "SET_SESSION",
    UPDATE_SESSION: "UPDATE_SESSION",
}


const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_ACTIONS.CLEAR_SESSION:
            return initialState;
        case AUTH_ACTIONS.SET_SESSION:
            return {
                ...action.payload
            }
        case AUTH_ACTIONS.UPDATE_SESSION:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}


export function useSession() {
    const dispatch = useDispatch();
    const session = useSelector(state => state.AuthReducer);
    const SESSION_STORAGE_KEY = "DIGI_DOCS_LOGIN_SESSION";

    const clearSession = () => {
        axiosInstance.defaults.headers['Authorization'] = null;
        localStorage.removeItem(SESSION_STORAGE_KEY);
        dispatch({ type: AUTH_ACTIONS.CLEAR_SESSION })
    }
    const setSession = (payload, save_in_storage = true) => {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(payload));
        axiosInstance.defaults.headers['Authorization'] = `token ${payload.token}`;
        dispatch({ type: AUTH_ACTIONS.SET_SESSION, payload: payload })
    }
    const updateSession = (payload) => {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(payload));
        dispatch({ type: AUTH_ACTIONS.UPDATE_SESSION, payload: payload })
    }
    const isUserAuthenticated = () => {
        return session.token !== null;
    }

    const loadSession = async () => {
        let session = await localStorage.getItem(SESSION_STORAGE_KEY);
        if (session === null) return;
        session = JSON.parse(session);
        axiosInstance.defaults.headers['Authorization'] = `token ${session.token}`;
        dispatch({ type: AUTH_ACTIONS.SET_SESSION, payload: session })
    }

    const authActions = {
        clearSession: clearSession,
        setSession: setSession,
        updateSession: updateSession,
        isUserAuthenticated: isUserAuthenticated,
        loadSession: loadSession,

    }

    return { session, authActions, SESSION_STORAGE_KEY };
}

export function SessionWrapper({ children }) {
    const { authActions } = useSession();
    const [isSessionLoaded, setIsSessionLoaded] = useState(false);
    useEffect(() => {
        authActions.loadSession().then(() => {
            setIsSessionLoaded(true);
        });

    }, []);
    if (!isSessionLoaded) return (<></>)
    return children;
}

export default AuthReducer;