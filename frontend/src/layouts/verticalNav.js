import { NavLink } from "react-router-dom";

function VerticalNav({ navObj }) {
  return (
    <div className="flex-column verticalNav nav">
      {navObj
        ? navObj.map((item, index) => {
            return (
              <div key={index}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link inactive"
                  }
                  to={item.href}
                  eventKey={item.id}
                  end
                >
                  {item.title}
                </NavLink>
              </div>
            );
          })
        : ""}
    </div>
  );
}

export default VerticalNav;
