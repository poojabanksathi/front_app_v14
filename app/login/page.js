

import React from 'react'
import dynamic from 'next/dynamic'
import { BASE_URL, BUSINESSCATEGORY, COMMON } from '@/utils/alljsonfile/service'
import { headers } from 'next/headers';



const LoginClient = dynamic(() => import('@/app/client/component/Pages/LoginClient/LoginClient'), {
  ssr: false
})



async function fetchData(ref) {
      const lang_id = 1;
      let h = null;
      let page_url_slug = 'login';
      if (typeof window!== 'undefined') {
        h = window.location.href || null;
        page_url_slug = window.location.pathname.split('/').pop() || 'login';
      }


      const req2 = {
        lang_id: lang_id,
      };
      const metaReq = {
        lang_id: lang_id,
        page_url_slug: page_url_slug,
      };

      try {
        const [data2, metaResponse] = await Promise.all([
          fetch(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req2),
            cache: 'force-cache'
          }).then(res => res.json()).catch((error) => {
            return { data: 'notFound' }
          }),

          fetch(BASE_URL + COMMON.metaDetailPage, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(metaReq),
            cache: 'force-cache'
          }).then(res => res.json()).catch((error) => {
            return { data: null }
          })

        ]);

        return {
          businessCategorydata: data2,
          lastPageVisited: ref,
          referer: ref,
          h: h,
          businessmetaheadtag: metaResponse?.data || null
        };
      } catch (error) {
        return {

            notFound: false
          }
        }
      }


export default function Page() {
  const reqHeaders = headers();
  const ref = reqHeaders.get('referer') || '';
  const { data } = fetchData(ref)


  return (
    <>
   
        <LoginClient lastPageVisited={data?.lastPageVisited} />

    </>
  )
}

