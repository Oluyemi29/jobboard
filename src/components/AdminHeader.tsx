"use client"
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

const AdminHeader = () => {
    const {data : session,status} = useSession()
    const email = session?.user?.email
  return (
    <div className='my-6 flex justify-between px-5'>
      <h1 className='text-[1rem] underline underline-offset-2 font-semibold'>AdminDashboard</h1>
      <div className='flex gap-3 items-center'>
        <h1 className='text-[0.8rem] hidden md:flex font-semibold'>{email}</h1>
        <button className='bg-slate-950 text-white rounded-md px-4 py-2' onClick={()=>signOut()}>LogOut</button>
      </div>
    </div>
  )
}

export default AdminHeader
