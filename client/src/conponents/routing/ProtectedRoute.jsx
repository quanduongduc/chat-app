import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from 'react-router-dom'

function ProtectedRouter({ Component, ...rest }) {
    console.log("Protected rerender");
    const auth = useContext(AuthContext).authState;
    const { isAuthenticated, loading } = auth;

    if (loading) {
        return (
            loading &&
            <img src='/Spinner-1.2s-231px.gif' alt="" />
        )
    }

    if (isAuthenticated) {
        return <Component {...rest} ></Component>
    } else {
        return <Navigate to='/login'></Navigate>
    }
}

export default ProtectedRouter;


