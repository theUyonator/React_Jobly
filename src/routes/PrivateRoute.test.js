import React from "react";
import { render } from "@testing-library/react";
import PrivateRoute from "./PrivateRoute";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";

// smoke test
test("renders without crashing", function () {
    render(
        <MemoryRouter>
            <UserProvider>
                <PrivateRoute />
            </UserProvider>
        </MemoryRouter>
    );
});

test("matches snapshot with no user", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider currentuser={null}>
                <PrivateRoute />
            </UserProvider>
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});


test("matches snapshot with current user", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <PrivateRoute />
            </UserProvider>
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});
