"use client";

import { useSelector } from "react-redux"
import { redirect } from 'next/navigation';
import Navbar from '@/components/Navbar';

const UserProfile = () => {
  const isAdmin = useSelector(state => state.user.isAdmin)
  if (isAdmin)
    redirect("/admin")
    
  const user = useSelector(state => state.user.user)
  if (!user) redirect('/signup');

  return (
    <div>
      <Navbar />
      <div className='w-full grid place-items-center my-16'>
        <ul className='flex flex-col space-y-2 border-2 border-solid border-slate-400 p-4 rounded-lg'>
          <li className='flex flex-row items-center'>
            <span className='font-semibold text-xl min-w-[10rem]'>Name:</span>
            <span className='text-xl'>{user.name}</span>
          </li>
          <li className='flex flex-row items-center'>
            <span className='font-semibold text-xl min-w-[10rem]'>Email:</span>
            <span className='text-xl'>{user.email}</span>
          </li>
          <li className='flex flex-row items-center'>
            <span className='font-semibold text-xl min-w-[10rem]'>ID:</span>
            <span className='text-xl'>{user.userid}</span>
          </li>
          <li className='flex flex-row items-center'>
            <span className='font-semibold text-xl min-w-[10rem]'>Department:</span>
            <span className='text-xl'>{user.dept}</span>
          </li>
          <li className='flex flex-row items-center'>
            <span className='font-semibold text-xl min-w-[10rem]'>User Type:</span>
            <span className='text-xl'>{user.user_type.charAt(0).toUpperCase() + user.user_type.slice(1)}</span>
          </li>
          <li className='flex flex-row items-center'>
            <span className='font-semibold text-xl min-w-[10rem]'>Dues:</span>
            <span className='text-xl'>&#8377;&nbsp;{user.dues}</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default UserProfile