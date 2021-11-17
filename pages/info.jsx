import Link from "next/link";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import Footer from "../components/Footer";
import { Pagination } from "../components/Pagination";

// import { client } from "../libs/client";

export default function Info({ info, totalCount }) {
  dayjs.extend(utc);
  dayjs.extend(timezone);
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
            <h1 className="l--page__section__title">INFOMATION</h1>
          </div>
          <div className="l--page__section__body">
            <ul className="c--archive">
              {info.map((info) => (
                <li key={info.id} className="c--archive__item">
                  <article className="c--article">
                    <Link href={`/info/${info.id}`}>
                      <a className="c--article__link">
                        <div className="c--article__date">
                          {dayjs
                            .utc(info.publishedAt)
                            .tz("Asia/Tokyo")
                            .format("YYYY.MM.DD")}
                        </div>
                        <h3 className="c--article__title">{info.title}</h3>
                      </a>
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
            <Pagination totalCount={totalCount} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  // const data = await client.get({ endpoint: "info" });

  const key = {
    headers: { "X-MICROCMS-API-KEY": process.env.API_KEY },
  };
  const data = await fetch(
    "https://artist-nextjs-test01.microcms.io/api/v1/info?offset=0&limit=10",
    key
  )
    .then((res) => res.json())
    .catch(() => null);

  return {
    props: {
      info: data.contents,
      totalCount: data.totalCount,
    },
  };
};
