import "../styles/globals.css";
import "../styles/scss/theme.css";

import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

// データをテンプレートに受け渡す部分の処理を記述します;
