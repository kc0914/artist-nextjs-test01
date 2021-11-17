import Link from "next/link";
import { client } from "../libs/client";

import Footer from "../components/Footer";
import { Pagination } from "../components/Pagination";

export default function Disco({ disco }) {
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
            <h1 className="l--page__section__title">DISCOGRAPHY</h1>
          </div>
          <div className="l--page__section__body">
            <ul className="c--archive">
              {disco.map((disco) => (
                <li key={disco.id} className="c--archive__item">
                  <article className="c--article">
                    <Link href={`/disco/${disco.id}`}>
                      <a className="c--article__link">
                        <div className="c--article__date">
                          <p>{disco.category}</p>
                          <p className="c--article__date">
                            {disco.release_date}
                          </p>
                          <h3 className="c--article__title">
                            {disco.product_title}
                          </h3>
                        </div>
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
  const data = await client.get({ endpoint: "disco" });

  return {
    props: {
      disco: data.contents,
    },
  };
};
