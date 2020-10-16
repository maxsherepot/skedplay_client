import PropTypes from "prop-types";

export default function VisaSvg({ fill }) {
  return (
    <svg
      width="50"
      height="16"
      viewBox="0 0 50 16"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M46.6382 0.21936H43.4949C42.5446 0.21936 41.8136 0.511758 41.375 1.46205L35.3809 15.1316H39.6206C39.6206 15.1316 40.3516 13.3042 40.4978 12.8656C40.9364 12.8656 45.1031 12.8656 45.6879 12.8656C45.8341 13.3773 46.1996 15.0585 46.1996 15.0585H50.0007L46.6382 0.21936ZM41.6674 9.79538C42.0329 8.91819 43.2756 5.62872 43.2756 5.62872C43.2756 5.70182 43.6411 4.75152 43.7873 4.23983L44.0797 5.55562C44.0797 5.55562 44.8838 9.13749 45.03 9.86848H41.6674V9.79538Z"
        fill="#3362AB"
      />
      <path
        d="M35.6715 10.2339C35.6715 13.3041 32.8938 15.3509 28.581 15.3509C26.7535 15.3509 24.9991 14.9854 24.0488 14.5468L24.6336 11.1842L25.1453 11.4035C26.4611 11.9883 27.3383 12.2076 28.9464 12.2076C30.116 12.2076 31.3587 11.769 31.3587 10.7456C31.3587 10.0877 30.847 9.64912 29.2388 8.91813C27.7038 8.18713 25.657 7.01754 25.657 4.89766C25.657 1.97368 28.5079 0 32.5283 0C34.0634 0 35.3791 0.292398 36.1832 0.657895L35.5984 3.87427L35.306 3.58187C34.5751 3.28947 33.6248 2.99708 32.2359 2.99708C30.7008 3.07018 29.9698 3.72807 29.9698 4.31287C29.9698 4.97076 30.847 5.48246 32.2359 6.14035C34.5751 7.23684 35.6715 8.47953 35.6715 10.2339Z"
        fill="#3362AB"
      />
      <path
        d="M0 0.365518L0.0730994 0.0731201H6.35965C7.23684 0.0731201 7.89474 0.365518 8.11404 1.31581L9.50292 7.89476C8.11404 4.38599 4.89766 1.53511 0 0.365518Z"
        fill="#F9B50B"
      />
      <path
        d="M18.347 0.219218L11.9874 15.0584H7.6745L4.01953 2.6315C6.65111 4.31278 8.84409 6.94436 9.64819 8.77185L10.0868 10.3069L14.0342 0.146118H18.347V0.219218Z"
        fill="#3362AB"
      />
      <path
        d="M20.0292 0.146118H24.0497L21.4912 15.0584H17.4707L20.0292 0.146118Z"
        fill="#3362AB"
      />
    </svg>
  );
}

VisaSvg.propTypes = {
  fill: PropTypes.string
};

VisaSvg.defaultProps = {
  fill: "none"
};
