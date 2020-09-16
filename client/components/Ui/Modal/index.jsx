import React from "react";
import Link from 'components/SlashedLink'
import PropTypes from "prop-types";
import cx from 'classnames';

function Modal({ logo, title, left, right, children, style, modalDialogStyle, contentStyle, headerStyle, className}) {
  return (
    <div className={cx("modal", className)} style={style}>
      <div className="modal__dialog" style={modalDialogStyle}>
        {!!logo &&
          <Link href="/">
            <a className="modal__logo block text-center">{logo}</a>
          </Link>
        }
        <div className="modal__content" style={contentStyle}>
          <div className="modal__content__header relative z-20" style={headerStyle}>
            {left}
            <div className="modal__title w-11/12 text-2xl font-extrabold tracking-tightest flex justify-center items-center mx-3 -z-1 uppercase">
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
