'use client';
import React , {useEffect} from 'react'

const Layout = ({ children }) => {
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>


      <main>{children}</main>

    </>
  )
}

export default Layout
