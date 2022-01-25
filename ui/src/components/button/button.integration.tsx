import { mount } from "@cypress/react";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./button.stories";

declare var expect: Chai.ExpectStatic;

const { Demo: DemoButton } = composeStories(stories);

it("Should have button", () => {
  mount(<DemoButton onClick={() => alert("clicked")}>Click me</DemoButton>);

  cy.get("button").contains("Click me").click();
  cy.on("window:alert", (str) => {
    expect(str).to.equal(`clicked`);
  });
});
