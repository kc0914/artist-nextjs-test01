// pages/blog/page/[id].js
import Link from "next/link";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import Footer from "../../../components/Footer";
import { Pagination } from "../../../components/Pagination";

const PER_PAGE = 10;

// pages/blog/[id].js
export default function InfoPageId({ info, totalCount }) {
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
            <Pagination totalCount={totalCount} pageName={"info"} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

// 動的なページを作成
export const getStaticPaths = async () => {
  const key = {
    headers: { "X-MICROCMS-API-KEY": process.env.API_KEY },
  };

  const res = await fetch(
    "https://artist-nextjs-test01.microcms.io/api/v1/info?offset=0&limit=10",
    key
  );

  const repos = await res.json();

  const pageNumbers = [];

  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map(
    (repo) => `/info/page/${repo}`
  );

  return { paths, fallback: false };
};
// データを取得
export const getStaticProps = async (context) => {
  const id = context.params.id;

  const key = {
    headers: { "X-MICROCMS-API-KEY": process.env.API_KEY },
  };

  const data = await fetch(
    `https://artist-nextjs-test01.microcms.io/api/v1/info?offset=${
      (id - 1) * 10
    }&limit=10`,
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
