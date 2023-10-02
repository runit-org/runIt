import { Form } from "react-bootstrap";

function FormGroup({ children, formId, customStyle }) {
  return (
    <Form.Group
      controlId={formId}
      className={`mb-3 ${customStyle ? customStyle : ""}`}
    >
      {children}
    </Form.Group>
  );
}

function FormLabel({ children, customStyle }) {
  return (
    <Form.Label
      className={`text-muted fw-medium small ${customStyle ? customStyle : ""}`}
    >
      {children}
    </Form.Label>
  );
}

export { FormGroup, FormLabel };
