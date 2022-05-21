import { useContext } from "react";
import { Navigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";

function ProtectedRouter({ Component, ...rest }) {
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


