'use client';

import { redirect } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { toast, Flip } from "react-toastify"

import { userActions } from '@/store/userSlice';

const MyBookings = () => {
  const isAdmin = useSelector(state => state.user.isAdmin)
  if (isAdmin)
    redirect("/admin")

  let user = useSelector(state => state.user.user)
  if (!user)
    redirect('/signup');

  const dispatch = useDispatch()

  const [lhcBookings, setLHCBookings] = useState([])
  const [labBookings, setLabBookings] = useState([])

  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/myBookings`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "auth-token": localStorage.getItem("authToken")
          }
        })
        const jsonResponse = await response.json()
        if (jsonResponse.success === true) {
          setLHCBookings(jsonResponse.lhcBookings)
          setLabBookings(jsonResponse.labBbookings)
        } else {
          toast.error(jsonResponse.error, {
            position: toast.POSITION.BOTTOM_CENTER,
            transition: Flip,
            autoClose: 2000
          });
        }
      } catch (error) {
        toast.error(error.message, {
          position: toast.POSITION.BOTTOM_CENTER,
          transition: Flip,
          autoClose: 2000
        });
      }
    }

    getBookings()
  }, [])

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
        const newLHCBookings = lhcBookings.filter((booking) => {
          const bookingDate = new Date(booking.date)
          const dateString = bookingDate.getDate() + "-" + (bookingDate.getMonth() + 1) + "-" + bookingDate.getFullYear();
          if (!(booking.start == start && booking.end == end && dateString == date && booking.lec_hall == hall))
            return booking
        })
        setLHCBookings(newLHCBookings)
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
        const newLabBookings = labBookings.filter((booking) => {
          const bookingDate = new Date(booking.date)
          const dateString = bookingDate.getDate() + "-" + (bookingDate.getMonth() + 1) + "-" + bookingDate.getFullYear();
          if (!(booking.start == start && booking.end == end && dateString == date && booking.lab == hall))
            return booking
        })
        setLabBookings(newLabBookings)
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
      <Navbar />
      <h2 className='text-center my-6 font-extrabold text-2xl'>Lecture Hall Bookings</h2>
      <div className="flex flex-col items-center">
        {
          lhcBookings.map((booking, i) => {
            const date = new Date(booking.date);
            const currentDate = new Date();
            const dateString = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
            const day = date.toLocaleDateString('en-US', { weekday: 'long' });
            return (
              <div key={"lhc" + i} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Booking For&nbsp;:<span className='font-bold text-lg'>{"  L " + booking.lec_hall}</span></h5>
                </div>
                <div className="text-lg mb-2"><p>Date:&nbsp;<span>{dateString}</span><span>{"  " + day}</span></p><p>From:&nbsp;<span>{booking.start}</span>&nbsp;&nbsp;To:&nbsp;<span>{booking.end}</span></p><p>Cost:&nbsp;<span>{booking.amount}</span></p></div>
                {
                  (date > currentDate || (date == currentDate && (parseInt(booking.start.charAt(0) + booking.start.charAt(1)) > currentDate.getHours()))) && <button onClick={cancelBookingLHC} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Cancel Booking
                    <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  </button>
                }
              </div>
            )
          })
        }
      </div>
      <h2 className='text-center my-6 font-extrabold text-2xl'>Lab Bookings</h2>
      <div className="flex flex-col items-center">
        {
          labBookings.map((booking, i) => {
            const date = new Date(booking.date);
            const currentDate = new Date()
            const dateString = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
            const day = date.toLocaleDateString('en-US', { weekday: 'long' });
            return (
              <div key={"lab" + i} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Booking For&nbsp;:<span className='font-bold text-lg'>{"  Lab " + booking.lab}</span></h5>
                </div>
                <div className="text-lg mb-2"><p>Date:&nbsp;<span>{dateString}</span><span>{"  " + day}</span></p><p>From:&nbsp;<span>{booking.start}</span>&nbsp;&nbsp;To:&nbsp;<span>{booking.end}</span></p><p>Cost:&nbsp;<span>{booking.amount}</span></p></div>
                {
                  (date > currentDate || (date == currentDate && (parseInt(booking.start.charAt(0) + booking.start.charAt(1)) > currentDate.getHours()))) && <button onClick={cancelBookingLab} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Cancel Booking
                    <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  </button>
                }
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default MyBookings