"use client"
import TimeAgo from "react-timeago"
import React from 'react'

type Props ={
    time : Date
}


const Time = ({time}:Props) => {
  return (
      <div>
        <TimeAgo date={time}/>
      </div>
  )
}

export default Time
