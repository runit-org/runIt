import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function SortDropdown() {
  const location = useLocation();
  const defaultState = "Sort";
  const [title, setTitle] = useState(defaultState);

  useEffect(() => {
    if (location.hash.includes("action-1")) {
      setTitle("Newest");
    } else if (location.hash.includes("action-2")) {
      setTitle("Oldest");
    } else if (location.hash.includes("action-3")) {
      setTitle("Starting soon");
    } else {
      setTitle(defaultState);
    }
  }, [location.hash]);

  return (
    <Dropdown>
      <Dropdown.Toggle size="sm" variant="primary">
        {title}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Newest</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Oldest</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Starting soon</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SortDropdown;
