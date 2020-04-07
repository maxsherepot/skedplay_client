import PropTypes from "prop-types";

export default function MapSvg({ fill }) {
    return (
        <svg
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M6.72727 13.8L1 17V4.2L6.72727 1M6.72727 13.8L13.2727 17M6.72727 13.8V1M13.2727 17L19 13.8V1L13.2727 4.2M13.2727 17V4.2M13.2727 4.2L6.72727 1"
                stroke="#FF3366"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

MapSvg.propTypes = {
    fill: PropTypes.string
};

MapSvg.defaultProps = {
    fill: "none"
};

