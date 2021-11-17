import Link from "next/link";

import { client } from "../../libs/client";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import Footer from "../../components/Footer";

export default function InfoId({ info }) {
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
            <div className="c--news">
              <div className="c--news__container">
                <div className="c--news__inner">
                  <section className="c--single">
                    <div className="c--single__header">
                      <div className="c--single__date">
                        {dayjs
                          .utc(info.publishedAt)
                          .tz("Asia/Tokyo")
                          .format("YYYY.MM.DD")}
                      </div>
                      <h3 className="c--single__title">{info.title}</h3>
                    </div>
                    <div className="c--single__inner">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: `${info.body}`,
                        }}
                        className="c--single__link"
                      />
                    </div>
                  </section>
                </div>
                <div className="c--news__footer">
                  <div className="c--pager">
                    <div className="c--pager__btn">
                      <Link href="/info/page/1">
                        <a className="c--pager__btn-link">
                          <div className="c--pager__menu">
                            <span className="c--pager__menu-bar"></span>
                            <span className="c--pager__menu-bar"></span>
                            <span className="c--pager__menu-bar"></span>
                          </div>
                        </a>
                      </Link>
                    </div>
                    {/* <div class="c-pager__nav c-pager__nav--next">
                      <a
                        href="/info/?info_type=single&amp;info_id=535113&amp;info_page=1&amp;info_now=1"
                        class="c-pager__nav-text"
                      ></a>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "info" });

  const paths = data.contents.map((content) => `/info/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "info", contentId: id });

  return {
    props: {
      info: data,
    },
  };
};
