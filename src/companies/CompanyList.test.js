import React from "react";
import { render } from "@testing-library/react";
import CompanyList from "./CompanyList";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";

// smoke test
test("renders without crashing", function() {
    render(
    <MemoryRouter>
        <UserProvider>
            <CompanyList />
        </UserProvider>
    </MemoryRouter>
    );
  });

test("matches snapshot", function () {
    const { asFragment } = render(
    <MemoryRouter>
        <UserProvider>
            <CompanyList />
        </UserProvider>
    </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});


