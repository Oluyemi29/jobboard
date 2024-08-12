
import NotFound from '@/app/not-found'
import { PrismaClient } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaMoneyBillAlt } from "react-icons/fa";
import { CiClock1 } from "react-icons/ci";
import Markdown from "react-markdown"
import Link from 'next/link';

const prisma = new PrismaClient()



type jobdetailsProps = {
  params : {
    slug : string
  }
}
const getJob = (async (slug: string)=>{
  const res = await prisma.job.findUnique({
    where : {
      slug
    }
  })
  if(!res) {
    return NotFound()
  }
  return res
})
export async function generateMetadata({ params : {slug} } : jobdetailsProps) {
  const titleToUse = await prisma.job.findUnique({
    where : {
      slug
    }
  })
  return {
    title: `${titleToUse?.slug}`
  }
}
export async function generateStaticParams({params : {slug}} : jobdetailsProps) {
  const res = await prisma.job.findMany({
    where :{
      slug
    },
    select : {
      slug : true
    }
  })
  return res
} 
const page = async ({params : {slug}} : jobdetailsProps) => {
  console.log(slug);

  const Details = await prisma.job.findUnique({
    where : {
      slug
    }
  })
  
  return (
    <div className='mt-5 '>

      <div className='flex gap-5 justify-between'>
        <Image 
        src={'/lap.png'}
        width={200}
        height={200}
        alt='mine'
        className='md:w-36 w-12 h-10 md:h-36'
        />
        <div>
          <h1 className='font-bold text'>{Details?.title}</h1>
          {Details?.applicationUrl? <>
           <Link href={new URL(Details.applicationUrl).origin}><p className=' text-green-500 my-1 text-[0.7rem]'>{Details?.companyName}</p></Link>
          
          </>: <>
          <p className=' text-green-500 my-1 text-[0.7rem]'>{Details?.companyName}</p>
          
          </>}
          <div className=' flex gap-2 items-center'>
            <FaLocationDot className='text-[0.6rem]'/>
            <p className='text-[0.7rem]'>{Details?.type}</p>
          </div>
          <div className=' flex gap-2 items-center'>
            <FaLocationCrosshairs className='text-[0.6rem]'/>
            <p className='text-[0.7rem]'>{Details?.location}</p>
          </div>
          <div className=' flex gap-2 items-center'>
            <FaMoneyBillAlt className='text-[0.6rem]'/>
            <p className='text-[0.7rem]'>{Details?.salary}</p>
          </div>
        </div>
        {Details?.applicationUrl? <>

        <Link href={Details.applicationUrl}><button className='hidden md:flex rounded-md px-4 py-2 bg-slate-950 text-white h-max text-[0.7rem]'>Apply now</button></Link>
        </> : <>
        <Link href={`mailto:${Details?.applicationEmail}`}><button className='hidden md:flex rounded-md px-4 py-2 bg-slate-950 text-white h-max text-[0.7rem]'>Apply now</button></Link>
        
        </>}
      </div>
      <Markdown >{Details?.description}
      </Markdown>

  <div className=' w-full flex justify-center my-10'>
        {Details?.applicationUrl? <>

        <Link href={Details.applicationUrl}><button className='md:hidden flex rounded-md px-4 py-2 bg-slate-950 text-white h-max text-[0.7rem]'>Apply now</button></Link>
        </> : <>
        <Link href={`mailto:${Details?.applicationEmail}`}><button className='md:hidden flex rounded-md px-4 py-2 bg-slate-950 text-white h-max text-[0.7rem]'>Apply now</button></Link>

        </>}
        </div>
    </div>
  )
}

export default page
