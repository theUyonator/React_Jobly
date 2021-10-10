import React from "react";
import { render } from "@testing-library/react";
import CompanyCard from "./CompanyCard";
import { MemoryRouter } from "react-router";

// smoke test
test("renders without crashing", function() {
    render(<CompanyCard />);
  });

test("matches snapshot with company logo", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <CompanyCard
                handle="abc"
                name="ABC Apparel"
                description="ABC Apparel is an exceptional outfit"
                logo_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPpsiqd2mYQzgOEhTWnQ3OktQZjZh3__OJrw&usqp=CAU"
            />
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});


test("matches snapshot without company logo", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <CompanyCard
                handle="abc"
                name="ABC Apparel"
                description="ABC Apparel is an exceptional outfit"
            />
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});