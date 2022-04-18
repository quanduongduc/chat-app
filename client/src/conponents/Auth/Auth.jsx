import { useState, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Auth({ route }) {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [authForm, setAuthForm] = useState({
        nickName: "",
        userName: "",
        password: "",
        confirmPassword: "",
    })

    const { login, register } = auth;
    const { nickName, userName, password, confirmPassword } = authForm

    function handleFormChange(e) {
        setAuthForm(
            {
                ...authForm,
                [e.target.name]: e.target.value
            }
        )
    }

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const res = await login({
                userName,
                password
            });
            if (res.success) {
                navigate('/messenger')
            }
        } catch (error) {

        }
    }

    async function handleRegister(e) {
        e.preventDefault();
        try {
            const res = await register({
                nickName,
                userName,
                password,
                confirmPassword
            })
            if (res.success) {
                navigate('/messenger')
            }
        } catch (error) {
        }
    }

    return (
        <form onSubmit={
            route === 'register' ? handleRegister : handleLogin
        }>
            {
                route === 'register' && <input type="text" name="nickName" value={nickName} placeholder="Enter nickName Here" onChange={handleFormChange} />
            }
            <input type="text" name="userName" value={userName} placeholder="Enter userName Here" onChange={handleFormChange} />
            <input type="password" name="password" value={password} placeholder="Enter Password here" onChange={handleFormChange} />
            {
                route === "register" &&
                <>
                    <input type="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword} placeholder={"Password Confirmation"} onChange={handleFormChange} />
                </>
            }
            {
                route === "register" ?
                    <>
                        <button type="submit">register</button>
                        <Link to="/login">Move to Login</Link >
                    </> :
                    <>
                        <button type="submit">Login</button>
                        <Link to="/register">Move to Register</Link >
                    </>
            }
            {

            }
        </form>
    )
}

export default Auth;