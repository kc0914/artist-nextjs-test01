import Link from "next/link";
import { client } from "../libs/client";

import Footer from "../components/Footer";
import { Pagination } from "../components/Pagination";

export default function Media({ media }) {
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
            <h1 className="l--page__section__title">MEDIA</h1>
          </div>
          <div className="l--page__section__body">
            <ul className="c--archive">
              {media.map((media) => (
                <li key={media.id} className="c--archive__item">
                  <article className="c--article">
                    <h2>{media.title}</h2>
                    <p>{media.category}</p>
                    <p>{media.onair_date}</p>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `${media.body}`,
                      }}
                    />
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
  const data = await client.get({ endpoint: "media" });

  return {
    props: {
      media: data.contents,
    },
  };
};
