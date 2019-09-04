import PropTypes from "prop-types";
import cx from "classnames";

export default function FavoriteSvg({ active }) {
  return (
    <svg
      className={cx(active ? "stroke-red fill-red" : "stroke-grey fill-white")}
      width="22"
      height="19"
      viewBox="0 0 22 19"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.4578 2.50292C18.9691 2.02645 18.3889 1.64848 17.7503 1.39061C17.1117 1.13273 16.4272 1 15.7359 1C15.0446 1 14.3601 1.13273 13.7215 1.39061C13.0829 1.64848 12.5026 2.02645 12.0139 2.50292L10.9997 3.4913L9.98554 2.50292C8.99842 1.54094 7.6596 1.0005 6.26361 1.0005C4.86761 1.0005 3.52879 1.54094 2.54168 2.50292C1.55456 3.46491 1 4.76964 1 6.1301C1 7.49055 1.55456 8.79528 2.54168 9.75727L3.55588 10.7457L10.9997 18L18.4436 10.7457L19.4578 9.75727C19.9467 9.28102 20.3346 8.71557 20.5992 8.0932C20.8638 7.47084 21 6.80377 21 6.1301C21 5.45642 20.8638 4.78935 20.5992 4.16699C20.3346 3.54463 19.9467 2.97917 19.4578 2.50292V2.50292Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}

FavoriteSvg.propTypes = {
  active: PropTypes.bool
};

FavoriteSvg.defaultProps = {
  active: false
};
