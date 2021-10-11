import React from "react";
import { render } from "@testing-library/react";
import Alert from "./Alert";

test("renders without crashing", function () {
    render(<Alert />);
});

test("matches snapshot for danger", function () {
    let messages = ["Danger everywhere", "But go to see it through ma boi!"];
    const { asFragment } = render(<Alert type="danger" messages={messages} />);
    expect(asFragment()).toMatchSnapshot();
});

test("matches snapshot for success", function () {
    let messages = ["Everythang good over here boi!", "Thumbs up ma boi!"];
    const { asFragment } = render(<Alert type="success" messages={messages} />);
    expect(asFragment()).toMatchSnapshot();
});