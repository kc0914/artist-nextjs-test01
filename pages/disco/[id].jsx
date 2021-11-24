import Image from "next/image";

import { client } from "../../libs/client";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import Footer from "../../components/Footer";

export default function InfoId({ disco }) {
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
            <h1 className="l--page__section__title">DISCOGRAPHY</h1>
          </div>
          <div className="l--page__section__body">
            <article className="c--disco_in">
              <div className="c--disco_in__inner">
                <section className="c--disco_detail">
                  <div className="c--disco_detail__header">
                    {/* タイトル */}
                    <div className="c--disco_detail__title">
                      <p className="c--disco_detail__title-category">
                        {disco.category.name}
                      </p>
                      <h3 className="c--disco_detail__title-main">
                        {disco.product_title}
                      </h3>
                    </div>
                    {/* 画像 */}
                    <div className="p-disco_detail__img">
                      <div className="p-disco_detail__thumb">
                        <img src={disco.jacket_img.url} alt="ジャケット写真" />
                      </div>
                    </div>
                    {/* 説明 */}
                    <div className="c--disco_detail__data">
                      <div className="c--disco_detail__info">
                        <div className="c--disco_detail__date">
                          <p className="c--disco_detail__date-release">
                            {dayjs
                              .utc(disco.release_date)
                              .tz("Asia/Tokyo")
                              .format("YYYY.MM.DD")}
                          </p>
                        </div>
                        {typeof disco.price == "undefined" ? (
                          ""
                        ) : (
                          <p className="c--disco_detail__info-type">
                            ¥{disco.price.toLocaleString()}（税込）
                            {disco.product_number}
                          </p>
                        )}
                        {typeof disco.description == "undefined" ? (
                          ""
                        ) : (
                          <div
                            className="c--disco_detail__info-description"
                            dangerouslySetInnerHTML={{
                              __html: `${disco.description}`,
                            }}
                          ></div>
                        )}
                      </div>
                      <div className="c--disco_detail__buy">
                        <div className="c--disco_detail__buy-btn">
                          <span className="c--disco_detail__buy-text">
                            購入・ダウンロード
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 詳細 */}
                  <div className="c--disco_detail__inner">
                    <ul className="c--disco_detail_list">
                      {/* DISC */}
                      {disco.disc.map((disc, index) => {
                        return (
                          <li
                            className="c--disco_detail_list__item"
                            key={index}
                          >
                            <div className="c--disco_detail_area">
                              <div className="c--disco_detail_area__header">
                                <h4 className="c--disco_detail_area__title">
                                  {disc.disc_number}
                                </h4>
                              </div>
                              <div className="c--disco_detail_area__inner">
                                <ul className="c--disco_track_list">
                                  {disc.song_list.map((song, index) => {
                                    return (
                                      <li
                                        className="c--disco_track_list__item"
                                        key={index}
                                      >
                                        <div className="c--disco_track">
                                          <div className="c--disco_track__header">
                                            <p className="c--disco_track__no">
                                              {("00" + (index + 1)).slice(-2)}
                                            </p>
                                          </div>
                                          <div className="c--disco_track__inner">
                                            <p className="c--disco_track__title">
                                              {song.song_title}
                                            </p>
                                          </div>
                                        </div>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                      {/* 詳細 */}
                      <li className="c--disco_detail_list__item">
                        <div className="c--disco_detail_area">
                          <div className="c--disco_detail_area__header">
                            <h4 className="c--disco_detail_area__title">
                              詳細
                            </h4>
                          </div>
                          <div className="c--disco_detail_area__inner">
                            <div
                              className="c--disco_detail_area__description"
                              dangerouslySetInnerHTML={{
                                __html: `${disco.detail}`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </li>
                    </ul>
                    {/* マーク */}
                    <div className="c--disco_detail__mark">
                      <div className="c--disco_detail__mark-img">
                        <Image
                          src="/img/bn_lmark.jpg"
                          alt="RIAJ00001004"
                          width={190}
                          height={50}
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </article>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({
    endpoint: "disco",
    queries: { limit: 1000 },
  });

  const paths = data.contents.map((content) => `/disco/${content.id}`);
  console.log(data.contents);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "disco", contentId: id });

  return {
    props: {
      disco: data,
    },
  };
};
