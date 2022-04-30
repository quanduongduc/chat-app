import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Form/Button'
import TextField from '../components/Form/TextField'
import { AuthContext } from '../../context/AuthContext'

const SignIn = () => {
    const [userInput, setUserInput] = useState({
        email: '',
        password: '',
    })
    const { signInUser } = useAuth()

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
        await signInUser(userInput.email, userInput.password)
    }

    //form inputs
    const Inputs = [
        { id: 1, type: "email", placeholder: "Email", value: `${userInput.email}`, name: 'email' },
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
                    <Link to="/signup">
                        <p className="text-base text-primary text-center my-6 hover:underline">Need an account ?</p>
                    </Link>
                </form>
            </div>
        </main>
    )
}

export default SignIn