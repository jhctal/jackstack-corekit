import type { Meta, StoryObj } from "@storybook/react";

import Input from "./input";

const meta = {
  title: "Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    className: "px-4 py-2 rounded text-lg text-black border border-gray-300",
    placeholder: "Primary Input",
  },
};

export const UnstyledBase: Story = {
  args: {
    placeholder: "Unstyled Input",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled Input",
    disabled: true,
  },
};
