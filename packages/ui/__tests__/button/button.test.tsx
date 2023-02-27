import { render } from "@testing-library/react";
import { Button } from "../..";

describe("Button", () => {
  it("should render a button", () => {
    const { asFragment } = render(<Button />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should be primary when not given an intent", () => {
    const { asFragment } = render(<Button />);

    const button = asFragment().querySelector("button") as HTMLButtonElement;

    expect(button.classList.contains("bg-indigo-600"));
  });

  it("should apply styling based on an intent", () => {
    const { asFragment } = render(<Button intent="secondary" />);

    const button = asFragment().querySelector("button") as HTMLButtonElement;

    expect(button.classList.contains("bg-indigo-100"));
  });
});
