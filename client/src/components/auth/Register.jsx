import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import imagePicker from '../../assets/images/Frame.svg'
import { AuthContext } from '../../context/AuthContext'
import { confirmPasswordValidate, nickNameValidate, passwordValidate, userNameValidate } from '../../utils/FormValidator'
import Avatar from '../avatar/Avatar'
import Button from '../form/Button'
import TextField from '../form/TextField'

const Register = () => {
    const [userInput, setUserInput] = useState({
        nickName: '',
        userName: '',
        avatar: null,
        password: '',
        confirmPassword: '',
    })

    const [errors, setErrors] = useState({});
    const { register, authState: { isAuthenticated } } = useContext(AuthContext);

    const handleChange = (e) => {
        const { value, name, files } = e.target;
        if (files) {
            if (files.length) { // if file was chosen
                setUserInput(prev => {
                    const preview = URL.createObjectURL(files[0]);
                    files[0].preview = preview;
                    return {
                        ...prev,
                        avatar: files[0],
                    }
                })
            }
        } else {
            setUserInput(prev => {
                return {
                    ...prev,
                    [name]: value,
                }
            })
        }
    }

    useEffect(() => {
        return () => {
            if (userInput.avatar) {
                URL.revokeObjectURL(userInput.avatar.preview);
            }
        }
    }, [userInput.avatar])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const inputFormData = new FormData();
        for (const key in userInput) {
            inputFormData.append(key, userInput[key]);
        }
        await register(inputFormData);
    }

    function handleOnBlur(validateCb, type, ...cbArgs) {
        const validateRes = validateCb(...cbArgs);
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
        {
            id: "nickName", type: "text", placeholder: "nickName", value: `${userInput.nickName}`, name: 'nickName',
            onBlur: function (e) { handleOnBlur(nickNameValidate, e.target.name, userInput.nickName) }
        },
        {
            id: "text", type: "text", placeholder: "UserName", value: `${userInput.userName}`, name: 'userName',
            onBlur: function (e) { handleOnBlur(userNameValidate, e.target.name, userInput.userName) }
        },
        {
            id: "password", type: "password", placeholder: "Password", value: `${userInput.password}`, name: 'password',
            onBlur: function (e) { handleOnBlur(passwordValidate, e.target.name, userInput.password) }
        },
        {
            id: "confirmPassword", type: "password", placeholder: "confirmPassword", value: `${userInput.confirmPassword}`, name: 'confirmPassword',
            onBlur: function (e) { handleOnBlur(confirmPasswordValidate, e.target.name, userInput.confirmPassword, userInput.password) }
        },
        { id: "image", type: "file", accept: "image/*", placeholder: "", hidden: true, name: 'image', },
    ]

    return (
        <main className="h-screen w-full banner">
            <div className="flex flex-col justify-center items-center h-screen">
                <form className="bg-white w-96 mt-6 p-4 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-6">
                        {Inputs.map((input, index) => (
                            <div>
                                <TextField className={`${input.hidden ? "hidden" : ""}`}
                                    id={input.id}
                                    key={index}
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    value={input.value}
                                    name={input.name}
                                    accept={input.accept}
                                    onChange={handleChange}
                                    onBlur={input.onBlur}
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
                        <label className='flex gap-2 items-center' htmlFor="image">
                            <div className='w-6 h-6'>
                                <img src={imagePicker} alt="choose attachment" />
                            </div>
                            <p>Choose Your Profile Image</p>
                        </label>
                        {userInput.avatar &&
                            <div>
                                <Avatar avatarPath={userInput.avatar.preview}></Avatar>
                            </div>}
                    </div>

                    <Button disabled={Object.keys(errors).length > 0}>Sign Up</Button>
                    <Link to="/login">
                        <p className="text-base text-primary text-center my-6 hover:underline">
                            {isAuthenticated ? "Back To Chat" :
                                "Already have an account ?"
                            }</p>
                    </Link>
                </form>
            </div>
        </main>
    )
}

export default Register