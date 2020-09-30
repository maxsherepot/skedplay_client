import PropTypes from "prop-types";

export default function AlertTriangleSvg({ fill }) {
    return (
        <svg width="34" height="30" viewBox="0 0 34 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.3813 2.4891L1.41044 24.3598C1.14301 24.8276 1.00151 25.3579 1.00001 25.8981C0.998515 26.4382 1.13707 26.9693 1.40191 27.4386C1.66674 27.9079 2.04861 28.2989 2.50953 28.5729C2.97045 28.8468 3.49436 28.9941 4.02912 29H29.9709C30.5056 28.9941 31.0295 28.8468 31.4905 28.5729C31.9514 28.2989 32.3333 27.9079 32.5981 27.4386C32.8629 26.9693 33.0015 26.4382 33 25.8981C32.9985 25.3579 32.857 24.8276 32.5896 24.3598L19.6187 2.4891C19.3457 2.03453 18.9613 1.65869 18.5026 1.39786C18.0439 1.13703 17.5264 1 17 1C16.4736 1 15.9561 1.13703 15.4974 1.39786C15.0387 1.65869 14.6543 2.03453 14.3813 2.4891Z" fill="white" stroke="#FF3366" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 11.2198V17.1466" stroke="#FF3366" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="17" cy="23" r="1" fill="#FF3366"/>
        </svg>
    );
}

AlertTriangleSvg.propTypes = {
    fill: PropTypes.string
};

AlertTriangleSvg.defaultProps = {
    fill: "none"
};