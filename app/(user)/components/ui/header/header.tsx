import BurgerMenu from "./burgerMenu"
import Logo from "./Logo";

interface HeaderProps {
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

export default function Header (props: HeaderProps) {
    return (
        <header className="fixed top-auto md:top-[20px] bottom-[20px] md:bottom-auto right-0 z-50 bg-transparent">
            <div className="flex items-center space-x-4 mr-2">
                <Logo title={props.title}/>
                <BurgerMenu type="burgerMenu" title="Burger menu" items={props.menuItems} icon="Bars3Icon"/>
                <BurgerMenu type="languageMenu" title="Language menu" items={props.langItems} icon="LanguageIcon"/>
            </div>
        </header>
    )
}
