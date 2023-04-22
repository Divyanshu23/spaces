import Image from "next/image"

const LHC = () => {
  return (
    <section className="text-gray-600 body-font relative">
      <div className="absolute inset-0 bg-gray-300">
        <Image
          alt="Mountains"
          src="/audi.jpg"
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
          <h2 className="text-gray-900 text-3xl mb-1 font-medium title-font">Auditorium</h2>
          <div className="flex flex-col items-center mb-4">
            <div className="w-full bg-white rounded-2xl py-3 px-4 mb-4 md:mb-0">
              <label htmlFor="check-in" className="font-semibold text-lg text-center block pb-1">Day</label>
              <input type="date" id="check-in" className="w-full border border-gray-300 rounded-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="w-full bg-white rounded-2xl py-3 px-4 mx-2">
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
            <div className="w-full bg-white rounded-2xl py-3 px-4 mx-2">
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
            <div className="w-full bg-white rounded-2xl py-3 px-4 mx-2">
              <label htmlFor="end-time" className="font-semibold text-lg text-center block pb-1">Min Capacity</label>
              <select className="w-full border border-gray-300 rounded-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="time-slots" id="start-time" placeholder="capacity">
                {
                  [200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200].map((u, i) => {
                    return (
                      <option key={u} value={u}>{u}</option>
                    )
                  })
                }
              </select>
            </div>
          </div>
          <button className="text-white bg-[#480cfc] border-0 py-2 px-6 focus:outline-none hover:bg-[#3a0aca] rounded text-lg transition-all transform hover:scale-105">Check Availability</button>
        </div>
      </div>
    </section>
  )
}

export default LHC