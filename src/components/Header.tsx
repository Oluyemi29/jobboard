import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between py-2 w-full items-center'>
      <div className='flex gap-2 items-center'>
        <Image 
        src={'/lap.jpg'}
        width={50}
        height={50}
        alt='brand'
        className=''
        />
        <h1 className='font-semibold'>Job Board</h1>
      </div>
        <Link href={'/postjob'}><button className='rounded-md bg-slate-950 text-white px-4 py-2'>Post a job</button></Link>
    </div>
  )
}

export default Header
