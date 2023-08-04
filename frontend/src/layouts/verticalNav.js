import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

function VerticalNav({ navObj }) {
  const [active, setActive] = useState(1);

  return (
    <Nav
      className="flex-column verticalNav"
      defaultActiveKey={1}
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
