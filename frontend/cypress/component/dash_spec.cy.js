import { Route } from "react-router-dom";
import MainDash from "../../src/pages/eventsDash";

describe("Post page", () => {
  it("renders", () => {
    cy.mount(<Route path={"/"} element={<MainDash />} />);
    cy.get("#main");
  });
});
