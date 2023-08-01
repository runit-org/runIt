import Nav from "react-bootstrap/Nav";

function VerticalNav({ navObj }) {
  return (
    <Nav defaultActiveKey="/home" className="flex-column">
      {navObj
        ? navObj.map((item, index) => {
            return (
              <div key={index}>
                <Nav.Link href={item.href}>{item.title}</Nav.Link>
              </div>
            );
          })
        : ""}
    </Nav>
  );
}

export default VerticalNav;
