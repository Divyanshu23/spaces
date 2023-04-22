import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"
import Image from "next/image";
import { MdEventAvailable } from "react-icons/md"

export default async function Home() {
  return (
    <>
      <Navbar />
      <div className="relative pt-32 pb-12 md:pb-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <Image src="/hero.jpg" alt="IITK" quality={100} fill sizes="100vw" style={{ objectFit: 'cover' }} />
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
        </div>
        <div className="max-w-7xl mx-auto relative px-6">
          <h1 className="text-4xl font-serif font-bold text-white mb-8 md:mb-12 lg:mb-16 lg:text-6xl">IIT Kanpur&apos; Booking System</h1>
          <div className="flex flex-col md:flex-row items-center mb-12">
            <div className="w-full md:w-1/4 bg-white rounded-2xl py-3 px-4 mb-4 md:mb-0">
              <label htmlFor="check-in" className="font-semibold text-lg text-center block pb-1">Day</label>
              <input type="date" id="check-in" className="w-full border border-gray-300 rounded-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="w-full md:w-1/4 bg-white rounded-2xl py-3 px-4 mx-2">
              <label htmlFor="start-time" className="font-semibold text-lg text-center block pb-1">From</label>
              <select className="w-full border border-gray-300 rounded-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="time-slots" id="start-time">
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
            <div className="w-full md:w-1/4 bg-white rounded-2xl py-3 px-4 mx-2">
              <label htmlFor="end-time" className="font-semibold text-lg text-center block pb-1">To</label>
              <select className="w-full border border-gray-300 rounded-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="time-slots" id="end-time">
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
            <div className="w-full md:w-1/4 bg-white rounded-2xl py-3 px-4 mx-2">
              <label htmlFor="end-time" className="font-semibold text-lg text-center block pb-1">Capacity</label>
              <select className="w-full border border-gray-300 rounded-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="time-slots" id="start-time" placeholder="capacity">
                {
                  [200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200].map((u, i) => {
                    return (
                      <option key={u} value={u}>{"<= " + u}</option>
                    )
                  })
                }
              </select>
            </div>
          </div>
          <button className="bg-[#480cfc] text-white rounded-full py-4 px-8 font-bold shadow-lg hover:shadow-xl duration-300 transition-all transform hover:scale-110 mx-2"><div className="w-full flex items-center space-x-1"><MdEventAvailable /><span>Check LHCs</span></div></button>
          <button className="bg-[#480cfc] text-white rounded-full py-4 px-8 font-bold shadow-lg hover:shadow-xl duration-300 transition-all transform hover:scale-110 mx-2"><div className="w-full flex items-center space-x-1"><MdEventAvailable /><span>Check Labs</span></div></button>
          <button className="bg-[#480cfc] text-white rounded-full py-4 px-8 font-bold shadow-lg hover:shadow-xl duration-300 transition-all transform hover:scale-110 mx-2"><div className="w-full flex items-center space-x-1"><MdEventAvailable /><span>Check Auditorium</span></div></button>
        </div>
      </div>
      <Footer/>
    </>
  )
}
