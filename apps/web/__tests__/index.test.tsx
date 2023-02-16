import { render } from "@testing-library/react";
import React from "react";
import Home from "../src/app/page";

describe("Home", () => {
  it("should render a homepage", () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });
});
