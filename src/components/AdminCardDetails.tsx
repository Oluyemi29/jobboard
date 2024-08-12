"use client"
import Currency from '@/components/Currency'
import Time from '@/components/Time'
import Image from 'next/image'
import React from 'react'
import { CiClock1 } from 'react-icons/ci'
import { FaMoneyBillAlt } from 'react-icons/fa'
import { FaLocationCrosshairs, FaLocationDot } from 'react-icons/fa6'
import  {adminEdit, adminDelete } from '@/app/action/adminEdit'

type jobsProps ={
    jobs : any
}

const AdminCardDetails : React.FC<jobsProps> = ({jobs} ) => {
    
    return (
        <div className='w-full'>
          
        { jobs?.length> 0 ? 
        
        jobs.map((job : any, index : number)=>{
            return(
                <div key={index} className='flex gap-10 md:gap-0 md:justify-between my-3 border-2 w-full border-slate-900 items-center rounded-md px-4 py-2'>
                  <Image 
                  src={job.companyLogoUrl || '/lap.png'}
                  width={200}
                  height={200}
                  alt='jobs'
                  quality={50}
                  priority
                  className='md:w-40 md:h-40 w-14 h-14'
                  />
                  <div className='flex md:flex-row md:justify-between md:w-[60%] flex-col gap-2'>
                  <div>
                    <h1 className='md:text-[1rem] text-[0.8rem] font-semibold'>{job.title}</h1>
                    <h1 className='text-[0.6rem] md:text-[0.9rem]'>{job.companyName}</h1>
                    <div className='flex gap-1 items-center'>
                        <FaLocationDot className='text-[0.6rem]' />
                        <h3 className='text-[0.6rem] md:text-[0.9rem]'>{job.locationType}</h3>
                    </div>
                    <div className='flex gap-1 items-center'>
                    <FaLocationCrosshairs className='text-[0.6rem]'/>
                    <h1 className='text-[0.6rem] md:text-[0.9rem]'>{job.location}</h1>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <FaMoneyBillAlt className='text-[0.6rem]'/>
                        <h1 className='text-[0.6rem] md:text-[0.9rem]'><Currency amount={job.salary}/></h1>
                    </div>
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-[0.6rem] w-max bg-slate-200 px-2 py-1 rounded-md '>{job.locationType}</span>
                    <div className='flex gap-1 items-center mt-3'>
                        <CiClock1 className='text-[0.6rem]'/>
                        {/* <span className='text-[0.6rem] md:text-[0.9rem]'><Time time={job.createdAt} /></span> */}
                    </div> 
                    <div className='flex gap-2 mt-3'>
                        <button className='bg-green-600 text-white text-[0.7rem] px-3 py-1 rounded-md' onClick={()=>{adminEdit(job),console.log(job.slug);
                        }}>Approve</button>
                        <button onClick={()=>{adminDelete(job)}} className='bg-red-600 text-white text-[0.7rem] px-3 py-1 rounded-md'>Delete</button>
                    </div>
                  </div>
                  </div>
                </div>
            )
        }) : <>
        
        <div className='w-full h-72 flex flex-col justify-center items-center'>
        <h1>Items You are searching is not available</h1>  
        </div></>}
        </div>
      )
}

export default AdminCardDetails
