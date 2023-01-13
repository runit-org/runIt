import { Route } from "react-router-dom";
import Login from "../../src/components/UserAuth/log-in";

describe("<Login />", () => {
  it("renders", () => {
    cy.mount(<Route path={"/"} element={<Login />} />);
    cy.findByRole("button", { name: /login/i });
  });
});
