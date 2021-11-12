// import { getStaticProps } from "..";
import { client } from "../../libs/client";
import styles from "../../styles/pages/Single.module.scss";

export default function InfoId({ info }) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{info.title}</h1>
      <p>{info.publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${info.body}`,
        }}
        className={styles.post}
      />
    </main>
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
