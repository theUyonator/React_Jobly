import React from "react";
import { render } from "@testing-library/react";
import JobCard from "./JobCard";
import { UserProvider } from "../testUtils";


// smoke test
test("renders without crashing", function() {
    render(<JobCard />);
  });

// sanpshot test

test("matches snapshot", function () {
    let item = { title: "Manager", salary: 120000, equity: 3};
    const { asFragment } = render (
        <UserProvider>
            <JobCard item={item}/>
        </UserProvider>
    );
    expect(asFragment()).toMatchSnapshot();
})