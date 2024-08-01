import React from 'react'
import dynamic from 'next/dynamic'
import { BASE_URL, BUSINESSCATEGORY, BLOG } from '@/utils/alljsonfile/service'
import { headers } from 'next/headers'

const GoldRateDetailClient = dynamic(() => import('@/app/client/component/Pages/GoldRateClient/GoldRateDetailClient'), {
  ssr: false
})

async function getData(slug, ref) {
  try {

  const lang_id = 1

  const blog_url_slug = slug?.['gold-rate-details']
  const goldRateSlug = 'gold-rate'

  const req3 = {
    lang_id: lang_id
  }
  const newsDetailsReq = {
    blog_url_slug: blog_url_slug
  }
  const newsListReq = {
    blog_url_slug: goldRateSlug,
    identifier: 'subcategory',
    offset: 0,
    limit: 10
  }
  const response1 = await Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req3)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        console.log('error while fetching data', error)
      })

    const newsListData = await Axios.post(BASE_URL + BLOG.newsList, newsListReq)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        console.log('Error while fetching news list data', error)
      })

    const newsDetailsData = await Axios.post(BASE_URL + BLOG?.blogPostDetail, newsDetailsReq)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        console.log('error while fetching data', error)
      })

    return {
        businessCategorydata: response1 || null,
        newsDetailsData: newsDetailsData || null,
        newsListData: newsListData || null,
        referer: ref,
        blogUrl: blog_url_slug,
        businessmetaheadtag: newsDetailsData?.data || null
    }

  } catch (error) {
    return {
      notFound: false
    };
  }
}


export default async function Page({ params }) {
  const reqHeaders = headers();
  const ref = reqHeaders.get('referer') || '';
  const { businessCategorydata, businessmetaheadtag , newsListData,  newsDetailsData, blogUrl } = await getData(params, ref);

  return (
    <>

    <GoldRateDetailClient 
      businessCategorydata={businessCategorydata} 
      businessmetaheadtag={businessmetaheadtag}
      newsListData={newsListData} 
      newsDetailsData={newsDetailsData} 
      blogUrl={params?.['gold-rate-details']}
        />
    </>
  )
}

