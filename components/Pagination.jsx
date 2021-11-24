import Router, { useRouter } from "next/router";
import Link from "next/link";

export const Pagination = ({ totalCount, pageName }) => {
  const router = useRouter();

  const current = router.query.id;
  // console.log(router);
  const PER_PAGE = 10;

  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  return (
    <div className="c--pagination">
      {/* {current.startsWith(1) ? (
        ""
      ) : ( */}
      {current == 1 ? (
        ""
      ) : (
        <div className="c--pagination__nav c--pagination__nav--prev">
          <Link href={`/${pageName}/page/${parseInt(current) - 1}`}>
            <a className="c--pagination__nav--text">PREV</a>
          </Link>
        </div>
      )}
      <ul className="c--pagination__list">
        {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
          <li
            key={index}
            className={
              // "c--pagination__item"
              // current.startsWith(number)
              current == number
                ? "is-current c--pagination__item"
                : "c--pagination__item"
            }
          >
            <Link href={`/${pageName}/page/${number}`}>
              <a className="c--pagination__text">{number}</a>
            </Link>
          </li>
        ))}
      </ul>
      {/* {current.startsWith(Math.ceil(totalCount / PER_PAGE)) ? (
        ""
      ) : ( */}
      {current == Math.ceil(totalCount / PER_PAGE) ? (
        ""
      ) : (
        <div className="c--pagination__nav c--pagination__nav--next">
          <Link href={`/${pageName}/page/${parseInt(current) + 1}`}>
            <a className="c--pagination__nav--text">NEXT</a>
          </Link>
        </div>
      )}
    </div>
  );
};
