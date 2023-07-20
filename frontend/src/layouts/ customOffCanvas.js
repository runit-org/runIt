import { Offcanvas } from "react-bootstrap";

function CustomOffCanvas({ children, notifShow, close, placement, title }) {
  return (
    <div>
      <Offcanvas show={notifShow} placement={placement} onHide={close}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fw-bold">{title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{children}</Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default CustomOffCanvas;
