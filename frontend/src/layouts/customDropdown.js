import { Dropdown } from "react-bootstrap";
import { Ellipse } from "./icons";

function CustomDropdown({ children }) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="light" size="sm" id="dropdown-basic">
        <Ellipse />
      </Dropdown.Toggle>
      <Dropdown.Menu>{children}</Dropdown.Menu>
    </Dropdown>
  );
}

export default CustomDropdown;
