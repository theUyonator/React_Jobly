import React from "react";
import { render } from "@testing-library/react";
import JobList from "./JobList";



// smoke test
test("renders without crashing", function() {
    render(
        <JobList />
    );
  });

// sanpshot test

test("matches snapshot", function () {
    const { asFragment } = render (
            <JobList />
    );
    expect(asFragment()).toMatchSnapshot();
})