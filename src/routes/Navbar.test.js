import React from "react";
import { render } from "@testing-library/react";
import Navbar from "./Navbar";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";

// smoke test
test("renders without crashing", function () {
    render(
        <MemoryRouter>
            <UserProvider>
                <Navbar />
            </UserProvider>
        </MemoryRouter>
    );
});

test("matches snapshot with no user", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider currentuser={null}>
                <Navbar />
            </UserProvider>
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});


test("matches snapshot with current user", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <Navbar />
            </UserProvider>
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});
