"use client"

import { Bars3Icon, LanguageIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import Link from "next/link";
import { useRouter, usePathname } from 'next/navigation'

interface BurgerMenuProps {
    type: "burgerMenu" | "languageMenu";
    homepageSlug: string;
    title: string;
    items: Array<{
        title: string | null;
        slug: string;
    }> | null;
    icon: "Bars3Icon" | 'LanguageIcon';
}

export default function BurgerMenu(props: BurgerMenuProps) {
    const router = useRouter()
    const pathname = usePathname()

    console.log("pathname")
    return (
        <Menu as="nav" className="relative">
            {({ open }) => {
                if (open) {
                    document.documentElement.style.overflow = 'auto';
                    document.documentElement.style.paddingRight = '0';
                }
                return (
                    <>
                        <MenuButton className="inline-flex items-center justify-center p-2 rounded-full bg-primaryTextColor hover:bg-gray-800 focus:outline-none">
                            {open ? (
                                <XMarkIcon className="h-6 w-6 text-primary" />
                            ) : (
                                props.icon === "Bars3Icon" ? <Bars3Icon className="h-6 w-6 text-primary" /> : <LanguageIcon className="h-6 w-6 text-primary" />
                            )}
                        </MenuButton>

                        <MenuItems className="fixed right-2 top-auto md:top-16 bottom-[60px] md:bottom-auto origin-top-right focus:outline-none z-50">
                            <div className="py-1 max-h-[80vh] overflow-y-auto">

                                {props.items?.map((el) => {
                                    if (!el?.slug) return null

                                    const pathSegments = pathname.split('/')
                                    const isCurrentLocale = pathSegments[1] === el.slug;
                                    const isCurrentPage = pathSegments[2] === el?.slug;
                                    const isHomepage = pathSegments[2] === undefined && el?.slug === props.homepageSlug;

                                    console.log("pathSegments[2]", pathSegments[2])
                                    const handleClick = () => {
                                        if (props.icon === "LanguageIcon") {
                                        const segments = pathname.split('/')
                                        segments[1] = el.slug // replace locale
                                        const newPath = segments.join('/') || '/'
                                        router.push(newPath)
                                        }
                                    }
                                    return (
                                        <MenuItem key={`navItem-${el?.slug}`}>
                                            { props.type === "languageMenu" ? (
                                                <button
                                                onClick={handleClick}
                                                className={`${ isCurrentLocale ? "underline" : "" } block px-4 py-2 text-xl font-bold transition-colors duration-200 rounded-full my-4 bg-primaryTextColor text-primary hover:bg-primary hover:text-primaryTextColor`}
                                                >
                                                {el.title}
                                                </button>
                                            ) : (
                                                <Link href={isHomepage ? "/" : el.slug}>
                                                    <div className={`${ isCurrentPage || isHomepage ? "underline" : "" } block px-4 py-2 text-xl font-bold transition-colors duration-200 rounded-full my-4 bg-primaryTextColor text-primary hover:bg-primary hover:text-primaryTextColor`}>
                                                        {el.title}
                                                    </div>
                                                </Link>
                                            )}
                                        </MenuItem>
                                    )
                                })}

                            </div>
                        </MenuItems>
                    </>
                )
            }}
        </Menu>
    );
}
