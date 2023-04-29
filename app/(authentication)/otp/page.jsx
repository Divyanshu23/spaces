"use client"

import Link from "next/link"
import { redirect } from 'next/navigation';
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast, Flip } from "react-toastify"

import { userActions } from "@/store/userSlice"

const OTPVerification = () => {
    const dispatch = useDispatch()
    let otp = {}
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)

    if (isLoggedIn) {
        redirect("/");
    }

    const handleChange = (e) => {
        otp = { ...otp, [e.currentTarget.name]: e.currentTarget.value }
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

    const handleVerifyOTP = async (e) => {
        try {
            const response = await fetch(`http://localhost:3001/api/auth/verifyOTP`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({id:localStorage.getItem("id"), otp:otp.otp})
            })
            const jsonResponse = await response.json()
            if (jsonResponse.success === true) {
                localStorage.setItem("authToken", jsonResponse.authToken)
                dispatch(userActions.setLogin(true))
                dispatch(userActions.setUser(jsonResponse.user))
                toast.success("Signed Up", {
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

                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="otp"
                            placeholder="Enter OTP"
                            onChange={handleChange} />

                        <button
                            type="submit"
                            className="w-full text-center text-lg py-3 text-white bg-[#480cfc] rounded-lg hover:bg-[#3a0aca] focus:ring-blue-300 dark:bg-[[#480cfc]] dark:hover:bg-[#3a0aca] dark:focus:ring-[#3a0aca] focus:outline-none my-1" onClick={handleVerifyOTP}
                        >Verify</button>
                    </div>

                    <div className="text-grey-dark mt-6">
                        Existing User?{" "}
                        <Link href="/login" className="no-underline border-b border-blue text-blue">
                            Sign Up
                        </Link>.
                    </div>
                </div>
            </div>
        </>
    )
}

export default OTPVerification