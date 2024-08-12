import React from 'react'
import { Label } from './ui/label'
import { searchSchema, searchSchemaType } from './Validation'
import { redirect, useRouter } from 'next/navigation'
import prisma from '@/lib/prisma'
import { JobType } from './JobType'
import Button from './Button'

type Props = {
  defaultJob : searchSchemaType;
}

const JobSearch = async({defaultJob : {location,remote,search,type}} : Props) => {
  
  const CreateForm = async (formData : FormData)=>{
    "use server"
    // const search = formData.get('search')
    // const type = formData.get('type')
    // const location = formData.get('location')
    // const remote = formData.get('remote')
    // console.log(search,type,location,remote);

    const values = Object.fromEntries(formData.entries())

    const {location,remote,search,type} = searchSchema.parse(values)

    const searchUrl = new URLSearchParams({
      ...(search && {search : search.trim()}),
      ...(type && {type}),
      ...(location && {location}),
      ...(remote && {remote : "true"})
    })
    redirect(`/?${searchUrl.toString()}`)  
  }

  //getlocation

    const distinctLocation = await prisma.job.findMany({
      where:{
        approved : true
      },
      select:{
        location:true
      },
      distinct:['location']
    })
    const locations = distinctLocation.map(({location})=>{
      return location
    }).filter(Boolean) as string[]

   
  return (
    <div className='w-full sticky top-0 md:w-[30%] bg-white my-3'>
      <form key={JSON.stringify({search,location,remote,type})} action={CreateForm} className='border-2 border-slate-950 p-3 rounded-md'>
        <Label htmlFor='search' className='text-sm font-bold'>Search</Label> 
        <input className='border-2 rounded-md px-2 outline-none border-slate-500 w-full h-10' placeholder='Search' defaultValue={search || ''} name='search' id='search'/>
        <Label htmlFor='type' className='text-sm font-bold'>type</Label> 
        <select className='w-full h-10 rounded-md border-2 border-slate-500'defaultValue={type ||""} name="type" id="type">
        <option value={""}>Choose Type</option>
        {JobType.map((types:any,index:number)=>{
          return <option key={index} value={types}>{types}</option>
        })}
        </select>
        <Label htmlFor='location' className='text-sm font-bold'>location</Label> 
        <select className='w-full h-10 rounded-md border-2 border-slate-500' defaultValue={location || ''} name="location" id="location">
        <option value={""}>Choose Location</option>
          {locations.map((location:any, index :number)=>{
            return <option key={index} value={location}>{location}</option>
          })}
        </select>
        <input type='checkbox' defaultChecked={remote} className='w-4 h-4 mt-5' name='remote' id='remote'/>
        <label>Remote Job</label>

        <Button>FIlter Job</Button>
      </form>
    </div>
  )
}

export default JobSearch
