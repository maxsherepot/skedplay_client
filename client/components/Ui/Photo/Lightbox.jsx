import React from "react";
import Carousel, { Modal, ModalGateway } from "react-images";
import { Badge } from "UI";
import {useTranslation} from "react-i18next";
import cx from "classnames";

function Lightbox({ open, index, images, onClose }) {
  const {t} = useTranslation();

  const views = [];

  images.forEach(image => {
    views.push({ src: image.url, type: image.type, mime_type: image.mime_type, vip: image.vip });
  });

  const customStyles = {
    blanket: base => ({
      ...base,
      zIndex: 50
    }),
    positioner: base => ({
      ...base,
      zIndex: 50
    }),
    dialog: base => ({
      ...base,
      zIndex: 50
    })
  };

  const CustomView = props => {
    const { data } = props;

    return (
      <div className="flex flex-col justify-center relative">
        {data.vip &&
          <Badge className="center absolute top-0 left-0 bg-red">{t('common.vip_only')}</Badge>
        }

        {data.type === 'video' ?
          (
          <video
            controls
            style={{
              minHeight: '100vh',
            }}
            className="w-full react-images__view-image react-images__view-image--isModal css-zjq1i3 css-1ycyyax"
          >
            <source src={data.src} type={data.mime_type}>
            </source>
          </video>
          )
          :
          (
            <img
              className={cx(
                "react-images__view-image react-images__view-image--isModal css-zjq1i3 css-1ycyyax",
                data.vip ? "blur-hd" : ''
              )}
              src={data.src}
            />
          )}
      </div>
    );
  };

  return (
    <ModalGateway>
      {open ? (
        <Modal styles={customStyles} onClose={onClose}>
          <Carousel
            views={views}
            currentIndex={index}
            components={{
              View: CustomView
            }}
          />
        </Modal>
      ) : null}
    </ModalGateway>
  );
}

Lightbox.defaultProps = {
  open: false
};

export default Lightbox;
