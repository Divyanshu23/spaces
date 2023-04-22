"use client"

import Image from "next/image"
import { BiUserPlus } from "react-icons/bi"
import { useSelector, useDispatch } from "react-redux"
import { useRef } from "react"
import Link from "next/link"

import { userActions } from "../store/userSlice"

const Navbar = () => {
    const lhcMenu = useRef(null)
    const labMenu = useRef(null)
    const accountMenu = useRef(null)
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)
    const dispatch = useDispatch()

    const handleLHCDropdown = (e) => {
        if (lhcMenu.current.style.display == "" || lhcMenu.current.style.display == "none") {
            lhcMenu.current.style.display = "block"
        } else {
            lhcMenu.current.style.display = "none"
        }
    }

    const handleLabDropdown = () => {
        if (labMenu.current.style.display == "" || labMenu.current.style.display == "none") {
            labMenu.current.style.display = "block"
        } else {
            labMenu.current.style.display = "none"
        }
    }

    const handleOpenAccount = () => {
        if (accountMenu.current.style.display == "" || accountMenu.current.style.display == "none") {
            accountMenu.current.style.display = "block"
        } else {
            accountMenu.current.style.display = "none"
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("authToken")
        dispatch(userActions.setLogin(false))
    }

    // const closeOpenMenus = (e) => {
    //     if (lhcMenu.current.style.display == "block") {
    //         // console.log(e.target.parentElement)
    //         lhcMenu.current.style.display = "none"
    //     }
    //     if (labMenu.current.style.display == "block")
    //         labMenu.current.style.display = "none"
    //     if (accountMenu.current.style.display == "block")
    //         accountMenu.current.style.display = "none"
    // }

    // useEffect(() => {
    //     // document.addEventListener('mousedown', closeOpenMenus)
    // }, [])


    return (
        <>
            <section className="relative mx-auto">
                <nav className="flex justify-between bg-gray-900 text-white">
                    <div className="px-5 xl:px-12 py-3 flex w-full items-center">
                        <Link className="text-3xl font-bold font-heading" href="/">
                            <Image src="/logo.png" alt="logo" width={300} height={100} sizes="10vw" style={{ width: '100%', height: 'auto' }} priority />
                        </Link>

                        <ul className="hidden md:flex px-4 mx-auto font-semibold md:text-lg font-heading space-x-12">
                            <li>
                                <button id="dropdownNavbarLink" onClick={handleLHCDropdown} className="hover:text-gray-400 flex items-center justify-between w-full md:w-auto">Lecture Halls <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></button>

                                <div id="dropdownNavbar" className="hidden absolute bg-white text-base z-10 list-none divide-y divide-gray-100 rounded shadow my-2 w-20 h-[24vw] overflow-scroll" ref={lhcMenu}>
                                    <ul className="py-1" aria-labelledby="dropdownLargeButton">
                                        {
                                            [...Array(20)].map((u, i) => {
                                                return <li key={i}>
                                                    <Link href="#" className="text-smhover:bg-gray-100 text-gray-700 block px-4 py-2 text-center">{"L" + (i + 1)}</Link>
                                                </li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <button id="dropdownNavbarLink" onClick={handleLabDropdown} className="hover:text-gray-400 flex items-center justify-between w-full md:w-auto">Labs<svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></button>

                                <div id="dropdownNavbar" className="hidden absolute bg-white text-base z-10 list-none divide-y divide-gray-100 rounded shadow my-2 w-20" ref={labMenu}>
                                    <ul className="py-1" aria-labelledby="dropdownLargeButton">
                                        {
                                            [...Array(10)].map((u, i) => {
                                                return <li key={i}>
                                                    <Link href="#" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 text-center">{"Lab " + (i + 1)}</Link>
                                                </li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </li>
                            <li><Link className="hover:text-gray-400" href="#">Auditorium</Link></li>
                        </ul>
                        <div className="hidden lg:inline-block w-32">
                            <button className="flex items-center hover:text-gray-200" href="#" onClick={handleOpenAccount}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                            {
                                isLoggedIn && <ul className="hidden min-w-max absolute text-base z-40 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none bg-gray-800" ref={accountMenu}>
                                    <li>
                                        <Link className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-white hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700"
                                            href="/myaccount">My Account
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-white hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700"
                                            href="/bookings">My Bookings
                                        </Link>
                                    </li>
                                    <li onClick={handleLogout}>
                                        <Link className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-white hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700"
                                            href="/">Sign Out
                                        </Link>
                                    </li>
                                </ul>
                            }
                            {
                                !isLoggedIn && <ul className="hidden min-w-max absolute text-base z-40 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none bg-gray-800" ref={accountMenu}>
                                    <li>
                                        <Link className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-white hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700"
                                            href="/login">Login
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-white hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700"
                                            href="/signup">Signup
                                        </Link>
                                    </li>
                                </ul>
                            }
                        </div>
                    </div>
                    <a className="navbar-burger self-center mr-12 xl:hidden" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </a>
                </nav>

            </section>

            {!isLoggedIn && <div className="fixed bottom-0 right-24 mb-4 mr-4 z-10 inline">
                <Link href="/signup">
                    <button type="button" className="px-4 py-2 text-sm font-medium text-center text-white bg-[#480cfc] rounded-lg hover:bg-[#3a0aca] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-[[#480cfc]] dark:hover:bg-[#3a0aca] dark:focus:ring-[#3a0aca] transition-all shadow hover:shadow-lg transform hover:scale-110"><div className="w-full flex items-center space-x-1"><BiUserPlus /><span>Signup</span></div></button>
                </Link>
            </div>}
            {!isLoggedIn && <div className="fixed bottom-0 right-0 mb-4 mr-4 z-10 inline">
                <Link href="/login">
                    <button type="button" className="px-4 py-2 text-sm font-medium text-center text-white bg-[#480cfc] rounded-lg hover:bg-[#3a0aca] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-[[#480cfc]] dark:hover:bg-[#3a0aca] dark:focus:ring-[#3a0aca] transition-all shadow hover:shadow-lg transform hover:scale-110"><div className="w-full flex items-center space-x-1"><BiUserPlus /><span>Login</span></div></button>
                </Link>
            </div>}
        </>
    )
}

export default Navbar