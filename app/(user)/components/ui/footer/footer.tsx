// "use client"

import { sanityFetch } from "@/sanity/lib/fetch";
import { getTitleBySlugs } from "@/sanity/lib/queries";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface FooterProps {
  locale: string,
  links:  Array<{
    title: string;
    link: string;
  }>;
}



export default async function Footer(props: FooterProps) {
  const [imprint, privacy] = await Promise.all([
    sanityFetch({ query: getTitleBySlugs, params: { locale: props.locale, slug: "imprint"}  }),
    sanityFetch({ query: getTitleBySlugs, params: { locale: props.locale, slug: "privacy"} }),
  ]);
  return (
    <footer className="w-full z-40 bg-primaryTextColor text-primary">
        <ul className="list-none py-10 max-w-5xl m-auto">
          {props?.links?.map((button, index) => (
            <FooterLink href={button.link} title={button.title} key={index}/>
          ))}
        </ul>
        <div className="space-x-0 text-center sm:space-x-4 aligne-middle py-2">
            <Link href={`imprint`}>{imprint[0].title}</Link>
            <br className="inline sm:hidden" />
            <Link href={`privacy`}>{privacy[0].title}</Link>
        </div>
    </footer>
  )
}

const FooterLink = ({ href, title }: { href: string, title: string }) => {
  return (
    <li>
      <Link href={href} className="font-bold flex m-auto">
          <ArrowRightCircleIcon className="h-5 w-5 mr-4" /> {title}
      </Link>
    </li>
  )
}