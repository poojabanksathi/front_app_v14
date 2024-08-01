'use client';
import React, { useEffect, useContext } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useWindowSize } from '@/hooks/useWindowSize'
import { MainContext } from '@/app/client/component/Leads/MainContext.js'
import TagManager from 'react-gtm-module'
import { is_webengage_event_enabled } from '@/utils/util'

const LeftProductDesc = dynamic(() => import('@/app/client/component/Leads/LeftProductDesc'), {
  ssr: false
})
const LeadsStepper = dynamic(() => import('@/app/client/component/Leads/LeadStepper'), {
  ssr: false
})

export default function Leads(props) {
  const productData = useContext(MainContext)
  const product_url = productData?.product_details?.url_slug?.split('/')[1]
  const size = useWindowSize()

  const handleGTM = () => {
    TagManager?.dataLayer({
      dataLayer: {
        event: 'apply_card',
        product_category: product_url,
        product_name: productData?.product_details?.card_name,
        product_link : ""

      },
    });
  }

  const handleWebEngageEvent = (eventName, eventData) => {
    if (is_webengage_event_enabled && typeof window !== 'undefined' && window.webengage) {
      window.webengage.track(eventName, eventData);
    }
  }

  useEffect(() => {
    handleWebEngageEvent('apply_card', {
        product_category: product_url,
        product_name: productData?.product_details?.card_name || "",
        product_link : ""

    });
}, [product_url, productData?.product_details?.card_name]);

  useEffect(() => {
    handleGTM();
  }, []);

  return (
    <>
      {size?.width >= 768 ? (
        <div className='grid grid-cols-12 gap-x-4 mb-6 '>
          <div className='lg:col-span-5 col-span-12 md:py-4 md:px-2  max-sm:py-0 '>
            <LeftProductDesc />
          </div>
          <div className='lg:col-span-7 col-span-12 p-4'>
            <LeadsStepper data={props.data} referer={props?.referer} leadsField={props?.leadsField} />

            {/* <div className='bg-white relative rounded-[16px] h-full px-16 max-[1200px]:px-8 max-[479px]:px-4 py-10 max-[280px]:!px-4'>
          <ApplicationSuccessFull />
        </div> */}
          </div>
        </div>
      ) : (
        <div className=''>
          {productData?.product_details?.card_name && (
            <h2 className='text-[24px] font-semibold text-[#212529] leading-[33px] py-4'>
              Application for {productData?.product_details?.card_name}
            </h2>
          )}
          <LeadsStepper data={props.data} referer={props?.referer} leadsField={props?.leadsField} />

          <LeftProductDesc />
        </div>
      )}
    </>
  )
}
