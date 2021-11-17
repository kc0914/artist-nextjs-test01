import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  // const [scrollY, setScrollY] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // const handleHeader = () => {
  //   // console.log(header);
  //   if (scrollY > 0) {
  //     setIsActive(!isActive);
  //     console.log(isActive);
  //   }
  // };
  return (
    <header className={isActive ? "active" : ""}>
      <div className="container --xl c--header__inner">
        <div className="c--header__logo">
          <Link href="/">
            <a>
              <Image
                src="/img/logo.svg"
                alt="ADACHI KANA OFFICIAL"
                width={400}
                height={80}
              />
            </a>
          </Link>
        </div>
        <nav className="c--header__nav">
          <ul>
            <li className="c--header__nav__item">
              <Link href="/info/page/1">
                <a>INFORMATION</a>
              </Link>
            </li>
            <li className="c--header__nav__item">
              <Link href="/media">
                <a>MEDIA</a>
              </Link>
            </li>
            <li className="c--header__nav__item">
              <Link href="/bio">
                <a>BIOGRAPHY</a>
              </Link>
            </li>
            <li className="c--header__nav__item">
              <Link href="/disco">
                <a>DISCOGRAPHY</a>
              </Link>
            </li>
            <li className="c--header__nav__item">
              <Link href="/live">
                <a>LIVE</a>
              </Link>
            </li>
            <li className="c--header__nav__item">
              <Link href="https://www.rocket-exp.com/s/R/artist/206457/item?ima=0543&rw=40">
                <a>GOODS</a>
              </Link>
            </li>
            <li className="c--header__nav__item">
              <Link href="https://fc.adachikana.com/s/n56/?ima=4626">
                <a>FANCLUB</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
