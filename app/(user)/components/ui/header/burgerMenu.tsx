"use client"

import { Bars3Icon, LanguageIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

interface BurgerMenuProps {
    title: string;
    items: Array<{
        title: string | null;
        slug: string | null;
    }> | null;
    icon: "Bars3Icon" | 'LanguageIcon';
}

export default function BurgerMenu(props: BurgerMenuProps) {
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
                                {props.items?.map((el) => (
                                    <MenuItem key={`navItem-${el?.slug}`}>
                                        <a
                                            href={el?.slug ?? ""}
                                            className="block px-4 py-2 text-xl font-bold transition-colors duration-200 rounded-full my-4 bg-primaryTextColor text-primary hover:bg-primary hover:text-primaryTextColor"
                                        >
                                            {el?.title}
                                        </a>
                                    </MenuItem>
                                ))}
                            </div>
                        </MenuItems>
                    </>
                )
            }}
        </Menu>
    );
}
