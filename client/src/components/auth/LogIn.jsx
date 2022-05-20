import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { passwordValidate, userNameValidate } from '../../utils/FormValidator'
import Button from '../form/Button'
import TextField from '../form/TextField'

const Login = () => {
    const [userInput, setUserInput] = useState({
        userName: '',
        password: '',
    })

    const [errors, setErrors] = useState({});
    const { login } = useContext(AuthContext)

    const handleChange = (e) => {
        const { value, name } = e.target;
        setUserInput(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(userInput)
    }

    const handleOnBlur = (validateCb, input, type) => {
        const validateRes = validateCb(input, type);
        if (!validateRes.isValid) {
            setErrors({
                ...errors, [type]: {
                    message: validateRes.message,
                    rules: validateRes.rules
                }
            })
        } else {
            delete errors[type];
            setErrors({ ...errors })
        }
    }

    const Inputs = [
        { id: 1, type: "text", placeholder: "UserName", value: `${userInput.userName}`, name: 'userName', onBlur: function (e) { handleOnBlur(userNameValidate, userInput.userName, e.target.name) }, },
        {
            id: 2, type: "password", placeholder: "Password", value: `${userInput.password}`, name: 'password', onBlur: function (e) {
                handleOnBlur(passwordValidate, userInput.password, e.target.name)
            },
        },
    ]

    return (
        <main className="h-screen w-full banner">
            <div className="flex flex-col justify-center items-center h-screen">
                <form className="bg-white w-96 mt-6 p-4 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-6">
                        {Inputs.map(input => (
                            <div>
                                <TextField
                                    key={input.id}
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    value={input.value}
                                    name={input.name}
                                    onChange={handleChange}
                                    onBlur={input.onBlur}
                                    onFocus={input.onFocus}
                                />
                                {
                                    errors[input.name] &&
                                    <div className='flex gap-2 flex-col mt-2'>
                                        <p className='text-red-500 font-bold'>{errors[input.name].message}</p>
                                        {
                                            errors[input.name].rules &&
                                            <ul className='list-disc'>
                                                {
                                                    errors[input.name].rules.map((rule) => <li className='ml-5'>{rule}</li>)
                                                }
                                            </ul>
                                        }

                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                    <Button disabled={Object.keys(errors).length > 0} text="Sign In" />
                    <Link to="/register">
                        <p className="text-base text-primary text-center my-6 hover:underline">Need an account ?</p>
                    </Link>
                </form>
            </div >
        </main >
    )
}

export default Login