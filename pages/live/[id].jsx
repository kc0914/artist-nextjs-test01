// import { getStaticProps } from "..";
import { client } from "../../libs/client";
import styles from "../../styles/pages/Single.module.scss";

export default function LiveId({ live }) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{live.title}</h1>
      <p>{live.publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${live.body}`,
        }}
        className={styles.post}
      />
    </main>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "live" });

  const paths = data.contents.map((content) => `/live/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "live", contentId: id });

  return {
    props: {
      live: data,
    },
  };
};
