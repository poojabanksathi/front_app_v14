"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { getPromotionObject, sendEventToGTM } from "@/utils/util";
import { useIsInViewport } from "@/hooks/useIsInViewport";
import { usePathname, useRouter } from "next/navigation";

const CheckCibilCard = ({ cardData, pathName, position, title }) => {
  const cibilAndEligibilityRef = useRef(null);
  const router = useRouter();
  const isInViewPort = useIsInViewport(cibilAndEligibilityRef);
const pathNameurl = usePathname()
  const pageRoute = pathNameurl;

  const eventData = {
    eventName: "select_promotion",
    title: title,
    position: position,
    route: pageRoute,
  };

  const callPromotionViewEvent = () => {
    const data = {
      eventName: "view_promotion",
      title: title,
      position: position,
      route: pageRoute,
    };
    sendEventToGTM(getPromotionObject(data));
  };

  useEffect(() => {
    if (isInViewPort) {
      callPromotionViewEvent();
    }
  }, [isInViewPort]);

  return (
    <div
      ref={cibilAndEligibilityRef}
      className={`${
        cardData?.eligibile ? "px-[16px]" : ""
      }  flex  items-center justify-center flex-col xl:w-[380px] 2xl:w-auto lg:w-full max-[768px]:w-full bg-[#EDE3FD] rounded-xl`}
    >
      <div
        className={`${cardData?.eligibile ? "mt-[22px] mb-[18px]" : "mt-[40px] mb-[30px]"}`}
      >
        <Image
          src={cardData?.image}
          width={cardData?.width || 150}
          height={cardData?.height || 140}
          priority={true}
          alt="rounded circle"
          className="w-auto h-auto"
        />
      </div>
      <div className="flex flex-col gap-[2px] px-[10px] max-sm:px-[20px]">
        <div className="text-center text-neutral-800 text-lg font-bold font-['Poppins']">
          {cardData?.title}
        </div>
        <div className="text-center text-neutral-800 text-[15px] font-normal font-['Poppins'] leading-[21px]">
          {cardData?.subTitle}
        </div>
        <div
          className="mt-[24px] mb-[40px] text-center"
          onClick={() => sendEventToGTM(getPromotionObject(eventData))}
        >
          <Link
            href={pathName ? pathName : cardData?.pathName}
            prefetch={false}
          >
            <button className="bg-[#49D49D] w-full lg:w-[240px] h-[48px] rounded-md font-faktum font-semibold text-[15px] leading-[18px] tracking-wide text-[#212529]">
              {cardData?.buttonText}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckCibilCard;
