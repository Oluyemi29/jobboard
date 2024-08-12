import React, { ReactNode } from 'react'
import { Metadata } from 'next'
import AppProvider from '@/components/AppProvider'

type childrenProps ={
    children : ReactNode
}

export const metadata : Metadata = {
    title : "admin"
}
const Layout = ({children} : childrenProps) => {
  return (
    <div>
        <AppProvider>
      {children}
      </AppProvider>
    </div>
  )
}

export default Layout
