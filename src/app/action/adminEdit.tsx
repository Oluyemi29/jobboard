"use server"
import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { Job } from '@prisma/client'

type jobsProps ={
    job : any
}
export const adminEdit = async(job : Job) => {
    // console.log(slug);

    await prisma?.job.update({
        where : {
            slug : job.slug
        },
        data : {
            approved : true
        }
    })
    revalidatePath('/admin')
    revalidatePath('/')
}

export const adminDelete = async(job : Job)=>{
    await prisma?.job.delete({
        where : {
            slug : job.slug
        }
    })
    revalidatePath('/admin')
    revalidatePath('/')
}
