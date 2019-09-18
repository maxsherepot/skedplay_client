import PropTypes from "prop-types";
import cx from "classnames";
import HeartSvg from "./HeartSvg";

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
        <HeartSvg className={className}></HeartSvg>
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
