import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Button from "./button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: "color" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: "primary",
    label: "Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    label: "Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    label: "Button",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    label: "Button",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    label: "Button",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    label: "Button",
  },
};

export const ExtraLarge: Story = {
  args: {
    size: "xl",
    label: "Button",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    label: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    label: "Button",
  },
};

export const OverriddenStyles: Story = {
  args: {
    className: "bg-[#BADA55] hover:bg-red-800 text-black text-3xl px-24 py-18",
    label: "Button",
  },
};
