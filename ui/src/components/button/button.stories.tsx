import { expect } from "@storybook/jest";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import Button from "./button";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    onClick: { action: true },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <>
    <Button {...args} />
  </>
);

export const Demo = Template.bind({});
Demo.args = {
  children: "Click me",
};

Demo.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole("button"));
  expect(args.onClick).toHaveBeenCalled();
};
