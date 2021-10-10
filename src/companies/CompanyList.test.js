import React from "react";
import { render } from "@testing-library/react";
import CompanyList from "./CompanyList";
import { MemoryRouter } from "react-router";

// smoke test
test("renders without crashing", function() {
    render(<CompanyList />);
  });

test("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <CompanyList />
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});


