import "../../globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, ResolvingMetadata } from "next";
import {
  VisualEditing,
  toPlainText,
} from "next-sanity";
import { draftMode } from "next/headers";

import AlertBanner from "../components/alert-banner";

import { sanityFetch } from "@/sanity/lib/fetch";
import { websiteInfoQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import Header from "../components/ui/header/header";
import { primaryFont, secondaryFont } from '../fonts/fonts'
import Footer from "../components/ui/footer/footer";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
    parent: ResolvingMetadata,
): Promise<Metadata> {
  const settings = await sanityFetch({
    query: websiteInfoQuery, params,
    // Metadata should never contain stega
    stega: false,
  });
  const title = settings?.title ?? "Title undefined";
  const description = settings?.description;

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: URL | undefined = undefined;
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined;
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: description ? toPlainText(description) : "Description undefined",
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}


export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode,
  params: { locale: string }
}) {
  const { isEnabled: isDraftMode } = await draftMode();

  const { locale } = await params;
  const data = await sanityFetch({ query: websiteInfoQuery, params });
  const bgColor = data?.colors?.bgColor?.color?.hex ?? '#fff';
  const textColor = data?.colors?.textColor?.color?.hex ?? '#000';

  const title = data?.title ?? "Title undefined";
  const headerProps = {
    menuItems: data?.menu?.map((menuItem: any) => (
      { slug: menuItem.slug ?? '', title: menuItem.title ?? 'undefined' }
    )) ?? [{ slug: '', title: 'undefined' }],
    langItems: [
      { slug: 'de', title: 'DE' },
      { slug: 'en', title: 'EN' }
    ],
  }
  const footerProps: Array<{
      title: string;
      link: string;
    }> = [];
  data?.footer?.forEach((element: any) => {
    footerProps.push({
      title: element?.title ?? "undefined",
      link: element?.link ?? ""
    })
  });

  

  return (
    <html 
    lang={locale} 
    style={{ 
      "--primary-color": bgColor,
      "--primary-text": textColor
    }as React.CSSProperties} 
    className={`${primaryFont.variable} ${secondaryFont.variable} font-primary bg-primary text-primaryTextColor`}
    >
      <body >
        <section className="min-h-screen">
          {isDraftMode && <AlertBanner />}
          <Header locale={locale} title={title} menuItems={headerProps.menuItems} langItems={headerProps.langItems}/>
          <main>{children}</main>
          <Footer links={footerProps} />
        </section>
        {isDraftMode && <VisualEditing />}
        <SpeedInsights />
      </body>
    </html>
  );
}
