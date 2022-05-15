import { createContext, useReducer, useEffect, useState } from "react";
import axios from 'axios';
import { apiURL } from "../constants/constants";
import { authReducer } from "../reducers/authReducer";
import { useNavigate } from "react-router-dom";
import Toast from '../components/toast/Toast'
import ToastModal from "../components/toast/ToastModal";

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [authState, dispatch] = useReducer(authReducer, {
        isAuthenticated: false,
        loading: true,
        user: null,
    });

    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null,
    })

    const navigate = useNavigate();

    useEffect(() => {
        authenticate();
    }, [])

    async function authenticate() {
        try {
            const res = await axios.get(`${apiURL}/auth`, {
                withCredentials: true
            });
            if (res.data.success) {
                dispatch({
                    type: 'SET_AUTH',
                    payload: {
                        isAuthenticated: true,
                        user: res.data.user,
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: 'SET_AUTH',
                payload: {
                    isAuthenticated: false,
                    user: null,
                }
            })
            if (error.response) {
                setShowToast({
                    show: true,
                    message: error.response.data.message,
                    type: "error"
                })
            }
        }
    }

    async function login(formData) {
        try {
            const loginRes = await axios.post(`${apiURL}/auth/login`, formData, {
                withCredentials: true,
            });
            if (loginRes.data.success) {
                await authenticate();
            }
            return loginRes.data
        } catch (error) {
            if (error.response) {
                setShowToast({
                    show: true,
                    message: error.response.data.message,
                    type: "error"
                })
            }
            console.log(error);
        }
    }

    async function register(formData) {
        try {
            const registerRes = await axios.post(`${apiURL}/auth/register`, formData, {
                withCredentials: true,
            })
            if (registerRes.data.success) {
                await authenticate();
                navigate('/messenger')
            }
            return registerRes.data
        } catch (error) {
            console.log(error.response);
            if (error.response) {
                setShowToast({
                    show: true,
                    message: error.response.data.message,
                    type: "error"
                })
            }
            console.log(error);
        }
    }

    async function logout() {
        try {
            const res = await axios.post(`${apiURL}/auth/logout`, {}, {
                withCredentials: true,
            })
            if (res.data.success) {
                dispatch({
                    type: 'SET_AUTH',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    }
                })
            }
        } catch (error) {
            if (error.response) {
                setShowToast({
                    show: true,
                    message: error.response.data.message,
                    type: "error"
                })
            }
            console.log(error);
        }
    }


    const authContextData = {
        authState,
        login,
        register,
        logout,
    }

    console.log("rerender");
    console.log(showToast);
    return <AuthContext.Provider value={authContextData
    }>
        {children}
        {
            showToast.show &&
            <ToastModal toast={<Toast message={showToast.message} type={showToast.type} setShowToast={setShowToast}></Toast>}>
            </ToastModal>
        }
    </AuthContext.Provider>
}

export default AuthProvider;