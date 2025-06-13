"use client"

import Link from "next/link";

interface FooterProps {
    links:  Array<{
      title: string;
      link: string;
    }>;
}



export default function Footer(props: FooterProps) {
  return (
    <footer className="w-full z-40">
      <div className="bg-primaryTextColor m-10 mb-0  rounded-3xl">

        <div className="w-full   p-10 gap-10 text-center grid lg:grid-cols-3 text-primaryTextColor">
          {props?.links?.map((button, index) => (
            <FooterLink href={button.link} title={button.title} key={index}/>
          ))}
        </div>
      </div>
      <div>
        <div className=" grid grid-cols-1 sm:flex justify-between m-10 mt-0  px-4 bg-primary text-primaryTextColor">
          <div className="w-auto md:col-start-1 text-center">
          </div>
          {/* <div className="space-x-0 text-center sm:space-x-4 aligne-middle py-2">
            <a href={`/${lang}/${links?.imprint?.slug}`}>{links?.imprint?.title}</a>
            <br className="inline sm:hidden" />
            <a href={`/${lang}/${links?.privacy?.slug}`}>{links?.privacy?.title}</a>
          </div> */}
        </div>

      </div>
    </footer>
  )
}




// export default function Footer(props: FooterProps) {
//   return (
//     <div className="relative h-[300px]"> {/* adjust height to match footer */}
//       <footer className="absolute bottom-0 left-0 right-0 z-40 pointer-events-auto">
//         <div className="bg-primaryTextColor mx-10 rounded-3xl">
//           <div className="w-full p-10 gap-10 text-center grid lg:grid-cols-3 text-primaryTextColor">
//             {props?.links?.map((button, index) => (
//               <FooterLink href={button.link} title={button.title} key={index} />
//             ))}
//           </div>
//         </div>
//         <div>
//           <div className="grid grid-cols-1 sm:flex justify-between m-10 mt-0 px-4 bg-primary text-primaryTextColor">
//             <div className="w-auto md:col-start-1 text-center">
//               {/* Optional content */}
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }



const FooterLink = ({ href, title }: { href: string, title: string }) => {
  return (

    <Link href={href}>
        <div className="bg-primary rounded-full font-bold">
            {title}
        </div>
    </Link>
    // <a href={href} className="bg-primary rounded-full font-bold ">{title}</a>
  )
}