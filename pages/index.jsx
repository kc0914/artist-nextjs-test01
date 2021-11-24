import Link from "next/link";
import Image from "next/image";
import styles from "../styles/pages/Home.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";

import "swiper/css";

import { client } from "../libs/client";
import Footer from "../components/Footer";

export default function Home({ home }) {
  SwiperCore.use([Autoplay]);

  return (
    <>
      {home.map((home, index) => (
        <div key={index} className="container --full">
          {/* bg */}
          <div className="l--bg">
            <div className="l--bg__block"></div>
          </div>
          {/* bg */}

          {/* キービジュアル */}
          <div className="c--fv --pc">
            <img src={`${home.fv_pc.url}`} alt="ADACHI KANA OFFICIAL" />
          </div>
          <div className="c--fv --sp">
            <img src={`${home.fv_sp.url}`} alt="ADACHI KANA OFFICIAL" />
          </div>
          {/* キービジュアル */}

          {/* Youtubeチャンネル */}
          <section className="l--section">
            <div className="l--section__head">
              <h2 className="l--section__title">MOVIE</h2>
            </div>
            <div className="l--section__body">
              <div className="c--movie">
                <Swiper
                  autoplay={{ delay: 4500 }}
                  speed={1500}
                  spaceBetween={20}
                  slidesPerView={3}
                  loop={true}
                  centeredSlides={true}
                  className="tab--hidden"
                >
                  {home.movie.map((movie, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className="c--movie__img"
                        style={{
                          backgroundImage: `url(${movie.movie_thumb.url})`,
                        }}
                        // src={`${movie.movie_thumb.url}`}
                        // alt={index}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Swiper
                  autoplay={{ delay: 4500 }}
                  speed={1500}
                  spaceBetween={20}
                  slidesPerView={2}
                  loop={true}
                  centeredSlides={true}
                  className="tab--show"
                >
                  {home.movie.map((movie, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className="c--movie__img"
                        style={{
                          backgroundImage: `url(${movie.movie_thumb.url})`,
                        }}
                        // src={`${movie.movie_thumb.url}`}
                        // alt={index}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <a
                  href={`${home.youtube_link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="c--movie__more"
                >
                  <Image
                    src="/img/icon/s_youtube.svg"
                    alt="ADACHI KANA OFFICIAL"
                    width={20}
                    height={20}
                  />
                  <span className="c--movie__more__text">
                    OFFICIAL YOUTUBE CHANNEL
                  </span>
                </a>
              </div>
            </div>
          </section>
          {/* Youtubeチャンネル */}

          {/* バナー */}
          <div className="c--banner">
            {home.banner.map((banner, index) => (
              <div key={index} className="c--banner__item">
                <Link href={`${banner.banner_link}`}>
                  <a>
                    <img
                      src={`${banner.banner_img.url}`}
                      alt="ADACHI KANA OFFICIAL"
                    />
                  </a>
                </Link>
              </div>
            ))}
          </div>
          {/* バナー */}
          <Footer />
        </div>
      ))}
    </>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します;
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "home" });

  return {
    props: {
      home: data.contents,
    },
  };
};

// export const getStaticProps = async () => {
//   const data = await Promise.all([
//     client.get({ endpoint: "home" }),
//     client.get({ endpoint: "header" }),
//   ]);
//   return {
//     props: {
//       home: data[0].contents,
//       header: data[0].contents,
//     },
//   };
// };
