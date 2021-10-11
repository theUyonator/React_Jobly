import React from "react";
import { render } from "@testing-library/react";
import JobCardList from "./JobCardList";
import { UserProvider } from "../testUtils";

let jobs = [
    {
        id : 1, 
        title: "shoemaker", 
        salary: 1000, 
        equity: 0.5, 
        companyName: "RW & CO"
    }
];

// smoke test
test("renders without crashing", function() {
    render(
    <UserProvider>
        <JobCardList jobs={jobs} />
    </UserProvider>
    );
  });

// snapshot test

test("matches snapshot", function () {
    const { asFragment } = render (
        <UserProvider>
            <JobCardList jobs={jobs}/>
        </UserProvider>
    );
    expect(asFragment()).toMatchSnapshot();
})