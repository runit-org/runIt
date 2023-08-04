import Nav from "react-bootstrap/Nav";

function VerticalNav({ navObj }) {
  return (
    <Nav defaultActiveKey={"active"} className="flex-column verticalNav">
      {navObj
        ? navObj.map((item, index) => {
            return (
              <div key={index}>
                <Nav.Link href={item.href} eventKey={item.href}>
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
