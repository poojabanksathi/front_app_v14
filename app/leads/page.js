// app/leads/page.js

import {
  BASE_URL,
  COMMON,
  FAQAPI,
  PRODUCTSAPI,
} from "@/utils/alljsonfile/service";
import Axios from "axios";
import dynamic from "next/dynamic";
import LeadsClient from "../client/component/Pages/LeadsClient/LeadsClient";
import React, { Suspense } from "react";
import { cookies } from "next/headers";

const FAQ = dynamic(() => import("@/app/client/component/common/FAQ/FAQ"), {
  ssr: false,
});

const CreditBeginnerCard = dynamic(
  () =>
    import("@/app/client/component/Layout/creditCardList/CreditBeginnerCard"),
  { ssr: false }
);


export default async function Leads({ searchParams }) {

  const { productData, referer, leadsField, faqData, longFormData } =
    await getData(searchParams);

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <div className="bg-[#F4F8FB] ">
          <LeadsClient
            productData={productData}
            referer={referer}
            leadsField={leadsField}
          />
        </div>

        <div className="bg-[#F4F8FB] h-auto">
        <Suspense fallback={<div>Loading...</div>}>

          <CreditBeginnerCard longTerm={longFormData} />
          </Suspense>
        </div>

        <div className="bg-[#F4F8FB] h-auto">
        <Suspense fallback={<div>Loading...</div>}>

          <FAQ faqdata={faqData} />
          </Suspense>

        </div>
      </div>
    </>
  );
}

async function getData(searchParams) {
  try {
    const h =  "";
    const url_slug = searchParams?.url_slug || "";

    const req1 = {
      lang_id: 1,
      url_slug: url_slug,
    };
    const req2 = {
      lang_id: 1, // Assuming lang_id is 1, adjust if needed
      page_url_slug: url_slug,
    };
    const faqParams = {
      lang_id: 1, // Assuming lang_id is 1, adjust if needed
      url_slug: url_slug,
    };

    const productData = await Axios.post(
      BASE_URL + PRODUCTSAPI.getProductDetails,
      req1
    ).then((res) => res?.data);

    const longForm = await Axios.post(
      BASE_URL + COMMON?.metaDetailPage,
      req2
    ).then((res) => res?.data);

    const faqData = await Axios.post(
      BASE_URL + FAQAPI.productFaq,
      faqParams
    ).then((res) => res?.data);

    if (productData?.data === false) {
      throw new Error("Product data not found");
    }

    return {
      productData: productData.data,
      referer: ref,
      leadsField: {},
      h: h,
      faqData: faqData || {},
      longFormData: longForm || {},
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      notFound: true,
    };
  }
}
