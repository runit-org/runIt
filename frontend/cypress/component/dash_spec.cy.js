import { Route } from "react-router-dom";
import MainDash from "../../src/pages/events-dash";

describe("Post page", () => {
  it("renders", () => {
    cy.mount(<Route path={"/"} element={<MainDash />} />);
    cy.findByText(/create event/i);
  });
});
