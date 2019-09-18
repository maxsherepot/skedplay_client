import PropTypes from "prop-types";
import cx from "classnames";

const FavoriteSvg = ({ active, large }) => {
  const className = active ? "stroke-red fill-red" : "stroke-grey fill-white";
  const btnClassName = cx(
    large ? "w-15 h-15" : "w-10 h-10",
    "flex justify-center content-center rounded-full bg-white focus:outline-none"
  );

  return (
    <button className={btnClassName}>
      {large ? (
        <svg
          className={className}
          width="30"
          height="26"
          viewBox="0 0 30 26"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M27.6867 2.75438C26.9537 2.03968 26.0833 1.47272 25.1254 1.08591C24.1675 0.699094 23.1407 0.5 22.1038 0.5C21.0669 0.5 20.0402 0.699094 19.0822 1.08591C18.1243 1.47272 17.254 2.03968 16.5209 2.75438L14.9996 4.23696L13.4783 2.75438C11.9976 1.31141 9.98941 0.500748 7.89541 0.500748C5.80142 0.500748 3.79319 1.31141 2.31251 2.75438C0.831836 4.19736 1.56015e-08 6.15446 0 8.19515C-1.56015e-08 10.2358 0.831836 12.1929 2.31251 13.6359L3.83382 15.1185L14.9996 26L26.1654 15.1185L27.6867 13.6359C28.4201 12.9215 29.0019 12.0734 29.3988 11.1398C29.7957 10.2063 30 9.20566 30 8.19515C30 7.18464 29.7957 6.18403 29.3988 5.25048C29.0019 4.31694 28.4201 3.46876 27.6867 2.75438Z" />
        </svg>
      ) : (
        <svg
          className={className}
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
      )}
    </button>
  );
};

FavoriteSvg.propTypes = {
  active: PropTypes.bool,
  large: PropTypes.bool
};

FavoriteSvg.defaultProps = {
  active: false,
  large: false
};

export default FavoriteSvg;
