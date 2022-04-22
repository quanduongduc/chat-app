import Auth from "../conponents/auth/Auth";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
function AuthPage({ route }) {

    const { authState: { isAuthenticated } } = useContext(AuthContext)


    if (isAuthenticated && route === 'login') {
        return <Navigate to='/messenger' />
    }

    return (
        <Auth route={route}></Auth>
    )
}

export default AuthPage;