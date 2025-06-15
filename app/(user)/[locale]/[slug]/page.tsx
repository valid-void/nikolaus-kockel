import type { Metadata, ResolvingMetadata } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { contentQuery, contentSlugs, homepageQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import DocumentContent from "../../components/ui/documentContent";
import { toPlainText } from "next-sanity";


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
  // const post = await sanityFetch({
  //   query: contentQuery,
  //   params,
  //   stega: false,
  // });

  const [post, homepageInfo] = await Promise.all([
      sanityFetch({ query: contentQuery, params, stega: false }),
      sanityFetch({ query: homepageQuery, params, stega: false }),
    ]);

  
  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = resolveOpenGraphImage(post?.previewImage);
  const author = homepageInfo?.author ?? "Undefined Author";

  return {
    authors: [{ name: author }],
    title: post?.title,
    description: post?.description ? toPlainText(post?.description) : "Description undefined",
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata;
}

export default async function PostPage({ params }: Props) {
  return <DocumentContent params={params} />
}
