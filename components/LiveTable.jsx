import React, { useState } from "react";

export default function LiveTable({
  index,
  site,
  date,
  area,
  time,
  price,
  contact,
  url,
  other,
}) {
  const [isActive, setIsActive] = useState("0");

  const handleAccordion = (index) => {
    if (isActive === index) {
      return setIsActive("0");
    }
    setIsActive(index);
  };
  return (
    <li className="c--live_detail__item" key={index}>
      <div className="c--live_info">
        <div
          className="c--live_info__header"
          onClick={() => handleAccordion(index)}
        >
          <h4 className="c--live_info__title">
            {date}
            <span className="c--inline-block">{site}</span>
          </h4>
        </div>
        <div
          className={
            isActive === index
              ? "c--live_info__inner is-active"
              : "c--live_info__inner"
          }
        >
          <ul className="c--live_info__list">
            {date != undefined ? (
              <li className="c--live_info__item">
                <dl className="c--live_info_data">
                  <dt className="c--live_info_data__title">公演日</dt>
                  <dd className="c--live_info_data__text">{date}</dd>
                </dl>
              </li>
            ) : (
              ""
            )}
            {area != undefined ? (
              <li className="c--live_info__item">
                <dl className="c--live_info_data">
                  <dt className="c--live_info_data__title">地域</dt>
                  <dd className="c--live_info_data__text">{area}</dd>
                </dl>
              </li>
            ) : (
              ""
            )}
            {site != undefined ? (
              <li className="c--live_info__item">
                <dl className="c--live_info_data">
                  <dt className="c--live_info_data__title">会場</dt>
                  <dd className="c--live_info_data__text">{site}</dd>
                </dl>
              </li>
            ) : (
              ""
            )}
            {time != undefined ? (
              <li className="c--live_info__item">
                <dl className="c--live_info_data">
                  <dt className="c--live_info_data__title">開場 / 開演</dt>
                  <dd className="c--live_info_data__text">{time}</dd>
                </dl>
              </li>
            ) : (
              ""
            )}
            {price != undefined ? (
              <li className="c--live_info__item">
                <dl className="c--live_info_data">
                  <dt className="c--live_info_data__title">料金（税込）</dt>
                  <dd className="c--live_info_data__text">{price}</dd>
                </dl>
              </li>
            ) : (
              ""
            )}
            {contact != undefined ? (
              <li className="c--live_info__item">
                <dl className="c--live_info_data">
                  <dt className="c--live_info_data__title">問い合わせ先</dt>
                  <dd
                    className="c--live_info_data__text"
                    dangerouslySetInnerHTML={{
                      __html: `${contact}`,
                    }}
                  />
                </dl>
              </li>
            ) : (
              ""
            )}
            {url != undefined ? (
              <li className="c--live_info__item">
                <dl className="c--live_info_data">
                  <dt className="c--live_info_data__title">問合せURL</dt>
                  <dd className="c--live_info_data__text">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="c--live_info_data__text-link"
                    >
                      {url}
                    </a>
                  </dd>
                </dl>
              </li>
            ) : (
              ""
            )}
            {other != undefined ? (
              <li className="c--live_info__item">
                <dl className="c--live_info_data c--live_info_data--note">
                  <dt className="c--live_info_data__title">備考</dt>
                  <dd
                    className="c--live_info_data__text"
                    dangerouslySetInnerHTML={{
                      __html: `${other}`,
                    }}
                  />
                </dl>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </li>
  );
}
