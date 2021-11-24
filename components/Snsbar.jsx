// import React from "react";
import Image from "next/image";

export default function Snsbar() {
  return (
    <aside className="c--side">
      <div className="c--side__main">
        <ul className="sns__wrap">
          <li className="c--side__item">
            <a
              href="https://twitter.com/kana1014lm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/img/icon/s_twitter.svg"
                alt="ADACHI KANA OFFICIAL"
                width={22}
                height={17}
              />
            </a>
          </li>
          <li className="c--side__item">
            <a
              href="https://www.instagram.com/kana1014lm/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/img/icon/s_insta.svg"
                alt="ADACHI KANA OFFICIAL"
                width={22}
                height={22}
              />
            </a>
          </li>
          <li className="c--side__item">
            <a
              href="https://line.me/R/ti/p/@adachikana?from=page"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/img/icon/s_line.svg"
                alt="ADACHI KANA OFFICIAL"
                width={22}
                height={20}
              />
            </a>
          </li>
          <li className="c--side__item">
            <a
              href="https://www.youtube.com/channel/UChthsNDWnGTCsAJSY-yGSyg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/img/icon/s_youtube.svg"
                alt="ADACHI KANA OFFICIAL"
                width={22}
                height={17}
              />
            </a>
          </li>
          <li className="c--side__item">
            <a
              href="https://adachikana.lnk.to/3rdAL_anatagaite"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="c--side__link-text">SUBSCRIPTION</span>
              <Image
                className="c--side__link-img"
                src="/img/icon/subscription.svg"
                alt="ADACHI KANA OFFICIAL"
                width={17}
                height={17}
              />
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
