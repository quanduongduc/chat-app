import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Login from "../components/auth/LogIn";
import Register from '../components/auth/Register'

function AuthPage({ route }) {

    const { authState: { isAuthenticated } } = useContext(AuthContext)


    if (isAuthenticated && route === 'login') {
        return <Navigate to='/messenger' />
    }

    return (
        <div className="bg-auth-bg bg-cover">

            {route === "register" ?
                <Register />
                :
                <Login />
            }
        </div>
    )
}

export default AuthPage;