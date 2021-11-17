import { client } from "../libs/client";
import Footer from "../components/Footer";

export default function Bio({ bio }) {
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
            <h1 className="l--page__section__title">BIOGRAPHY</h1>
          </div>
          <div className="l--page__section__body">
            {bio.map((bio, index) => (
              <div className="c--bio" key={index}>
                <div className="c--bio__img">
                  <img src={`${bio.artist_img.url}`} alt="ADACHI KANA" />
                </div>
                <div className="c--bio__text">
                  <h1 className="c--bio__name">{bio.name}</h1>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `${bio.body}`,
                    }}
                    className="c--bio__body"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "bio" });

  return {
    props: {
      bio: data.contents,
    },
  };
};
