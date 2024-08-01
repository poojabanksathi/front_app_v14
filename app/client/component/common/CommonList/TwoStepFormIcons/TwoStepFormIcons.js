'use client';
import React from 'react'
import Image from 'next/image'
import briefCase from '../../../../../../public/assets/briefcase.svg'
import dashLine from '../../../../../../public/assets/dash-line.svg'
import dashLineActive from '../../../../../../public/assets/dash-line-active.svg'
import userCheckActive from '../../../../../../public/assets/user-check-active.svg'
import briefCaseActive from '../../../../../../public/assets/briefcase-active.svg'

const TwoStepFormIcons = ({ stepperData }) => {
  return (
    <div>
      <div className='flex justify-between items-center mt-[20px]'>
        <div className='flex flex-col gap-[4px]  justify-center items-center'>
          <div className='w-[50px] h-[50px] border justify-center flex items-center  border-[#844FCF] rounded-full  '>
            <Image src={userCheckActive} alt='phone' width={20} height={20} />
          </div>
          <p className='text-[12px] text-[#212529] font-normal max-sm:text-[10px] !text-center font-[poppins]'>
            {stepperData?.firstTtitle}
          </p>
        </div>
        <div className=' flex justify-center items-center'>
          <Image
            className=' text-[#212529]  mb-6'
            src={stepperData?.modalStepper >= 1 ? dashLineActive : dashLine}
            width={'147'}
            height={1}
            alt='dashline'
          />
        </div>
        <div className='flex flex-col gap-[4px] justify-center text-center items-center'>
          <div
            className={`w-[50px] h-[50px] border justify-center flex items-center ${
              stepperData?.modalStepper >= 1 ? 'border-[#844FCF] ' : 'border-[#C2CACF]'
            }  rounded-full`}>
            <Image
              src={stepperData?.modalStepper >= 1 ? briefCaseActive : briefCase}
              alt='phone'
              width={20}
              height={20}
            />
          </div>
          <p className='text-[12px] max-sm:text-[10px] text-[#212529] font-normal text-center font-[poppins]'>
            {stepperData?.secondTitle}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TwoStepFormIcons
