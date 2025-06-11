"use client"

import Link from "next/link"
import { useEffect, useState } from "react";

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState("up");

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (direction !== scrollDirection && (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5)) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    }
  }, [scrollDirection]);

  return scrollDirection;
};

interface LogoProps {
    title: string;
}

export default function Logo (props: LogoProps) {
        const scrollDirection = useScrollDirection();

    return (
        <div className={
            "fixed flex bg-primary shadow-[0_0px_10px_rgba(0,0,0,0.25)] md:left-auto right-0 h-[60px] ml-2 p-auto align-middle md:whitespace-nowrap text-3xl/[1] md:text-5xl/[1.6] font-bold transition-all rounded-l-[50px] px-4 "
            + (scrollDirection === "down" ? "w-0 pr-0 pl-[110px] text-transparent" : " md:w-auto pr-[110px]")
            }>
              <Link href="/" className="m-auto">
                {props.title}
              </Link>
        </div>
    )
}