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
  args: {
    onClick: action("pressed"),
  },
};

export default meta;

const Template: StoryFn<typeof Button> = (args) => (
  <Button {...args}>Button</Button>
);

/**
 * Button with intent primary
 */
export const Primary = Template.bind({});

Primary.args = {
  intent: "primary",
};

/**
 * Button with intent primary
 */
export const Secondary = Template.bind({});

Secondary.args = {
  intent: "secondary",
};
