"use client"

export default function Footer() {
  const footerButton = [
    { title: "instagram", link: "https://www.instagram.com/lobloblobster1/" },
    { title: "newsletter", link: `/newsletter` },
    { title: "mail", link: "mailto:nikolaus.kockel@gmx.de" }
  ]

  return (
    <footer >
      <div className="bg-primaryTextColor m-10 mb-0  rounded-3xl">

        <div className="w-full   p-10 gap-10 text-center grid lg:grid-cols-3 text-primaryTextColor">
          {footerButton.map((button, index) => (
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

const FooterLink = ({ href, title }: { href: string, title: string }) => {
  return (
    <a href={href} className="bg-primary rounded-full font-bold ">{title}</a>
  )
}