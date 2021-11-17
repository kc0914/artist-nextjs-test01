import Meta from "./Meta";
import Header from "./Header";
import Snsbar from "./Snsbar";

export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <Header />
      <Snsbar />
      <main>{children}</main>
    </>
  );
}
