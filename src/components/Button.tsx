"use client"
import React from 'react'
import { useFormStatus } from 'react-dom'
import {Loader2} from 'lucide-react'

const Button = ({children} : any) => {
    const {pending} = useFormStatus()
  return (
    <div>
      <button type='submit' className='bg-slate-950 rounded-md text-center text-white w-full py-2'>{pending? <Loader2 className='animate-spin mx-auto' />:children}</button>
    </div>
  )
}

export default Button
