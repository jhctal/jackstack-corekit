import type { Meta, StoryObj } from "@storybook/react";

import Radio from "./radio";

const meta = {
  title: "Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    value: "yes",
    name: "yes",
    // className: "px-4 py-2 rounded text-lg text-black border border-gray-300",
    // placeholder: "Primary Input",
  },
};

export const UnstyledBase: Story = {
  args: {
    value: "yes",
    name: "yes",
    // placeholder: "Unstyled Input",
  },
};

export const Disabled: Story = {
  args: {
    value: "yes",
    name: "yes",
    // placeholder: "Disabled Input",
    // disabled: true,
  },
};
