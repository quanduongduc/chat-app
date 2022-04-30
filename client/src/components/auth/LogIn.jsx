import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import Button from '../form/Button'
import TextField from '../form/TextField'
import { AuthContext } from '../../context/AuthContext'

const Login = () => {
    const [userInput, setUserInput] = useState({
        userName: '',
        password: '',
    })
    const { login } = useContext(AuthContext)

    // handle change
    const handleChange = (e) => {
        const { value, name } = e.target;
        setUserInput(prev => {
            return {
                ...prev,
                [name]: value
            }
        })

    }
    //handle submit form 
    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(userInput)
    }

    //form inputs
    const Inputs = [
        { id: 1, type: "text", placeholder: "UserName", value: `${userInput.userName}`, name: 'userName' },
        { id: 2, type: "password", placeholder: "Password", value: `${userInput.password}`, name: 'password' },
    ]
    return (
        <main className="h-screen w-full banner">
            <div className="flex flex-col justify-center items-center h-screen">
                <form className="bg-white w-96 mt-6 p-4 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-6">
                        {Inputs.map(input => (
                            <TextField
                                key={input.id}
                                type={input.type}
                                placeholder={input.placeholder}
                                value={input.value}
                                name={input.name}
                                onChange={handleChange}
                            />
                        ))}
                    </div>
                    <Button text="Sign In" />
                    <Link to="/register">
                        <p className="text-base text-primary text-center my-6 hover:underline">Need an account ?</p>
                    </Link>
                </form>
            </div>
        </main>
    )
}

export default Login