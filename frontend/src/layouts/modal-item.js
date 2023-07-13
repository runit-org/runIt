import React, { useState, useImperativeHandle, useEffect } from "react";
import { Form, Modal } from "react-bootstrap";
import CTAButton from "./cta-button";

const ModalItem = React.forwardRef(
  (
    {
      btnIcon,
      error,
      customBtn,
      btnStyleFull,
      title,
      content,
      subBtn,
      subHandler,
      parentCallback,
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
            <Form
              onSubmit={(e) => {
                subHandler(e);
              }}
            >
              {error.success === "true" ? (
                <small className="mb-4 text-success">{error.message}</small>
              ) : error.success === "false" ? (
                <small className="mb-4 text-danger">{error.message}</small>
              ) : (
                ""
              )}
              <div>
                <div className="mt-3"> {content}</div>
              </div>
              {subBtn}
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
);

export default React.memo(ModalItem);