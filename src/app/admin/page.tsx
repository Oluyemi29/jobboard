import React from 'react'
import AdminCardDetails from '@/components/AdminCardDetails'
import { PrismaClient } from '@prisma/client'
import AdminHeader from '@/components/AdminHeader'

const prisma = new PrismaClient()

const page = async() => {
    const jobs = await prisma.job.findMany({
        where : {
            approved : false
        }
    })
  return (
    <div>
        <AdminHeader/>
        <h1 className='text-center font-semibold'>Welcome Admin</h1>
      <AdminCardDetails jobs={jobs}/>
    </div>
  )
}

export default page
