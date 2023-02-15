import { render } from "@testing-library/react";
import { Button } from "..";

describe("Button", () => {
  it("should be primary when not given an intent", () => {
    const { asFragment } = render(<Button />);
    const fragment = asFragment();

    const button = fragment.querySelector("button") as HTMLButtonElement;

    expect(button.classList.contains("bg-indigo-600"));
    expect(fragment).toMatchSnapshot();
  });

  it("should apply styling based on an intent", () => {
    const { asFragment } = render(<Button intent="secondary" />);
    const fragment = asFragment();

    const button = fragment.querySelector("button") as HTMLButtonElement;

    expect(button.classList.contains("bg-indigo-100"));
  });
});
