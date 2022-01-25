import { render } from "@testing-library/react";
import { Demo as DemoButton } from "./button.stories";

it("BuDemotton", () => {
  const { getByText } = render(<DemoButton>Click me</DemoButton>);

  const button = getByText("Click me");
  expect(button).toBeInTheDocument();
});
