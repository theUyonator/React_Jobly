import React from "react";
import { render } from "@testing-library/react";
import CompanyDetails from "./CompanyDetails";
import { MemoryRouter, Route } from "react-router";
import { UserProvider } from "../testUtils";

// smoke test
test("renders without crashing", function() {
    render(
    <MemoryRouter>
        <UserProvider>
            <CompanyDetails />
        </UserProvider>
    </MemoryRouter>
    );
  });

test("matches snapshot", function () {
    const { asFragment } = render(
    <MemoryRouter initialEntries={["/company/ibm"]}>
        <UserProvider>
            <Route path="/company/:handle">
                <CompanyDetails />
            </Route>
        </UserProvider>
    </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});


