"use client"

import { useRef } from "react"
import Link from "next/link"
import { redirect } from 'next/navigation';
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast, Flip } from "react-toastify"

import { userActions } from "@/store/userSlice"

const Login = () => {
    const dispatch = useDispatch()
    let user = {}
    const unsamePasswordsRef = useRef(null)
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)

    if (isLoggedIn) {
        redirect("/");
    }

    const handleChange = (e) => {
        user = { ...user, [e.currentTarget.name]: e.currentTarget.value }
    }

    useEffect(() => {
        if (isLoggedIn) {
            toast.info("Already Logged In", {
                position: toast.POSITION.BOTTOM_CENTER,
                transition: Flip,
                autoClose: 2000
            });
        }
    }, [])

    const toggleVisibility = (e) => {
        if (e.currentTarget.id === "eye-p" || e.currentTarget.id === "eye-cp") {
            e.currentTarget.style.display = "none"
            e.currentTarget.nextElementSibling.style.display = "block"
            e.currentTarget.previousElementSibling.type = "text"
        } else if (e.currentTarget.id === "eye-slash-p" || e.currentTarget.id === "eye-slash-cp") {
            e.currentTarget.style.display = "none"
            e.currentTarget.previousElementSibling.style.display = "block"
            e.currentTarget.previousElementSibling.previousElementSibling.type = "password"
        }
    }

    const handleLogin = async (e) => {
        if (user.email === undefined || user.email === "") {
            unsamePasswordsRef.current.textContent = "Email can't be empty"
            toggelunsamePasswordRef()
        } else if (user.password === undefined || user.password === "") {
            unsamePasswordsRef.current.textContent = "Password can't be empty"
            toggelunsamePasswordRef()
        } else {
            try {
                const response = await fetch(`http://127.0.0.1:3001/api/login`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(user)
                })
                const jsonResponse = await response.json()
                if (jsonResponse.success === true) {
                    localStorage.setItem("authToken", jsonResponse.authToken)
                    dispatch(userActions.setLogin(true))
                    if (jsonResponse.user.user_type == "admin")
                        dispatch(userActions.setAdmin(true))
                    dispatch(userActions.setUser(jsonResponse.user))
                    toast.success("Logged In", {
                        position: toast.POSITION.BOTTOM_CENTER,
                        transition: Flip,
                        autoClose: 2000
                    });
                } else {
                    toast.error(jsonResponse.error, {
                        position: toast.POSITION.BOTTOM_CENTER,
                        transition: Flip,
                        autoClose: 2000
                    });
                }
            } catch (error) {
                console.log(error)
                toast.error(error.message, {
                    position: toast.POSITION.BOTTOM_CENTER,
                    transition: Flip,
                    autoClose: 2000
                });
            }
        }
    }

    const toggelunsamePasswordRef = () => {
        unsamePasswordsRef.current.style.visibility = "visible"
        setTimeout(() => {
            unsamePasswordsRef.current.style.visibility = "hidden"
        }, 1500);
    }

    return (
        <>
            <div className="bg-grey-lighter flex flex-col mb-9">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Log In</h1>

                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange} />

                        <div className="flex items-center mb-4">
                            <input
                                type="password"
                                className="block border border-grey-light w-[90%] p-3 rounded"
                                name="password"
                                placeholder="Password"
                                onChange={handleChange} />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="block w-6 h-5 ml-2" id="eye-p" onClick={toggleVisibility}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="hidden w-6 h-5 ml-2" id="eye-slash-p" onClick={toggleVisibility}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                        </div>

                        <div className="invisible text-red-600 my-1" ref={unsamePasswordsRef}>
                            <div className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-2 inline">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                <p className="inline">Password and Confirm Password should be same</p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full text-center text-lg py-3 text-white bg-[#480cfc] rounded-lg hover:bg-[#3a0aca] focus:ring-blue-300 dark:bg-[[#480cfc]] dark:hover:bg-[#3a0aca] dark:focus:ring-[#3a0aca] focus:outline-none my-1" onClick={handleLogin}
                        >Login</button>
                    </div>

                    <div className="text-grey-dark mt-6">
                        New User?{" "}
                        <Link href="/signup" className="no-underline border-b border-blue text-blue">
                            Sign Up
                        </Link>.
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login