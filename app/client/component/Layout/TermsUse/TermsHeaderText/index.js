'use client';
import React from 'react'
function Index({ title }) {
  return (
    <h1 className='head-text xl:!leading-tight font-semibold xl:!text-[50px] lg:!text-[50px] md:text-[40px] sm:text-[38px] !leading-[66px] max-[475px]:text-[24px] text-white max-[479px]:!leading-8  max-[479px]:text-[24px]  max-[576px]:!leading-10  max-[576px]:text-[32px] relative '>
      {title}
    </h1>
  )
}

export default Index
