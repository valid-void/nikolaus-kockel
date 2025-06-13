import { PortableTextBlock } from "next-sanity";
import PageTitle from "./header/pageTitle";
import { notFound } from "next/navigation";
import PortableText from "../../components/portable-text";
import { sanityFetch } from "@/sanity/lib/fetch";
import { contentQuery } from "@/sanity/lib/queries";

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
};

export default async function DocumentContent({ params }: Props) {
  const [content] = await Promise.all([
    sanityFetch({ query: contentQuery, params })
  ]);

  const bgColor = content?.colors?.bgColor?.color?.hex ?? 'var(--primary-color)';
  const textColor = content?.colors?.textColor?.color?.hex ?? 'var(--primary-text)';

  if (!content?._id) {
    return notFound();
  }

  return (
    <div>
      <PageTitle title={content.title}/>
        <div style={{ backgroundColor: bgColor, color: textColor } as React.CSSProperties} className="min-h-screen pb-[300px]">
          {content.main?.length && (
            <PortableText
              value={content.main as PortableTextBlock[]}
              params={params}
            />
          )}
      </div>
    </div>
  );
}
