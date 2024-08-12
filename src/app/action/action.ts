"use server"
import { PrismaClient } from "@prisma/client"
import { redirect } from "next/navigation"

const prisma = new PrismaClient()

const send = async (
    title : string,
    companyName : string,
    locationType : string,
    salary : number ,
    slug : string,
    typeofJob : string,
    applicationEmail : string | undefined,
    logoUrl : string | undefined,
    applicationUrl : string | undefined,
    description : string | undefined,
    location : string | undefined)=>{

    await prisma.job.create({
        data :{
            title : title.trim(),
            companyName : companyName.trim(),
            locationType : locationType,
            salary ,
            slug,
            type : typeofJob,
            applicationEmail : applicationEmail?.trim(),
            companyLogoUrl : logoUrl,
            applicationUrl : applicationUrl?.trim(),
            description : description?.trim(),
            location : location?.trim(),
            approved : false
        }
    })

    redirect('/')
}

export default send