import React from "react";
import { render } from "@testing-library/react";
import SearchForm from "./SearchForm";

// smoke test
test("renders without crashing", function() {
    render(<SearchForm />);
  });

//   snapshot test
test("matches snapshot", function () {
    const { asFragment } = render(
        <SearchForm />);
    expect(asFragment()).toMatchSnapshot();
})