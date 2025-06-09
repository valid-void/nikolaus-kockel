import "../../globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import {
  VisualEditing,
  toPlainText,
  type PortableTextBlock,
} from "next-sanity";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";

import AlertBanner from "../components/alert-banner";
import PortableText from "../components/portable-text";

import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { settingsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

const locales = ['de', 'en']

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode,
  params: { locale: string }
}) {
  const { locale } = await params;
  console.log("layout locale", locale)
  if (!locales.includes(locale)) {
    notFound()
  }

  const data = await sanityFetch({ query: settingsQuery });
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang={locale} className={`${inter.variable} bg-white text-black`}>
      <body>
        <section className="min-h-screen">
          {isDraftMode && <AlertBanner />}
          <main>{children}</main>
        </section>
        {isDraftMode && <VisualEditing />}
        <SpeedInsights />
      </body>
    </html>
  );
}
