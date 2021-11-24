import Link from "next/link";
// import { client } from "../../../libs/client";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import Footer from "../../../components/Footer";
import { Pagination } from "../../../components/Pagination";

export default function Disco({ disco, category }) {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const handleClick = (value) => {
    location.href = location.protocol + "//" + location.host + "/" + value;
  };
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
            <div className="c--disco">
              <div className="c--disco__header">
                <ul className="c--category c--category--disco is-pc">
                  <li className="c--category__item">
                    <Link href="/disco/">
                      <a className="c--category__text">ALL</a>
                    </Link>
                  </li>
                  {category.map((category, index) => (
                    <li className="c--category__item" key={index}>
                      <Link href={`/disco/category/${category.category_slug}`}>
                        <a className="c--category__text">{category.name}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="c--sp-selectbox is-sp">
                  <div className="c--sp-selectbox__head">カテゴリ</div>
                  <div className="c--sp-selectbox__body">
                    <select
                      id="select_category_area"
                      onChange={(e) => handleClick(e.target.value)}
                      className="c--sp-selectbox__select"
                    >
                      <option
                        className="c--sp-selectbox__select-item"
                        value="/disco/"
                      ></option>
                      <option
                        className="c--sp-selectbox__select-item"
                        value="/disco/"
                      >
                        ALL
                      </option>
                      {category.map((category, index) => (
                        <option
                          className="c--sp-selectbox__select-item"
                          value={`/disco/category/${category.category_slug}/`}
                          key={index}
                        >
                          {/* SINGLE */}
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <label
                      htmlFor="select_category_area"
                      className="c--sp-selectbox__label"
                    >
                      ALL
                    </label>
                  </div>
                </div>
              </div>
              <div className="c--disco__inner">
                <ul className="c--disco__list">
                  <p className="c--disco_list__none">
                    現在、商品情報はありません
                  </p>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  // const data = await client.get({
  //   endpoint: "disco",
  //   queries: { limit: 1000 },
  // });

  const key = {
    headers: { "X-MICROCMS-API-KEY": process.env.API_KEY },
  };
  const dataDisco = await fetch(
    "https://artist-nextjs-test01.microcms.io/api/v1/disco?filters=category[equals]4ra96aejn--m",
    key
  )
    .then((res) => res.json())
    .catch(() => null);

  const dataCategory = await fetch(
    "https://artist-nextjs-test01.microcms.io/api/v1/category-disco",
    key
  )
    .then((res) => res.json())
    .catch(() => null);

  return {
    props: {
      disco: dataDisco.contents,
      category: dataCategory.contents,
    },
  };
};
