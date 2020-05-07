import React from "react";
import { Link } from 'lib/i18n'
import PropTypes from "prop-types";

function Modal({ logo, title, left, right, children, style, modalDialogStyle, contentStyle}) {
  return (
    <div className="modal" style={style}>
      <div className="modal__dialog" style={modalDialogStyle}>
        <Link href="/">
          <a className="modal__logo block text-center">{logo}</a>
        </Link>
        <div className="modal__content" style={contentStyle}>
          <div className="modal__content__header relative z-20">
            {left}
            <div className="modal__title text-4xl font-extrabold tracking-tightest flex justify-center items-center mx-3 -z-1 uppercase">
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
  modalDialogStyle: PropTypes.object,
};

export default Modal;
