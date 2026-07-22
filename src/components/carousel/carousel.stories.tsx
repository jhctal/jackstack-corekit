import type { Meta, StoryObj } from "@storybook/react";

import Carousel from "./carousel";
import Image1 from "./core.png";
import Image2 from "./corekit-logomark.png";

const meta = {
  title: "Carousel",
  component: Carousel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    className: "h-24 w-48",
    imgClasses: "h-12 w-12 bg-red-400",
    items: [
      {
        image: Image1,
        link: "www.corekit.com",
        caption: "The new UI lib",
        alt: "The new UI lib",
        type: "internal",
      },
      {
        image: Image2,
        alt: "The new UI lib",
        link: "www.corekit.com",
        caption: "The new UI lib",
        type: "internal",
      },
    ],
    // className: "px-4 py-2 rounded text-lg text-black border border-gray-300",
    // placeholder: "Primary Input",
  },
};
