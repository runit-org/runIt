import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

function VerticalNav({ navObj }) {
  const [active, setActive] = useState(0);

  return (
    <Nav
      className="flex-column verticalNav"
      defaultActiveKey={active}
      onSelect={(event) => setActive(event)}
      activeKey={active}
    >
      {navObj
        ? navObj.map((item, index) => {
            return (
              <div key={index}>
                <Nav.Link as={Link} to={item.href} eventKey={index}>
                  {item.title}
                </Nav.Link>
              </div>
            );
          })
        : ""}
    </Nav>
  );
}

export default VerticalNav;
