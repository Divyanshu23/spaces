'use client';

import { redirect } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { toast, Flip } from "react-toastify"

const MyBookings = () => {
  let user = useSelector(state => state.user.user)
  const isAdmin = useSelector(state => state.user.isAdmin)

  if (isAdmin)
    redirect("/admin")
    
  if (!user) redirect('/signup');
  const bookingParams = []
  const bookingParams2 = []

  const [lhcBookings, setLHCBookings] = useState([])
  const [labBookings, setLabBookings] = useState([])

  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:3001/api/myBookings`, {
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

  const cancelBooking = async (e) => {
    const text = e.currentTarget.childNodes[0].childNodes[0].innerText;
    const hall = text.charAt(text.length - 2) == " " ? text.charAt(text.length - 1) : text.charAt(text.length - 2) + text.charAt(text.length - 1);
    let cancelParams = bookingParams.filter((booking) => {
      if (booking.hall == hall)
        return booking
    })

    cancelParams = cancelParams[0];

    try {
      const response = await fetch(`http://127.0.0.1:3001/api/cancel`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("authToken")
        },
        body: JSON.stringify(cancelParams)
      })
      const jsonResponse = await response.json()
      if (jsonResponse.success === true) {
        const newLHCBookings = lhcBookings.filter((booking) => {
          if (booking.lec_hall != cancelParams.hall)
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
    const text = e.currentTarget.childNodes[0].childNodes[0].innerText;
    const hall = text.charAt(text.length - 2) == " " ? text.charAt(text.length - 1) : text.charAt(text.length - 2) + text.charAt(text.length - 1);
    let cancelParams = bookingParams2.filter((booking) => {
      if (booking.hall == hall)
        return booking
    })

    cancelParams = cancelParams[0]

    try {
      const response = await fetch(`http://127.0.0.1:3001/api/cancel`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("authToken")
        },
        body: JSON.stringify(cancelParams)
      })
      const jsonResponse = await response.json()
      if (jsonResponse.success === true) {
        const newLabBookings = labBookings.filter((booking) => {
          if (booking.lab != cancelParams.hall)
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
      <h2 className='text-center my-2 font-extrabold text-2xl'>Lecture Hall Bookings</h2>
      <div className="flex flex-col items-center">
        {
          lhcBookings.map((booking, i) => {
            const date = new Date(booking.date);
            const currentDate = new Date();
            const dateString = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
            const day = date.toLocaleDateString('en-US', { weekday: 'long' });
            bookingParams.push({ hall: booking.lec_hall, dateString, start: booking.start, end: booking.end, type: "lhc" })
            return (
              <div onClick={cancelBooking} key={"lhc" + i} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Booking For&nbsp;:<span className='font-bold text-lg'>{"  L " + booking.lec_hall}</span></h5>
                </div>
                <div className="text-lg mb-2"><p>{"Date: " + dateString + " " + day}</p><p>{"   From: " + booking.start + "  To: " + booking.end}</p><p>{"Cost: " + booking.amount}</p></div>
                {
                  (date > currentDate || (date == currentDate && (parseInt(booking.start.charAt(0) + booking.start.charAt(1)) > currentDate.getHours()))) && <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Cancel Booking
                    <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  </button>
                }
              </div>
            )
          })
        }
      </div>
      <h2 className='text-center my-2 font-extrabold text-2xl'>Lab Bookings</h2>
      <div className="flex flex-col items-center">
        {
          labBookings.map((booking, i) => {
            const date = new Date(booking.date);
            const currentDate = new Date()
            const dateString = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
            const day = date.toLocaleDateString('en-US', { weekday: 'long' });
            bookingParams2.push({ hall: booking.lab, dateString, start: booking.start, end: booking.end, type: "lab" })
            return (
              <div onClick={cancelBookingLab} key={"lab" + i} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Booking For&nbsp;:<span className='font-bold text-lg'>{"  Lab " + booking.lab}</span></h5>
                </div>
                <div className="text-lg mb-2"><p>{"Date: " + dateString + " " + day}</p><p>{"   From: " + booking.start + "  To: " + booking.end}</p><p>{"Cost: " + booking.amount}</p></div>
                {
                  (date > currentDate || (date == currentDate && (parseInt(booking.start.charAt(0) + booking.start.charAt(1)) > currentDate.getHours()))) && <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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