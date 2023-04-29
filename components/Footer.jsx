import { BsGithub } from "react-icons/bs"
import Link from "next/link"

const Footer = () => {
    return (
        <footer className="text-gray-600 body-font">
            <div className="2xl:container 2xl:mx-auto">
                <div className=" bg-gray-50 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-8 md:gap-12 gap-14 lg:px-20 lg:py-12 py-10 md:px-12 px-4">
                    {/* Delivery grid Card */}
                    <div className="flex flex-col items-center">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.3334 4H1.33337V21.3333H21.3334V4Z" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M21.3334 10.6665H26.6667L30.6667 14.6665V21.3332H21.3334V10.6665Z" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7.33333 28.0002C9.17428 28.0002 10.6667 26.5078 10.6667 24.6668C10.6667 22.8259 9.17428 21.3335 7.33333 21.3335C5.49238 21.3335 4 22.8259 4 24.6668C4 26.5078 5.49238 28.0002 7.33333 28.0002Z" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M24.6667 28.0002C26.5077 28.0002 28 26.5078 28 24.6668C28 22.8259 26.5077 21.3335 24.6667 21.3335C22.8258 21.3335 21.3334 22.8259 21.3334 24.6668C21.3334 26.5078 22.8258 28.0002 24.6667 28.0002Z" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <h3 className=" text-xl leading-5 font-semibold text-gray-800 lg:mt-10 mt-8 ">Instant Booking</h3>
                        <p className="text-center text-base leading-6 font-normal text-gray-600 mt-4 lg:w-full md:w-9/12 w-full">Book <span className=" font-semibold">LHCs</span>, <span className=" font-semibold">Labs</span> and <span className=" font-semibold">Auditorium</span> at IITK in a click of a button</p>
                    </div>

                    {/* customer Grid Card */}

                    <div className="flex flex-col items-center">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28 20C28 20.7072 27.719 21.3855 27.219 21.8856C26.7189 22.3857 26.0406 22.6667 25.3333 22.6667H9.33333L4 28V6.66667C4 5.95942 4.28095 5.28115 4.78105 4.78105C5.28115 4.28095 5.95942 4 6.66667 4H25.3333C26.0406 4 26.7189 4.28095 27.219 4.78105C27.719 5.28115 28 5.95942 28 6.66667V20Z" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <h3 className=" text-xl leading-5 font-semibold text-gray-800 lg:mt-10 mt-8 ">Admin Support</h3>
                        <p className="text-center text-base leading-6 font-normal text-gray-600 mt-4 lg:w-full md:w-9/12 w-full">Reach out to Admin @ LHC Office for any queries or support
                        </p>
                    </div>

                    {/* Recycle Grid Card */}

                    <div className="flex flex-col items-center">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.6667 1.3335L28.0001 6.66683L22.6667 12.0002" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 14.6665V11.9998C4 10.5853 4.5619 9.22879 5.5621 8.2286C6.56229 7.22841 7.91885 6.6665 9.33333 6.6665H28" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9.33333 30.6667L4 25.3333L9.33333 20" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M28 17.3335V20.0002C28 21.4147 27.4381 22.7712 26.4379 23.7714C25.4377 24.7716 24.0812 25.3335 22.6667 25.3335H4" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <h3 className=" text-xl leading-5 font-semibold text-gray-800 lg:mt-10 mt-8 ">Fast and Simple</h3>
                        <p className="text-center text-base leading-6 font-normal text-gray-600 mt-4 lg:w-full md:w-9/12 w-full">Application is powered by blazingly fast technologies as <span className=" font-semibold">Next.js</span> and <span className=" font-semibold">MySQL</span></p>
                    </div>

                    {/* Secure Payment Card */}

                    <div className="flex flex-col items-center">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.9999 29.3332C15.9999 29.3332 26.6666 23.9998 26.6666 15.9998V6.6665L15.9999 2.6665L5.33325 6.6665V15.9998C5.33325 23.9998 15.9999 29.3332 15.9999 29.3332Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <h3 className=" text-xl leading-5 font-semibold text-gray-800 lg:mt-10 mt-8 ">Book & Pay Later</h3>
                        <p className="text-center text-base leading-6 font-normal text-gray-600 mt-4 lg:w-full md:w-9/12 w-full">Book now and amount will be added to your dues to be paid later</p>
                    </div>
                </div>
            </div>
            <div className="bg-gray-100">
                <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                    <p className="text-gray-500 text-sm text-center sm:text-left">© 2023 Spaces —
                        <span className="text-gray-600 ml-1">Divyanshu Gangwar, Prateek Jain, Priyanka Jalan, Shorya Kumar, Videh Aggarwal</span>
                    </p>
                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                        <Link href="https://github.com/Divyanshu23/spaces" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg></Link>
                    </span>
                </div>
            </div>
            <div className="bg-gray-100">
                <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                    <p className="text-gray-500 text-sm text-center sm:text-left">© 2023 Spaces —
                        <span className="text-gray-600 ml-1">CS315: Principles of Database Systems, IIT Kanpur</span>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer