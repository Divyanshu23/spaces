"use client";

import Image from "next/image";
import { useRef } from "react";
import { useState } from "react";
import { toast, Flip } from "react-toastify"

export default function Home() {
  const lhc = useRef(null)
  const lab = useRef(null)
  const user = useRef(null)

  const [lhcArray, setlhcArray] = useState([])
  const [labArray, setlabArray] = useState([])
  const [userArray, setuserArray] = useState([])


  const handleLHCBookings = async (e) => {
    const lhcNo = lhc.current.value
    try {
      const response = await fetch(`http://127.0.0.1:3001/api/admin/lhcbookings?hall=${lhcNo}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        }
      })

      const jsonResponse = await response.json()
      if (jsonResponse.success === true) {
        setlhcArray(jsonResponse.lhcs)
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
    const lhcNo = lac.current.value
    try {
      const response = await fetch(`http://127.0.0.1:3001/api/admin/labbookings?hall=${lhcNo}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        }
      })

      const jsonResponse = await response.json()
      if (jsonResponse.success === true) {
        setlabArray(jsonResponse.lhcs)
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
    const lhcNo = user.current.value
    try {
      const response = await fetch(`http://127.0.0.1:3001/api/admin/userbookings?hall=${lhcNo}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        }
      })

      const jsonResponse = await response.json()
      if (jsonResponse.success === true) {
        setuserArray(jsonResponse.lhcs)
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

  return (
    <>
      <h1 className='text-center mt-16 mb-10 text-4xl font-serif font-bold text-white lg:text-6xl'>Admin Panel</h1>
      <div className="flex px-4 py-8 justify-around">
        <div className='w-full md:w-1/4 bg-white rounded-2xl py-3 px-4 mx-2'>
          <label htmlFor='lecture' className='font-semibold text-lg text-center block pb-1'>Lecture Hall Bookings</label>
          <input ref={lhc} className='w-full border border-gray-300 rounded-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id="lecture" placeholder='Lecture Hall [1-20]' />
        </div>
        <div className='w-full md:w-1/4 bg-white rounded-2xl py-3 px-4 mx-2'>
          <label htmlFor='lecture' className='font-semibold text-lg text-center block pb-1'>Lab Bookings</label>
          <input ref={lab} className='w-full border border-gray-300 rounded-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id="lecture" placeholder='Lab [1-10]' />
        </div>
        <div className="w-full md:w-1/4 bg-white rounded-2xl py-3 px-4 mx-2">
          <label htmlFor="dues" className="font-semibold text-lg text-center block pb-1">Check User Bookings and Dues</label>
          <select ref={user} name="user" id="user" className='w-full border border-gray-300 rounded-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder="User">
            <option value="student">Student</option>
            <option value="faculty">Facult</option>
          </select>
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

      {
        lhcArray.map((lhc, i) => {
          const date = new Date(lhc.date);
          const currentDate = new Date();
          const dateString = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
          const day = date.toLocaleDateString('en-US', { weekday: 'long' });
          return (
            <div onClick={cancelBooking} key={"lhc" + i} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Booking For&nbsp;:<span className='font-bold text-lg'>{"  L " + lhc.lec_hall}</span></h5>
              </div>
              <div className="text-lg mb-2"><p>{"Date: " + dateString + " " + day}</p><p>{"   From: " + lhc.start + "  To: " + lhc.end}</p><p>{"Cost: " + lhc.amount}</p></div>
              {
                (date > currentDate || (date == currentDate && (parseInt(lhc.start.charAt(0) + lhc.start.charAt(1)) > currentDate.getHours()))) && <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Cancel Booking
                  <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
              }
            </div>
          )
        })
      }
      {
        labArray.map((lhc, i) => {
          const date = new Date(lhc.date);
          const currentDate = new Date();
          const dateString = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
          const day = date.toLocaleDateString('en-US', { weekday: 'long' });
          return (
            <div onClick={cancelBooking} key={"lhc" + i} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Booking For&nbsp;:<span className='font-bold text-lg'>{"  L " + lhc.lec_hall}</span></h5>
              </div>
              <div className="text-lg mb-2"><p>{"Date: " + dateString + " " + day}</p><p>{"   From: " + lhc.start + "  To: " + lhc.end}</p><p>{"Cost: " + lhc.amount}</p></div>
              {
                (date > currentDate || (date == currentDate && (parseInt(lhc.start.charAt(0) + lhc.start.charAt(1)) > currentDate.getHours()))) && <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Cancel Booking
                  <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
              }
            </div>
          )
        })
      }
      {
        userArray.map((lhc, i) => {
          const date = new Date(lhc.date);
          const currentDate = new Date();
          const dateString = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
          const day = date.toLocaleDateString('en-US', { weekday: 'long' });
          return (
            <div onClick={cancelBooking} key={"lhc" + i} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Booking For&nbsp;:<span className='font-bold text-lg'>{"  L " + lhc.lec_hall}</span></h5>
              </div>
              <div className="text-lg mb-2"><p>{"Date: " + dateString + " " + day}</p><p>{"   From: " + lhc.start + "  To: " + lhc.end}</p><p>{"Cost: " + lhc.amount}</p></div>
              {
                (date > currentDate || (date == currentDate && (parseInt(lhc.start.charAt(0) + lhc.start.charAt(1)) > currentDate.getHours()))) && <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Cancel Booking
                  <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
              }
            </div>
          )
        })
      }
    </>
  )
}