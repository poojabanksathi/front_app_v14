'use client';
import dynamic from 'next/dynamic'
import React from 'react'
import FAQ from '../../../common/FAQ/FAQ'

const ScoreDetailBredcrumb = dynamic(
  () => import('@/app/client/component/common/CommonList/ScoreDetailsComponent/ScoreDetailBredcrumb'),
  {
    ssr: false
  }
)
const ScoreFilterData = dynamic(
  () => import('@/app/client/component/common/CommonList/ScoreDetailsComponent/ScoreFilterData'),
  {
    ssr: false
  }
)

export default function SupportDetails({ faqdata ,productList}) {
  return (
    <>
      <div className='container px-20 max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-8 max-[479px]:px-0  mx-auto max-[991px]:max-w-full pt-[50px] max-[479px]:pt-[25px]'>
        {/* <ScoreDetailBredcrumb /> */}
        <ScoreFilterData faqdata={faqdata} productList={productList}/>
      </div>
 
    </>
  )
}
