"use client";

import Image from "next/image";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast, Flip } from "react-toastify"
import { useRouter } from "next/navigation";

import { userActions } from "@/store/userSlice";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch()

  useEffect(() => {
    const adminLogin = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/adminlogin`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "auth-token": localStorage.getItem("authToken")
          }
        })
        const jsonResponse = await response.json()
        if (jsonResponse.success === true) {
          dispatch(userActions.setLogin(true))
          dispatch(userActions.setAdmin(true))
          dispatch(userActions.setUser(jsonResponse.user))
          toast.success("Logged In", {
            position: toast.POSITION.BOTTOM_CENTER,
            transition: Flip,
            autoClose: 2000
          });
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (localStorage.getItem("authToken") != null && localStorage.getItem("authToken") != undefined) {
      adminLogin()
    }
  }, [])

  const lhc = useRef(null)
  const lab = useRef(null)
  const user = useRef(null)

  const [lhcArray, setlhcArray] = useState([])
  const [labArray, setlabArray] = useState([])
  const [userLHCArray, setUserLHCArray] = useState([])
  const [userLabArray, setUserLabArray] = useState([])


  const handleLHCBookings = async (e) => {
    const lhcNo = lhc.current.value
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/lhcbookings?hall=${lhcNo}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("authToken")
        }
      })

      const jsonResponse = await response.json()
      if (jsonResponse.success === true) {
        setlhcArray(jsonResponse.lhcs)
        if (jsonResponse.lhcs.length == 0)
          toast.info("No LHC Bookings", {
            position: toast.POSITION.BOTTOM_CENTER,
            transition: Flip,
            autoClose: 2000
          })
      } else {
        toast.error(jsonResponse.error, {
          position: toast.POSITION.BOTTOM_CENTER,
          transition: Flip,
          autoClose: 2000
        });
      }
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        transition: Flip,
        autoClose: 2000
      });
    }
  }

  const handleLabBookings = async (e) => {
    const labNo = lab.current.value
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/labbookings?lab=${labNo}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("authToken")
        }
      })

      const jsonResponse = await response.json()
      if (jsonResponse.success === true) {
        setlabArray(jsonResponse.labs)
        if (jsonResponse.labs.length == 0)
          toast.info("No Lab Bookings", {
            position: toast.POSITION.BOTTOM_CENTER,
            transition: Flip,
            autoClose: 2000
          })
      } else {
        toast.error(jsonResponse.error, {
          position: toast.POSITION.BOTTOM_CENTER,
          transition: Flip,
          autoClose: 2000
        });
      }
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        transition: Flip,
        autoClose: 2000
      });
    }
  }

  const handleUserBookings = async (e) => {
    const userid = user.current.value
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/userbookings?userid=${userid}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("authToken")
        }
      })
      const jsonResponse = await response.json()
      if (jsonResponse.success == true) {
        setUserLHCArray(jsonResponse.lhcBookings)
        setUserLabArray(jsonResponse.labBookings)
        if (jsonResponse.lhcBookings.length == 0 && jsonResponse.labBookings.length == 0)
          toast.info("No Bookings for the user", {
            position: toast.POSITION.BOTTOM_CENTER,
            transition: Flip,
            autoClose: 2000
          })
      } else {
        toast.error(jsonResponse.error, {
          position: toast.POSITION.BOTTOM_CENTER,
          transition: Flip,
          autoClose: 2000
        });
      }
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        transition: Flip,
        autoClose: 2000
      });
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    dispatch(userActions.setLogin(false))
    dispatch(userActions.setAdmin(false))
    dispatch(userActions.setUser(null))
    router.push("/")
    toast.success("Logged Out", {
      position: toast.POSITION.BOTTOM_CENTER,
      transition: Flip,
      autoClose: 2000
    });
  }

  const cancelBookingLHC = async (e) => {
    const parent = e.currentTarget.parentElement
    const children = parent.children
    const hallText = children[0].firstElementChild.firstElementChild.innerText;
    const hall = hallText.charAt(hallText.length - 2) == " " ? hallText.charAt(hallText.length - 1) : hallText.charAt(hallText.length - 2) + hallText.charAt(hallText.length - 1);
    const date = children[1].firstElementChild.firstElementChild.innerText;
    const start = children[1].children[1].firstElementChild.innerText;
    const end = children[1].children[1].children[1].innerText;
    const dues = children[1].children[2].firstElementChild.innerText;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/cancel`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("authToken")
        },
        body: JSON.stringify({ hall, date, start, end, type: "lhc" })
      })
      const jsonResponse = await response.json()
      if (jsonResponse.success === true) {
        dispatch(userActions.subtractDues(dues))
        const newLHCBookings = lhcArray.filter((booking) => {
          const bookingDate = new Date(booking.date)
          const dateString = bookingDate.getDate() + "-" + (bookingDate.getMonth() + 1) + "-" + bookingDate.getFullYear();
          if (!(booking.start == start && booking.end == end && dateString == date && booking.lec_hall == hall))
            return booking
        })
        setlhcArray(newLHCBookings)
        toast.success("Booking Cancelled", {
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

  const cancelBookingLab = async (e) => {
    const parent = e.currentTarget.parentElement
    const children = parent.children
    const hallText = children[0].firstElementChild.firstElementChild.innerText;
    const hall = hallText.charAt(hallText.length - 2) == " " ? hallText.charAt(hallText.length - 1) : hallText.charAt(hallText.length - 2) + hallText.charAt(hallText.length - 1);
    const date = children[1].firstElementChild.firstElementChild.innerText;
    const start = children[1].children[1].firstElementChild.innerText;
    const end = children[1].children[1].children[1].innerText;
    const dues = children[1].children[2].firstElementChild.innerText;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/cancel`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("authToken")
        },
        body: JSON.stringify({ hall, date, start, end, type: "lab" })
      })
      const jsonResponse = await response.json()
      if (jsonResponse.success === true) {
        dispatch(userActions.subtractDues(dues))
        const newLabBookings = labArray.filter((booking) => {
          const bookingDate = new Date(booking.date)
          const dateString = bookingDate.getDate() + "-" + (bookingDate.getMonth() + 1) + "-" + bookingDate.getFullYear();
          if (!(booking.start == start && booking.end == end && dateString == date && booking.lab == hall))
            return booking
        })
        setlabArray(newLabBookings)
        toast.success("Booking Cancelled", {
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

  const cancelBookingLHCUser = async (e) => {
    const parent = e.currentTarget.parentElement
    const children = parent.children
    const hallText = children[0].firstElementChild.firstElementChild.innerText;
    const hall = hallText.charAt(hallText.length - 2) == " " ? hallText.charAt(hallText.length - 1) : hallText.charAt(hallText.length - 2) + hallText.charAt(hallText.length - 1);
    const date = children[1].firstElementChild.firstElementChild.innerText;
    const start = children[1].children[1].firstElementChild.innerText;
    const end = children[1].children[1].children[1].innerText;
    const dues = children[1].children[2].firstElementChild.innerText;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/cancel`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("authToken")
        },
        body: JSON.stringify({ hall, date, start, end, type: "lhc" })
      })
      const jsonResponse = await response.json()
      if (jsonResponse.success === true) {
        dispatch(userActions.subtractDues(dues))
        const newLHCBookings = userLHCArray.filter((booking) => {
          const bookingDate = new Date(booking.date)
          const dateString = bookingDate.getDate() + "-" + (bookingDate.getMonth() + 1) + "-" + bookingDate.getFullYear();
          if (!(booking.start == start && booking.end == end && dateString == date && booking.lec_hall == hall))
            return booking
        })
        setUserLHCArray(newLHCBookings)
        toast.success("Booking Cancelled", {
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

  const cancelBookingLabUser = async (e) => {
    const parent = e.currentTarget.parentElement
    const children = parent.children
    const hallText = children[0].firstElementChild.firstElementChild.innerText;
    const hall = hallText.charAt(hallText.length - 2) == " " ? hallText.charAt(hallText.length - 1) : hallText.charAt(hallText.length - 2) + hallText.charAt(hallText.length - 1);
    const date = children[1].firstElementChild.firstElementChild.innerText;
    const start = children[1].children[1].firstElementChild.innerText;
    const end = children[1].children[1].children[1].innerText;
    const dues = children[1].children[2].firstElementChild.innerText;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/cancel`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("authToken")
        },
        body: JSON.stringify({ hall, date, start, end, type: "lab" })
      })
      const jsonResponse = await response.json()
      if (jsonResponse.success === true) {
        dispatch(userActions.subtractDues(dues))
        const newLabBookings = userLabArray.filter((booking) => {
          const bookingDate = new Date(booking.date)
          const dateString = bookingDate.getDate() + "-" + (bookingDate.getMonth() + 1) + "-" + bookingDate.getFullYear();
          if (!(booking.start == start && booking.end == end && dateString == date && booking.lab == hall))
            return booking
        })
        setUserLabArray(newLabBookings)
        toast.success("Booking Cancelled", {
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

  return (
    <>
      <h1 className='text-center mt-16 mb-10 text-4xl font-serif font-bold text-white lg:text-6xl'>Admin Panel</h1>
      <button onClick={handleLogout} className="absolute top-20 right-16 bg-[#480cfc] text-white rounded-xl py-2 px-4 font-bold shadow-lg hover:shadow-xl duration-300 transition-all transform hover:bg-[#3a0aca] hover:scale-110 mx-2"><div className="w-full flex items-center space-x-1"><span>Log Out</span></div></button>
      <div className="flex px-4 py-8 justify-around">
        <div className='w-full md:w-1/4 bg-white rounded-2xl py-3 px-4 mx-2'>
          <label htmlFor='lecture' className='font-semibold text-lg text-center block pb-1'>Lecture Hall Bookings</label>
          <input ref={lhc} className='w-full border border-gray-300 rounded-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id="lecture" placeholder='Lecture Hall [1-20]' />
        </div>
        <div className='w-full md:w-1/4 bg-white rounded-2xl py-3 px-4 mx-2'>
          <label htmlFor='lab' className='font-semibold text-lg text-center block pb-1'>Lab Bookings</label>
          <input ref={lab} className='w-full border border-gray-300 rounded-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id="lab" placeholder='Lab [1-10]' />
        </div>
        <div className="w-full md:w-1/4 bg-white rounded-2xl py-3 px-4 mx-2">
          <label htmlFor="dues" className="font-semibold text-lg text-center block pb-1">Check User Bookings and Dues</label>
          <input ref={user} className='w-full border border-gray-300 rounded-full py-2 mb-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id="lab" placeholder='Roll No/F.Id' />
        </div>
      </div>
      <div className="flex items-baseline">
        <button onClick={handleLHCBookings} className="cursor-pointer block mx-auto bg-[#480cfc] hover:bg-[#3a0aca] text-white rounded-full py-4 px-8 font-bold transition-all shadow hover:shadow-lg transform hover:scale-110"><div className="w-full flex items-center space-x-1">Check</div></button>
        <button onClick={handleLabBookings} className="block mx-auto bg-[#480cfc] hover:bg-[#3a0aca] text-white rounded-full py-4 px-8 font-bold transition-all shadow hover:shadow-lg transform hover:scale-110"><div className="w-full flex items-center space-x-1">Check</div></button>
        <button onClick={handleUserBookings} className="block mx-auto bg-[#480cfc] hover:bg-[#3a0aca] text-white rounded-full py-4 px-8 font-bold transition-all shadow hover:shadow-lg transform hover:scale-110"><div className="w-full flex items-center space-x-1">Check</div></button>
      </div>

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <Image src="/hero.jpg" alt="IITK" quality={100} fill sizes="100vw" style={{ objectFit: 'cover' }} />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
      </div>

      <div className="flex px-4 py-8 justify-around">
        <div>
          {
            lhcArray.map((booking, i) => {
              const date = new Date(booking.date);
              const currentDate = new Date();
              const dateString = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
              const day = date.toLocaleDateString('en-US', { weekday: 'long' });
              return (
                <div key={"lhc" + i} className="max-w-sm p-6 my-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <div>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Booking For&nbsp;:<span className='font-bold text-lg'>{"  L " + booking.lec_hall}</span></h5>
                  </div>
                  <div className="text-lg mb-2"><p>Date:&nbsp;<span>{dateString}</span><span>{"  " + day}</span></p><p>From:&nbsp;<span>{booking.start}</span>&nbsp;&nbsp;To:&nbsp;<span>{booking.end}</span></p><p>Cost:&nbsp;<span>{booking.amount}</span></p></div>
                  {
                    (date > currentDate) && <button onClick={cancelBookingLHC} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Cancel Booking
                      <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                  }
                </div>
              )
            })
          }
        </div>
        <div>
          {
            labArray.map((booking, i) => {
              const date = new Date(booking.date);
              const currentDate = new Date()
              const dateString = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
              const day = date.toLocaleDateString('en-US', { weekday: 'long' });
              return (
                <div key={"lab" + i} className="max-w-sm p-6 my-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <div>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Booking For&nbsp;:<span className='font-bold text-lg'>{"  Lab " + booking.lab}</span></h5>
                  </div>
                  <div className="text-lg mb-2"><p>Date:&nbsp;<span>{dateString}</span><span>{"  " + day}</span></p><p>From:&nbsp;<span>{booking.start}</span>&nbsp;&nbsp;To:&nbsp;<span>{booking.end}</span></p><p>Cost:&nbsp;<span>{booking.amount}</span></p></div>
                  {
                    (date > currentDate) && <button onClick={cancelBookingLabUser} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Cancel Booking
                      <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                  }
                </div>
              )
            })
          }
        </div>
        <div>
          {
            userLHCArray.map((booking, i) => {
              const date = new Date(booking.date);
              const currentDate = new Date()
              const dateString = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
              const day = date.toLocaleDateString('en-US', { weekday: 'long' });
              return (
                <div key={"lhc" + i} className="max-w-sm p-6 my-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <div>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Booking For&nbsp;:<span className='font-bold text-lg'>{"  L " + booking.lec_hall}</span></h5>
                  </div>
                  <div className="text-lg mb-2"><p>Date:&nbsp;<span>{dateString}</span><span>{"  " + day}</span></p><p>From:&nbsp;<span>{booking.start}</span>&nbsp;&nbsp;To:&nbsp;<span>{booking.end}</span></p><p>Cost:&nbsp;<span>{booking.amount}</span></p></div>
                  {
                    (date > currentDate) && <button onClick={cancelBookingLHCUser} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Cancel Booking
                      <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                  }
                </div>
              )
            })
          }
        </div>
        <div>
          {
            userLabArray.map((booking, i) => {
              const date = new Date(booking.date);
              const currentDate = new Date()
              const dateString = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
              const day = date.toLocaleDateString('en-US', { weekday: 'long' });
              return (
                <div key={"lhc" + i} className="max-w-sm p-6 my-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <div>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Booking For&nbsp;:<span className='font-bold text-lg'>{"  Lab " + booking.lab}</span></h5>
                  </div>
                  <div className="text-lg mb-2"><p>Date:&nbsp;<span>{dateString}</span><span>{"  " + day}</span></p><p>From:&nbsp;<span>{booking.start}</span>&nbsp;&nbsp;To:&nbsp;<span>{booking.end}</span></p><p>Cost:&nbsp;<span>{booking.amount}</span></p></div>
                  {
                    (date > currentDate) && <button onClick={cancelBookingLabUser} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Cancel Booking
                      <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}