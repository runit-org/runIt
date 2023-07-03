import { Route } from "react-router-dom";
import MainDash from "../../src/components/Dashboards/main-dash";

describe("Post page", () => {
  it("renders", () => {
    cy.mount(<Route path={"/"} element={<MainDash />} />);
    cy.findByText(/create event/i);
  });
});
