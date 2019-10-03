import React from "react";
import Carousel, { Modal, ModalGateway } from "react-images";

function Lightbox({ open, index, images, onClose }) {
  const views = [];

  images.forEach(image => {
    views.push({ src: image.url });
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

  return (
    <ModalGateway>
      {open ? (
        <Modal styles={customStyles} onClose={onClose}>
          <Carousel views={views} currentIndex={index} />
        </Modal>
      ) : null}
    </ModalGateway>
  );
}

Lightbox.defaultProps = {
  open: false
};

export default Lightbox;
