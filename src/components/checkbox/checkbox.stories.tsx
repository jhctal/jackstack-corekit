import type { Meta, StoryObj } from "@storybook/react";

import Checkbox from "./checkbox";

const meta = {
  title: "Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    name: "agree",
    defaultChecked: true,
  },
};

export const CustomColor: Story = {
  args: {
    name: "agree",
    className: "accent-green-600",
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    name: "agree",
    disabled: true,
  },
};
