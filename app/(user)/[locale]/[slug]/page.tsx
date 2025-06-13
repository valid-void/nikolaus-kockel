import { defineQuery } from "next-sanity";
import type { Metadata, ResolvingMetadata } from "next";
import { type PortableTextBlock } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import Avatar from "../../components/avatar";
import CoverImage from "../../components/cover-image";
import DateComponent from "../../components/date";
import MoreStories from "../../components/more-stories";
import PortableText from "../../components/portable-text";

import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { contentQuery, postQuery, contentSlugs, settingsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import PageTitle from "../../components/ui/header/pageTitle";
import DocumentContent from "../../components/ui/documentContent";


type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return await sanityFetch({
    query: contentSlugs,
    perspective: "published",
    stega: false,
  });
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const post = await sanityFetch({
    query: contentQuery,
    params,
    stega: false,
  });
  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = resolveOpenGraphImage(post?.coverImage);

  return {
    authors: post?.author?.name ? [{ name: post?.author?.name }] : [],
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata;
}

export default async function PostPage({ params }: Props) {
  // const [content] = await Promise.all([
  //   sanityFetch({ query: contentQuery, params })
  // ]);

  // const bgColor = content?.colors?.bgColor?.color?.hex ?? 'var(--primary-color)';
  // const textColor = content?.colors?.textColor?.color?.hex ?? 'var(--primary-text)';

  // if (!content?._id) {
  //   return notFound();
  // }

  return (
    <div>
      <DocumentContent params={params} />
      {/* <PageTitle title={content.title}/>
        <div style={{ backgroundColor: bgColor, color: textColor } as React.CSSProperties} className="min-h-screen pb-[300px]">
          {content.main?.length && (
            <PortableText
              value={content.main as PortableTextBlock[]}
              params={params}
            />
          )}
      </div> */}
    </div>
  );
}
