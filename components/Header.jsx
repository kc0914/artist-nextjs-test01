import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  // const [scrollY, setScrollY] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  const handleNav = () => {
    setIsOpen(!isOpen);
  };

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
        <nav className={isOpen ? "c--header__nav is--open" : "c--header__nav"}>
          <div className="c--nav__bg js-nav-close-item is-sp"></div>
          <ul>
            <li className="c--header__nav__item" onClick={handleNav}>
              <Link href="/info/page/1">
                <a>INFORMATION</a>
              </Link>
            </li>
            <li className="c--header__nav__item" onClick={handleNav}>
              <Link href="/media">
                <a>MEDIA</a>
              </Link>
            </li>
            <li className="c--header__nav__item" onClick={handleNav}>
              <Link href="/bio">
                <a>BIOGRAPHY</a>
              </Link>
            </li>
            <li className="c--header__nav__item" onClick={handleNav}>
              <Link href="/disco">
                <a>DISCOGRAPHY</a>
              </Link>
            </li>
            <li className="c--header__nav__item" onClick={handleNav}>
              <Link href="/live">
                <a>LIVE</a>
              </Link>
            </li>
            <li className="c--header__nav__item" onClick={handleNav}>
              <Link href="https://www.rocket-exp.com/s/R/artist/206457/item?ima=0543&rw=40">
                <a>GOODS</a>
              </Link>
            </li>
            <li className="c--header__nav__item" onClick={handleNav}>
              <Link href="https://fc.adachikana.com/s/n56/?ima=4626">
                <a>FANCLUB</a>
              </Link>
            </li>
          </ul>
        </nav>
        <div
          className={isOpen ? "c--hamburger is--open" : "c--hamburger"}
          id="c-hamburger"
          onClick={handleNav}
        >
          <div className="c--hamburger__inner">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </header>
  );
}
