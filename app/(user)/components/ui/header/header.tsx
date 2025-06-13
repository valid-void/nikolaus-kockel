import { sanityFetch } from "@/sanity/lib/fetch";
import BurgerMenu from "./burgerMenu"
import Logo from "./Logo";
import { homepageQuery } from "@/sanity/lib/queries";

interface HeaderProps {
    locale: string;
    title: string;
    menuItems: Array<{
        title: string;
        slug: string;
    }>,
    langItems: Array<{
        title: string;
        slug: string;
    }>,
}

export default async function Header (props: HeaderProps) {
    const params = { locale: props.locale }
      const [homepageInfo] = await Promise.all([
        sanityFetch({ query: homepageQuery, params })
      ]);
      const homepageSlug = homepageInfo?.slug ?? "";
    return (
        <header className="fixed top-auto md:top-[20px] bottom-[20px] md:bottom-auto right-0 z-50 bg-transparent">
            <div className="flex items-center space-x-4 mr-2">
                <Logo title={props.title}/>
                <BurgerMenu type="burgerMenu" homepageSlug={homepageSlug} title="Burger menu" items={props.menuItems} icon="Bars3Icon"/>
                <BurgerMenu type="languageMenu" homepageSlug={homepageSlug} title="Language menu" items={props.langItems} icon="LanguageIcon"/>
            </div>
        </header>
    )
}
