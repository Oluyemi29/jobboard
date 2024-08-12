'use client'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { CreateJobSchema, CreateJobType } from './Validation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { JobType, LocationType } from './JobType'
import createJob from '@/app/action/createJob'

const JobForm = () => {
  const [applicationEmail, setApplicationEmail] = useState('')
  const [applicationUrl, setApplicationUrl] = useState('')
    const {register,control,handleSubmit, formState:{isLoading, errors}} = useForm<CreateJobType>({
        resolver : zodResolver(CreateJobSchema)
    })
    const submit = async (data :CreateJobType)=>{
      createJob(data)
      // console.log(data);
    }
  return (
    <div>
      <div>
      <h1 className='font-bold text-lg md:text-2xl text-center'>Find Your perfect developer</h1>
        <p className='text-center text-sm md:text-lg font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, voluptates excepturi molestias eius dolor vero?</p>
      </div>
      <div className='border-2 w-full md:w-[50%] mx-auto border-gray-300 rounded-md'>
        <h1 className='text-center text-lg md:text-2xl font-bold'>Job details</h1>
        <p className='text-center text-sm md:text-lg font-semibold'>Provides a job description and details</p>
        <form className='w-full p-5' onSubmit={handleSubmit(submit)} action='' method="post">
            <label className='title' htmlFor="title">Job Title</label>
            <input {...register("title")} className='inputting px-2' placeholder='e.g Front-end Developer' type="text" name="title" id="title" />
            {errors.title && <span className='text-red-600 text-[0.7rem]'>{errors.title.message}</span>} <br />
            <label className='title' htmlFor="description">Job Description</label>
            <input {...register("description")} className='inputting px-2' placeholder='Description' type="text" name="description" id="description" />
            {errors.description && <span className='text-red-600 text-[0.7rem]'>{errors.description.message}</span>} <br />
            <label className='title' htmlFor="Company Name">Job Company Name</label>
            <input {...register("companyName")} className='inputting px-2' placeholder='Company Name' type="text" name="companyName" id="companyName" />
            {errors.companyName && <span className='text-red-600 text-[0.7rem]'>{errors.companyName.message}</span>} <br />
            <label className='title' htmlFor="Company Name">Job Company Logo</label> <br />
            <Controller 
            name='companyLogo'
            control={control}
            defaultValue={undefined}
            render={({field : {onChange}})=>(
              <input className='inputting' type='file' onChange={(e:any)=>{
                onChange(e.target.files[0])
              }}/>
            )}
            />{errors.companyLogo && <span className='text-red-600 text-[0.7rem]'>{errors.companyLogo.message}</span>} <br />
            <label className='title' htmlFor="Salary">Job Salary</label>
            <input {...register("salary")} className='inputting px-2' placeholder='Job Salary' type="number" name="salary" id="salary" />
            {errors.salary && <span className='text-red-600 text-[0.7rem]'>{errors.salary.message}</span>} <br />
            <label className='title mt-3' htmlFor="type">Job Type</label>
            <select defaultValue='' className='inputting' id="typeofJob" {...register("typeofJob")} >
              <option value="">All Types</option>
              {JobType.map((jTypes,index)=>{
                return <option key={index} value={jTypes}>{jTypes}</option>
              })} 
            </select>
            {errors.typeofJob && <span className='text-red-600 text-[0.7rem]'>{errors.typeofJob.message}</span>} <br />
            <label className='title mt-3' htmlFor="type">Location Type</label>
            <select className='inputting' id="locationType" {...register("locationType")} >
              <option value="">All Types</option> 
              {LocationType.map((lTypes,index)=>{
                return <option key={index} value={lTypes}>{lTypes}</option>
              })} 
            </select>
            {errors.locationType && <span className='text-red-600 text-[0.7rem]'>{errors.locationType.message}</span>} <br />
            <label className='title' htmlFor="Salary">Job Location</label>
            <input {...register("location")} className='inputting px-2' placeholder='Job location' type="text" name="location" id="location" />
            {errors.location && <span className='text-red-600 text-[0.7rem]'>{errors.location.message}</span>} <br />
            <label className='title' htmlFor="How to apply">Job How to apply</label>
            <div className='flex w-full gap-3 items-center'>
              <div className='w-full' >

            <input {...register("applicationEmail")} className='inputting px-2' placeholder='Job applicationEmail' value={applicationEmail} type="text" name="applicationEmail" id="applicationEmail" onChange={(e)=>{setApplicationUrl(""), setApplicationEmail(e.target.value)}} />
              </div>
            <h1 className='font-semibold'>Or</h1>
            <input {...register("applicationUrl")} className='inputting px-2' placeholder='Job applicationUrl' value={applicationUrl} type="text" name="applicationUrl" id="applicationUrl" onChange={(e)=>{setApplicationUrl(e.target.value), setApplicationEmail("")}} />
            </div>
            {errors.applicationEmail && <span className='text-red-600 text-[0.7rem]'>{errors.applicationEmail.message}</span>} 

            <button type='submit' className='bg-slate-950 py-3 rounded-md text-white mt-10 w-full'>Create Job</button>
        </form>
      </div>
    </div>
  )
}

export default JobForm
