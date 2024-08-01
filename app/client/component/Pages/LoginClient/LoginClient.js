

'use client'
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const DynamicHeader = dynamic(() => import('@/app/client/component/common/Header'), {
  ssr: false
})

const Loginpage = dynamic(() => import('@/app/client/component/common/Login'), {
  ssr: false
})

const MobileFooter = dynamic(() => import('@/app/client/component/common/MobileFooter'), {
  ssr: false
})

const LoginClient = (lastPageVisited) => {
  const router = useRouter()

  useEffect(() => {
    if (typeof window!== 'undefined') {
      if (localStorage.getItem('token') && localStorage.getItem('userData') && localStorage.getItem('leadprofileid')) {
        toast.success('Already logged in!')
        router?.push('/')
      }
    }
  }, [router])



  return (
    <>
      <div className='h-full bg-[#F4F8FB] login-mobile-res '>
   
        <Loginpage lastPageVisited={lastPageVisited} />
      </div>
    </>
  )
}


export default LoginClient;
