import React, { useState } from "react";

import Link from "next/link";
// import { client } from "../../../libs/client";

import Footer from "../../../components/Footer";
import { Pagination } from "../../../components/Pagination";

export default function Media({ media, category }) {
  const [isActive, setIsActive] = useState("0");

  const handleAccordion = (index) => {
    if (isActive === index) {
      return setIsActive("0");
    }
    setIsActive(index);
  };

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
            <h1 className="l--page__section__title">MEDIA</h1>
          </div>
          <div className="l--page__section__body">
            <div className="c--media">
              <div className="c--media__header">
                <ul className="c--category c--category--media is-pc">
                  <li className="c--category__item">
                    <Link href="/media/">
                      <a className="c--category__text">最新情報</a>
                    </Link>
                  </li>
                  {category.map((category, index) => (
                    <li className="c--category__item" key={index}>
                      <Link href={`/media/category/${category.category_slug}`}>
                        <a className="c--category__text">{category.name}</a>
                      </Link>
                    </li>
                  ))}
                  <li className="c--category__item">
                    <Link href="/media/">
                      <a className="c--category__text">年月別</a>
                    </Link>
                  </li>
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
                        value="/media/"
                      ></option>
                      <option
                        className="c--sp-selectbox__select-item"
                        value="/media/"
                      >
                        ALL
                      </option>
                      {category.map((category, index) => (
                        <option
                          className="c--sp-selectbox__select-item"
                          value={`/media/category/${category.category_slug}/`}
                          key={index}
                        >
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
              <ul className="c--media_list">
                {media.map((media, index) => (
                  <li key={index} className="c--media_list__item">
                    <article className="c--media_detail">
                      <div className="c--media_detail__header">
                        <div
                          className={
                            isActive === index
                              ? "c--media_detail__header--inner is-active"
                              : "c--media_detail__header--inner"
                          }
                          onClick={() => handleAccordion(index)}
                        >
                          <div className="c--media_detail__category">
                            {media.category.name}
                          </div>
                          <h3 className="c--media_detail__title">
                            {media.title}
                          </h3>
                          <div className="c--media_detail__date">
                            {media.onair_date}
                          </div>
                        </div>
                      </div>
                      <div
                        className={
                          isActive === index
                            ? "c--media_detail__inner is-active"
                            : "c--media_detail__inner"
                        }
                      >
                        <div className="c--media_detail__contents">
                          <div
                            className="p-media_detail__text"
                            dangerouslySetInnerHTML={{
                              __html: `${media.body}`,
                            }}
                          />
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
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
  //   endpoint: "media",
  //   queries: { limit: 1000 },
  // });

  const key = {
    headers: { "X-MICROCMS-API-KEY": process.env.API_KEY },
  };

  const dataMedia = await fetch(
    "https://artist-nextjs-test01.microcms.io/api/v1/media?filters=category[equals]r-n05uuk-m",
    key
  )
    .then((res) => res.json())
    .catch(() => null);

  const dataCategory = await fetch(
    "https://artist-nextjs-test01.microcms.io/api/v1/category",
    key
  )
    .then((res) => res.json())
    .catch(() => null);

  return {
    props: {
      media: dataMedia.contents,
      category: dataCategory.contents,
    },
  };
};
