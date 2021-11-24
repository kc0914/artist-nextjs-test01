import React, { useState } from "react";

import Link from "next/link";
import { client } from "../libs/client";

import Footer from "../components/Footer";
import LiveTable from "../components/LiveTable";
import { Pagination } from "../components/Pagination";

export default function Live({ live }) {
  const [isActive, setIsActive] = useState("0");

  const handleAccordion = (index) => {
    if (isActive === index) {
      return setIsActive("0");
    }
    setIsActive(index);
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
            <h1 className="l--page__section__title">LIVE</h1>
          </div>
          <div className="l--page__section__body">
            <div className="c--live">
              <ul className="c--live_list">
                {live.map((live, index) => (
                  <li key={index} className="c--live_list__item">
                    <article className="c--live_detail">
                      <div className="c--live_detail__header">
                        <div
                          className={
                            isActive === index
                              ? "c--live_detail__header--inner is-active"
                              : "c--live_detail__header--inner"
                          }
                          onClick={() => handleAccordion(index)}
                        >
                          <h3 className="c--live_detail__title">
                            {live.live_title}
                          </h3>
                          <div className="c--live_detail__date">
                            {live.date}
                          </div>
                        </div>
                      </div>
                      <div
                        className={
                          isActive === index
                            ? "c--live_detail__inner is-active"
                            : "c--live_detail__inner"
                        }
                      >
                        <div className="c--live_detail__contents">
                          <div
                            className="c--live_detail__text"
                            dangerouslySetInnerHTML={{
                              __html: `${live.body}`,
                            }}
                          />
                          <div className="c--live_detail__footer">
                            <ul className="c--live_detail__list">
                              {live.site.map((site, index) => (
                                <LiveTable
                                  key={index}
                                  index={index}
                                  site={site.live_site}
                                  date={site.live_date}
                                  area={site.area}
                                  time={site.start_time}
                                  price={site.price}
                                  contact={site.contact}
                                  url={site.contact_url}
                                  other={site.other}
                                />
                              ))}
                            </ul>
                          </div>
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
  const data = await client.get({ endpoint: "live", queries: { limit: 1000 } });

  return {
    props: {
      live: data.contents,
    },
  };
};
