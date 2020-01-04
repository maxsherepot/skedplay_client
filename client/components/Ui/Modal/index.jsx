import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

function Modal({ logo, title, left, right, children, style, contentStyle}) {
  return (
    <div className="modal" style={style}>
      <div className="modal__dialog">
        <Link href="/">
          <a className="modal__logo block text-center">{logo}</a>
        </Link>
        <div className="modal__content" style={contentStyle}>
          <div className="modal__content__header relative z-1">
            {left}
            <div className="text-4xl font-extrabold tracking-tightest flex justify-center items-center mx-3 -z-1 uppercase">
              {title}
            </div>
            {right}
          </div>
          <div className="modal__content__body">{children}</div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  logo: PropTypes.node,
  title: PropTypes.string.isRequired,
  left: PropTypes.node,
  right: PropTypes.node,
  children: PropTypes.node,
  style: PropTypes.object,
};

export default Modal;
