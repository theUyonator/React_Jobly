import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Homepage from "./Hompage";
import { UserProvider } from "../testUtils";

// smoke test
test("renders without crashing", function() {
    render(<Homepage />);
  });

test(" matches snapshot", function () {
  const { asFragment } = render (
    <MemoryRouter>
      <UserProvider>
        <Home />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

test("matches snapshot when logged out", function () {
  const { asFragment } = render (
    <MemoryRouter>
    <UserProvider currentUser={null}>
      <Home />
    </UserProvider>
  </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
})