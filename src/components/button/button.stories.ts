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
    children: "Primary Button",
    className:
      "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
  },
};

// Secondary button
export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    className:
      "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded",
  },
};

// Submit button
export const Submit: Story = {
  args: {
    children: "Submit Form",
    type: "submit",
    className:
      "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded",
  },
};

// Disabled button
export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
    className:
      "bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed",
  },
};

// With icon button
// export const WithIcon: Story = {
//   args: {
//     children: (
//       <>
//         <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
//         </svg>
//         With Icon
//       </>
//     ),
//     className: 'bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded inline-flex items-center',
//   },
// };
