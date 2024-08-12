import { z } from "zod";
import { JobType, LocationType } from "./JobType";


const requiredString = z.string().min(1,{
    message : "required"
})
const companyLogoSchema = z.instanceof(File || undefined).refine((file)=>{return !file || file.size <= 1024 * 1024 * 2},"image must not be more than 2MB").refine((file)=> {return !file || file.type.startsWith('image/')},"it must be an image")
const applicationSchema = z.object({
    applicationEmail : z.string().email().optional().or(z.literal("")),
    applicationUrl : z.string().url().optional().or(z.literal(""))
}).refine(value=>value.applicationEmail || value.applicationUrl, {
    message : "email or url is needed",
    path : ["applicationEmail"]
})
const locationSchema = z.object({
    locationType : requiredString.refine(value=>LocationType.includes(value),"invalid location"),
    location : requiredString.max(100,"too much").optional()
}).refine(value=>!value.locationType || value.locationType === "Remote" || value.location,{
    message : "invalid location type",
    path : ["location"]
})
export const CreateJobSchema = z.object({
    title : requiredString.max(300,{
        message : "Text too much"
    }),
    typeofJob : requiredString.refine(value=>JobType.includes(value),{message : "invalid job value"}),
    companyName : requiredString.max(100,{message : "company name is too much"}),
    companyLogo : companyLogoSchema,
    description : requiredString.max(5000,{message : "must not be greater than 5000 words"}),
    salary : z.string().max(9,{message :"it must not be more than 9"}).transform(value=>Number(value)),
}).and(applicationSchema).and(locationSchema)

export type CreateJobType = z.infer<typeof CreateJobSchema>











export const searchSchema = z.object({
    search : z.string().optional(),
    type : z.string().optional(),
    location : z.string().optional(),
    remote : z.coerce.boolean().optional()
})

export type searchSchemaType = z.infer<typeof searchSchema>
