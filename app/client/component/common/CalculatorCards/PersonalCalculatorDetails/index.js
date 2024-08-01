'use client';
import Image from "next/image";
import PersonalRupee from "../../../../../../public/assets/personal-loan-cal.svg";
import React from "react";
import EmiSliderChart from "../LoanCalculatorEmiDetails/EmiSliderChart";
import ParagraphBanner from "@/app/client/component/Layout/CategoryParagraphBanner";
import { scoreData } from "@/utils/alljsonfile/checkCibilCardList";
import { eligibilityData } from "@/utils/alljsonfile/checkCibilCardList";
import dynamic from "next/dynamic";
import CheckCibilCard from "../../CheckCibilCard/CheckCibilCard";

const CreditNewsOffer = dynamic(
  () =>
    import(
      "../../../../../client/component/Layout/CreditNews/CreditScoreCard/CreditNewsOffer"
    ),
  { ssr: false }
);
const VedioCheck = dynamic(
  () => import("@/app/client/component/common/VedioCheck"),
  {
    ssr: false,
  }
);
const CalculatorBeginnerCard = dynamic(
  () =>
    import("@/app/client/component/Layout/Calculator/CalculatorBeginnerCard"),
  {
    ssr: false,
  }
);

function PersonalCalculatorDetails({ metaData }) {
  return (
    <div className="container h-full  mx-auto max-[991px]:max-w-full pt-[30px] pb-[40px] max-[834px]:py-[35px] max-[576px]:py-[52px] max-[479px]:py-[20px] max-[1024px]:px-8 max-[479px]:px-0 max-[375px]:px-0 max-[320px]:px-0">
      <div className=" px-8 max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-0 max-[576px]:gap-8 max-[479px]:px-0 ">
        <div className="flex max-md:block text-center gap-[20px]">
          <div className="max-sm:flex max-sm:justify-center">
            <Image
              src={PersonalRupee}
              width={85}
              height={85}
              alt="loan_icon"
              className="mx-auto"
            />
          </div>
          <div>
            <h1 className="text-[36px] max-sm:text-[20px] text-[#212529] font-semibold">
              Personal Loan EMI Calculator
            </h1>
            <p className="text-[18px] max-sm:text-[16px] text-[#49D49D] font-semibold">
              Navigate Your Needs, Streamlining Personal Loans
            </p>
          </div>
        </div>
        <div className="grid grid-cols-12 mt-[35px]">
          <div className="col-span-8 max-lg:col-span-12 h-full">
            <div className="max-sm:px-4 max-[320px]:px-0">
              {metaData && (
                <div className="max-[320px]:px-2">
                  <ParagraphBanner metaResponseBanner={metaData} />
                </div>
              )}
              <EmiSliderChart loanname={"personal-loan"} />
            </div>
            <div>
              <VedioCheck productDetailsData={metaData} />
              <CalculatorBeginnerCard longTerm={metaData} paddingHide={true} />
            </div>
          </div>

          <div className="col-span-4 max-sm:px-4 max-[320px]:px-0  max-lg:col-span-12 lg:mx-[30px] max-md:mx-[0px] max-lg:mt-8 rounded-lg h-full">
            <div className="flex flex-col gap-[30px] max-[768px]:justify-center max-[768px]:items-center lg:relative lg:bottom-[3%]">
              <CheckCibilCard
                cardData={scoreData}
                position={"5"}
                title={"Check Score"}
              />
              <CreditNewsOffer position={"6"} />
              <CheckCibilCard
                cardData={eligibilityData}
                position={"7"}
                title={"Check Eligibility"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalCalculatorDetails;
