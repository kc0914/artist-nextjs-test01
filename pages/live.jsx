import Link from "next/link";
import { client } from "../libs/client";

import Footer from "../components/Footer";
import { Pagination } from "../components/Pagination";

export default function Live({ live }) {
  return (
    <>
      <div className="is-page l--page l--container">
        {/* bg */}
        <div className="l--bg">
          <div className="l--bg__in"></div>
        </div>
        {/* bg */}
        <div className="l--page__section">
          <div className="l--page__section__head">
            <h1 className="l--page__section__title">LIVE</h1>
          </div>
          <div className="l--page__section__body">
            <ul className="c--archive">
              {live.map((live) => (
                <li key={live.id} className="c--archive__item">
                  <article className="c--article">
                    <Link href={`/live/${live.id}`}>
                      <a className="c--article__link">
                        <div className="c--article__date">{live.date}</div>
                        <h3 className="c--article__title">{live.live_title}</h3>
                      </a>
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "live" });

  return {
    props: {
      live: data.contents,
    },
  };
};
