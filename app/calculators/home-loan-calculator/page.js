import React from "react";
import dynamic from "next/dynamic";
import {
  BASE_URL,
  BUSINESSCATEGORY,
  COMMON,
  FAQAPI,
} from "@/utils/alljsonfile/service";
import Axios from "axios";

const FAQ = dynamic(() => import("@/app/client/component/common/FAQ/FAQ"), {
  ssr: false,
});

const BredcrumbCalculator = dynamic(
  () =>
    import("@/app/client/component/common/CalculatorCards/BredcrumbCalculator"),
  {
    ssr: false,
  }
);
const HomeLoanCalculator = dynamic(
  () =>
    import(
      "@/app/client/component/common/CalculatorCards/HomeCalculatorDetails"
    ),
  {
    ssr: false,
  }
);

async function getData() {
  try {
    const lang_id = 1;
    const context_params = "home-loan-calculator";

    const req1 = { lang_id: lang_id, url_slug: context_params };

    const req2 = { lang_id: lang_id, page_url_slug: context_params };

    const [data1, data2] = await Promise.all([
      Axios.post(BASE_URL + FAQAPI.productFaq, req1),
      Axios.post(BASE_URL + COMMON?.metaDetailPage, req2),
    ]).then((responses) => responses.map((response) => response.data));

    return {
      faqdata: data1,
      businessmetaheadtag: data2?.data || {},
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      businessCategorydata: null,
      faqdata: null,
      productList: null,
      businessmetaheadtag: {},
    };
  }
}

export default async function Page() {
  const { businessmetaheadtag, faqdata } = await getData();
  return (
    <>
      <div className="bg-[#F4F8FB] h-auto">
        <BredcrumbCalculator />
        <HomeLoanCalculator metaData={businessmetaheadtag} />
        <FAQ faqdata={faqdata} />
      </div>
    </>
  );
}