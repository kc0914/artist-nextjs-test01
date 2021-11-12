import Link from "next/link";
import { client } from "../libs/client";
import styles from "../styles/pages/Home.module.scss";

export default function Home({ info }) {
  return (
    <div>
      <main className={styles.main}>
        <ul>
          {info.map((info) => (
            <li key={info.id}>
              <Link href={`/info/${info.id}`}>
                <a>{info.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "info" });

  return {
    props: {
      info: data.contents,
    },
  };
};
