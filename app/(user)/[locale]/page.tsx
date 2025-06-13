import { Suspense } from "react";
import { sanityFetch } from "@/sanity/lib/fetch";
import { homepageQuery } from "@/sanity/lib/queries";
import DocumentContent from "../components/ui/documentContent";

type Props = {
  params: Promise<{ slug: string, locale: string }>;
};

export default async function Page({ params }: Props) {
  const [homepageInfo] = await Promise.all([
    sanityFetch({ query: homepageQuery, params })
  ]);
  const homepageParams = { 
    slug: homepageInfo?.slug as string, 
    locale: (await params).locale 
  }
  return(
    <Suspense>
      {homepageParams ? <DocumentContent params={homepageParams}/> : <></>}
    </Suspense>
  )
}
