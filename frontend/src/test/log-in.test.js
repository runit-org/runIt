import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/UserAuth/log-in";
import store from "../store";

test("Login form test", async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );

  expect(await screen.findByRole("button", { name: /login/i })).toBeEnabled();

  userEvent.type(screen.getByPlaceholderText(/Username/i), "user");
  userEvent.type(screen.getByPlaceholderText(/Password/i), "password123");
});
