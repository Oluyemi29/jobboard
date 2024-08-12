"use client"
import { CreateJobType } from "@/components/Validation";
import slugify from "slugify"
import {put, PutBlobResult} from "@vercel/blob"
import path from "path";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import send from "./action";
import toast from "react-hot-toast"

const createJob = async (formData : CreateJobType)=>{
    
    const {companyLogo,companyName,description,locationType,salary,title,location,applicationEmail,applicationUrl,typeofJob} =  formData

    // console.log(companyLogo,companyName,description,locationType,salary,title,location,applicationEmail,applicationUrl,typeofJob);
    

    
    const slug = slugify(title,{
        replacement : "-",
        remove : undefined,
        lower : true,
        strict : true,
        locale : "vi",
        trim : true
    })
    // console.log(slug);

    const upload_preset = "jobboard"
    const cloud_name = "devoluyemi"
    try {
        const getUrl = async()=>{
            const Imageing = new FormData()
            Imageing.append('file', companyLogo),
            Imageing.append('upload_preset', upload_preset)
            const ImageLink = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,{
                method : "POST",
                body : Imageing
            })
            const data = await ImageLink.json()
            return data.url
            }
            const logoUrl : string = await getUrl()
            console.log(logoUrl);
            
            send(title ,
                companyName ,
                locationType ,
                salary ,
                slug ,
                typeofJob ,
                applicationEmail  ,
                logoUrl  ,
                applicationUrl  ,
                description  ,
                location  )
            
                toast.success('job created successfull')
        
    } catch (error) {
        console.log(error);
        
    }
    

    
}

export default createJob