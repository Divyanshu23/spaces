"use client";

import Image from "next/image";
import { useRef } from "react";
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation";

import { filterActions } from "@/store/filterSlice"

export async function generateStaticParams() {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(ele => {
    return {id: String(ele)}
  })
}

export const dynamicParams = false

const LHC = ({ params }) => {
  const id = params.id

  const router = useRouter()
  const dispatch = useDispatch()

  const date = useRef(null)
  const start = useRef(null)
  const end = useRef(null)

  const validation = (filter) => {
    const dateString = `${filter.date}T${filter.start < 10 ? `0${filter.start}` : filter.start}:00:00`;
    const timeStamp = Date.parse(dateString)


    if (timeStamp < Date.now()) {
      toast.error("Choose a date/time ahead of now", {
        position: toast.POSITION.BOTTOM_CENTER,
        transition: Flip,
        autoClose: 2000
      });
      return false
    }
    if (Number(filter.end) <= Number(filter.start)) {
      toast.error("End time should be ahead of start time", {
        position: toast.POSITION.BOTTOM_CENTER,
        transition: Flip,
        autoClose: 2000
      });
      return false
    }
    return true
  }

  const checkLHCs = async () => {
    const filter = {
      date: date.current.value,
      start: start.current.value,
      end: end.current.value,
    }

    if (validation(filter)) {
      dispatch(filterActions.changeFilter(filter))
      router.push(`/lhc/available/${id}`)
    }
  }



  return (
    <section className="text-gray-600 body-font relative">
      <div className="absolute inset-0 bg-gray-300">
        <Image
          alt="Mountains"
          src="/lhc.jpg"
          quality={100}
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
      <div className="container px-5 py-24 mx-auto flex">
        <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
          <h2 className="text-gray-900 text-3xl mb-1 font-medium title-font">{"Lecture Hall " + id}</h2>
          <div className="flex flex-col items-center mb-4">
            <div className="w-full bg-white rounded-2xl py-3 px-4 mb-4 md:mb-0">
              <label htmlFor="check-in" className="font-semibold text-lg text-center block pb-1">Day</label>
              <input ref={date} type="date" id="check-in" className="w-full border border-gray-300 rounded-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="w-full bg-white rounded-2xl py-3 px-4 mx-2">
              <label htmlFor="start-time" className="font-semibold text-lg text-center block pb-1">From</label>
              <select ref={start} className="w-full border border-gray-300 rounded-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="time-slots" id="start-time">
                {
                  [...Array(4)].map((u, i) => {
                    return (
                      <option key={i} value={i + 8}>{i + 8 + ":00 am"}</option>
                    )
                  })
                }
                <option key="12" value={12}>{12 + ":00 noon"}</option>
                {
                  [...Array(6)].map((u, i) => {
                    return (
                      <option key={i} value={i + 13}>{i + 13 + ":00 pm"}</option>
                    )
                  })
                }
              </select>
            </div>
            <div className="w-full bg-white rounded-2xl py-3 px-4 mx-2">
              <label htmlFor="end-time" className="font-semibold text-lg text-center block pb-1">To</label>
              <select ref={end} className="w-full border border-gray-300 rounded-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="time-slots" id="end-time">
                {
                  [...Array(4)].map((u, i) => {
                    return (
                      <option key={i} value={i + 8}>{i + 8 + ":00 am"}</option>
                    )
                  })
                }
                <option key="12" value={12}>{12 + ":00 noon"}</option>
                {
                  [...Array(6)].map((u, i) => {
                    return (
                      <option key={i} value={i + 13}>{i + 13 + ":00 pm"}</option>
                    )
                  })
                }
              </select>
            </div>
          </div>
          <button onClick={checkLHCs} className="text-white bg-[#480cfc] border-0 py-2 px-6 focus:outline-none hover:bg-[#3a0aca] rounded text-lg transition-all transform hover:scale-105">Check Availability</button>
        </div>
      </div>
    </section>
  )
}

export default LHC