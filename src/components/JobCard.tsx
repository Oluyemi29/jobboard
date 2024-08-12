import Image from 'next/image'
import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaMoneyBillAlt } from "react-icons/fa";
import { CiClock1 } from "react-icons/ci";
import Time from './Time';
import Currency from './Currency';
import { searchSchemaType } from './Validation';
import { Prisma, PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient()

type Props ={
  filteredJob : searchSchemaType
}

const JobCard = async({filteredJob:{search,location,remote,type}} : Props) => {
  // console.log(search,location,remote,type);
  
  const searchedQuery = search?.split(' ').filter((word)=> word.length > 0).join(' & ')
  // console.log(searchedQuery);

  const searchQuery : Prisma.JobWhereInput = searchedQuery? {
    OR:[
      {title : {search : searchedQuery}},
      {location : {search : searchedQuery}},
      {type : {search : searchedQuery}},
      {locationType : {search : searchedQuery}},
      {companyName : {search : searchedQuery}}
    ]
  } : {}

  const where : Prisma.JobWhereInput = {
    AND : [
      searchQuery,
      location ? {location} : {},
      type ? {type} : {},
      remote ? {locationType: "Remote"} : {},
      {approved : true}
    ]
  }
  
    const jobs = await prisma.job.findMany({
        where,
        orderBy : {
          createdAt : "desc"
        }
      }) 
      // console.log(jobs);
      
  return (
    <div className='w-full'>
      
    { jobs.length> 0 ? 
    
    jobs.map((job : any, index : number)=>{
        return(
          <Link key={index} href={`/jobdetails/${job.slug}`}>
            <div  className='flex md:gap-0 gap-10 md:justify-between my-3 border-2 w-full border-slate-900 items-center rounded-md px-4 py-2'>
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
                    <span className='text-[0.6rem] md:text-[0.9rem]'><Time time={job.createdAt} /></span>
                </div>
              </div>
              </div>
            </div>
          </Link>
        )
    }) : <>
    
    <div className='w-full h-72 flex flex-col justify-center items-center'>
    <h1>Items You are searching is not available</h1>  
    </div></>}
    </div>
  )
}

export default JobCard
