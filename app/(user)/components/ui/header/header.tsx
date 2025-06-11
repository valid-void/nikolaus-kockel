import BurgerMenu from "./burgerMenu"
import Logo from "./Logo";

interface HeaderProps {
    menuItems: Array<{
        title: string | null;
        slug: string | null;
    }> | null,
    langItems: Array<{
        title: string | null;
        slug: string | null;
    }> | null,
}
export default function Header (props: HeaderProps) {
    return (
        <header className="fixed top-auto md:top-[20px] bottom-[20px] md:bottom-auto right-0 z-50 bg-transparent">
            <div className="flex items-center space-x-4 mr-2">
                <Logo/>
                <BurgerMenu title="Burger menu" items={props.menuItems} icon="Bars3Icon"/>
                <BurgerMenu title="Language menu" items={props.langItems} icon="LanguageIcon"/>
            </div>
        </header>
    )
}

// export default Header