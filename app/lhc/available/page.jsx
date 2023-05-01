"use client";

import { useSelector, useDispatch } from "react-redux"
import { toast, Flip } from "react-toastify"
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

import { userActions } from "@/store/userSlice"

const Available = () => {
  const isAdmin = useSelector(state => state.user.isAdmin)
  if (isAdmin)
    redirect("/admin")

  const dispatch = useDispatch()

  const filter = useSelector(state => state.filter.filter)
  const [availableLHCs, setAvailableLHCs] = useState([])

  const handleBooking = async (e) => {
    const text = e.currentTarget.firstChild.firstChild.innerHTML
    const hall = text.charAt(text.length - 2) == " " ? text.charAt(text.length - 1) : text.charAt(text.length - 2) + text.charAt(text.length - 1)
    const text2 = e.currentTarget.children[1].children[0].innerHTML
    const index = text2.indexOf('₹')
    const dues = parseInt(text2.slice(index + 1))

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/booklhc`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("authToken")
        },
        body: JSON.stringify({ hall, date: filter.date, from: filter.start, to: filter.end })
      })
      const jsonResponse = await response.json()
      if (jsonResponse.success === true) {
        dispatch(userActions.addDues(dues))
        toast.success("Booking Successful", {
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

  useEffect(() => {
    const getAvailableLHCs = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lhc/checkLHCs?date=${filter.date}&start=${filter.start}&end=${filter.end}&cap=${filter.capacity}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "auth-token": localStorage.getItem("authToken")
          }
        })
        const jsonResponse = await response.json()
        if (jsonResponse.success === true) {
          setAvailableLHCs(jsonResponse.LHCs)
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

    getAvailableLHCs()
  }, [])

  return (
      <div className="flex flex-col items-center">
        {
          availableLHCs.map((lhc) => {
            const cost = (parseInt(filter.end) - parseInt(filter.start)) * lhc.booking_rate
            return (
              <div onClick={handleBooking} key={lhc.lec_hall} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{"Lecture Hall " + lhc.lec_hall}</h5>
                </div>
                <div className="text-lg mb-2"><p className="font-medium">{"Capacity: " + lhc.capacity + "  Booking Charges: ₹" + cost}</p><p className="font-medium">{"Recoding Facility: " + (lhc.recording_camera == 1 ? "Yes" : "No") + "  Projector: " + (lhc.projector == 1 ? "Yes" : "No")}</p><p>{"Date: " + filter.date + "   From: " + (filter.start < 10 ? "0" + filter.start : filter.start) + ":00   To: " + (filter.end < 10 ? "0" + filter.end : filter.end) + ":00"}</p></div>
                <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Book Now
                  <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
              </div>

            )
          })
        }
        {
          availableLHCs.length === 0 && <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">No Lecture Halls Available</div>
        }
      </div>
  )
}

export default Available