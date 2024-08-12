"use client"
import React, { PropsWithChildren } from 'react'
import { SessionProvider } from "next-auth/react"

const AppProvider = ({children} : PropsWithChildren) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default AppProvider
