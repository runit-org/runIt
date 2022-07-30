import React, { useState, useImperativeHandle, useEffect } from "react";
import { Form, Modal } from "react-bootstrap";
import CTAButton from "../SiteElements/cta-button";

const ModalItem = React.forwardRef(
  (
    { btnIcon, error, title, content, subBtn, subHandler, parentCallback },
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
      <div className="mb-4" ref={r}>
        <CTAButton
          type={""}
          btnStyle={"postBtn-placements"}
          variant={"primary"}
          onClick={() => setModalShow(true)}
          placeholder={btnIcon}
        />

        <Modal
          size="md"
          show={modalShow}
          onHide={() => setModalShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header /* closeButton */>
            <Modal.Title>{btnIcon}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={(e) => {
                subHandler(e);
              }}
            >
              <h4>{title}</h4>
              {error ? <small className="mb-4">{error}</small> : ""}
              <div>
                <div> {content}</div>
              </div>
              {subBtn}
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
);

export default React.memo(ModalItem);
