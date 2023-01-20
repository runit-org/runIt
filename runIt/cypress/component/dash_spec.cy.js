import { Route } from "react-router-dom";
import MainDash from "../../src/components/Dashboards/main-dash";

describe("<Dash />", () => {
  it("renders", () => {
    cy.mount(<Route path={"/"} element={<MainDash />} />);
    cy.findByRole("heading", { name: /create event/i });
  });
});
