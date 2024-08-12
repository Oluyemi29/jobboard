
import JobCard from "@/components/JobCard";
import JobSearch from "@/components/JobSearch";
import { searchSchemaType } from "@/components/Validation";
import { Suspense } from "react";
import { Metadata } from "next";

interface Props {
  searchParams :{
    search? :string,
    type? : string,
    location? : string,
    remote? : string
  }
}
export function generateMetadata({searchParams :{search,location,remote,type}} : Props) : Metadata{
  const filteredJob : searchSchemaType ={
    search,
    location,
    remote : remote === "true",
    type
  }
  const getTitle = (filteredJob? :{search? : string | undefined,location? : string | undefined,type? : string | undefined,remote? : boolean | undefined})=>{
    const getPrefix = search? `${search} Job` : type? `${type}` : remote? "and remote developers Job" : "All developers"
    const getJobLocation = location? `in ${location}` : "";
    return `${getPrefix} ${getJobLocation}`
  }
  return {
    title : `${getTitle(filteredJob)} | JobBoard`
  }
}
export default async function Home({searchParams:{search,type,location,remote},}:Props) {

  const filteredJob : searchSchemaType ={
    search,
    location,
    remote : remote === "true",
    type
  }

  const getTitle = (filteredJob? :{search? : string | undefined,location? : string | undefined,type? : string | undefined,remote? : boolean | undefined})=>{
    const getPrefix = search? `${search} Job` : type? `${type}` : remote? "and remote developers Job" : "All developers"
    const getJobLocation = location? `in ${location}` : "";
    return `${getPrefix} ${getJobLocation}`
  }


  
  return (
    <div className="flex flex-col justify-center items-center">

      <h1 className="font-bold text-xl">{getTitle(filteredJob)}</h1>

      <h1 className="my-3">Find your dreams job</h1>
      <div className="flex items-start md:flex-row flex-col w-full justify-center gap-4">
      <JobSearch defaultJob = {filteredJob}/>
      <Suspense fallback={'loading'}>
      <JobCard filteredJob = {filteredJob} />
      </Suspense>
      </div>
    </div>
  );
}
