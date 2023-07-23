import React, { useState, useImperativeHandle, useEffect } from "react";
import { Modal } from "react-bootstrap";
import CTAButton from "./ctaButton";

const ModalItem = React.forwardRef(
  (
    {
      btnIcon,
      customBtn,
      btnStyleFull,
      title,
      parentCallback,
      children,
      error,
    },
    r
  ) => {
    const [modalShow, setModalShow] = useState(false);

    useImperativeHandle(r, () => ({
      setModalShow() {
        setModalShow(false);
      },
    }));

    useEffect(() => {
      if (parentCallback) {
        parentCallback(modalShow);
      }
    });

    return (
      <>
        <CTAButton
          type={""}
          btnStyle={`postBtn-placements ${customBtn}`}
          btnStyleFull={btnStyleFull}
          variant={"primary"}
          onClick={() => setModalShow(true)}
          placeholder={btnIcon}
          title={title}
        />
        <Modal
          ref={r}
          size="md"
          show={modalShow}
          onHide={() => setModalShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Body>
            <Modal.Title>{title}</Modal.Title>
            {error && error.success === "false" ? (
              <small className="mb-4 text-danger">{error.message}</small>
            ) : (
              ""
            )}
            {children}
          </Modal.Body>
        </Modal>
      </>
    );
  }
);

export default React.memo(ModalItem);