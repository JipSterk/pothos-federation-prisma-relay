import { action } from "@storybook/addon-actions";
import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { Button } from ".";

/**
 * Button's meta
 */
const meta: Meta = {
  title: "Button",
  component: Button,
};

export default meta;

const Template: StoryFn<typeof Button> = ({ children, ...args }) => (
  <Button onClick={action("pressed")} {...args}>
    {children}
  </Button>
);

/**
 * Button with intent primary
 */
export const Primary = Template.bind({});

Primary.args = {
  intent: "primary",
  children: "Hello",
};

/**
 * Button with intent primary
 */
export const Secondary = Template.bind({});

Secondary.args = {
  intent: "secondary",
  children: "Text",
};
