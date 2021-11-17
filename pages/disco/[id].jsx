// import { getStaticProps } from "..";
import { client } from "../../libs/client";
import styles from "../../styles/pages/Single.module.scss";

export default function DiscoId({ disco }) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{disco.title}</h1>
      <p>{disco.publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${disco.body}`,
        }}
        className={styles.post}
      />
    </main>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "disco" });

  const paths = data.contents.map((content) => `/disco/${content.id}`);
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
