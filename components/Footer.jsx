import Image from "next/image";

export default function Footer() {
  return (
    <footer className="c--footer">
      <div className="c--footer__main">
        <p className="c--footer__copy">©SME Records</p>
      </div>
      <div className="c--footer__pagetop js-pagetop">
        <Image
          src="/img/icon/page_down.png"
          alt="SME Records"
          width={27}
          height={42}
        />
      </div>
    </footer>
  );
}
