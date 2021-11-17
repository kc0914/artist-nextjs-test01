// import { getStaticProps } from "..";
import { client } from "../../libs/client";
import styles from "../../styles/pages/Single.module.scss";

export default function MeidaId({ media }) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{media.title}</h1>
      <p>{media.publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${media.body}`,
        }}
        className={styles.post}
      />
    </main>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "media" });

  const paths = data.contents.map((content) => `/media/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "media", contentId: id });

  return {
    props: {
      media: data,
    },
  };
};
