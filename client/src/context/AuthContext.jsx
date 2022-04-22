import { createContext, useReducer, useEffect } from "react";
import axios from 'axios';
import { apiURL } from "../constants/constants";
import { authReducer } from "../reducers/authReducer";

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [authState, dispatch] = useReducer(authReducer, {
        isAuthenticated: false,
        loading: true,
        user: null,
    });

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
            if (error.response.data) {
                console.log(error.response.data);
            }
            console.log(error)

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
            if (error.response.data) {
                console.log(error.response.data);
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
            }
            return registerRes.data
        } catch (error) {
            if (error.response.data) {
                console.log(error.response.data);
            }
            console.log(error);
        }
    }


    const authContextData = {
        authState,
        login,
        register,
    }


    return <AuthContext.Provider value={authContextData
    }>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider;