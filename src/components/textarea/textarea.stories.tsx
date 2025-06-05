import type { Meta, StoryObj } from "@storybook/react";
import Textarea from "./textarea";

const meta: Meta<typeof Textarea> = {
  title: "Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text for the textarea",
    },
    disabled: {
      control: "boolean",
      description: "Whether the textarea is disabled",
    },
    readOnly: {
      control: "boolean",
      description: "Whether the textarea is read-only",
    },
    rows: {
      control: { type: "number", min: 1, max: 20 },
      description: "Number of visible text lines",
    },
    cols: {
      control: { type: "number", min: 10, max: 100 },
      description: "Visible width of the text control",
    },
    maxLength: {
      control: { type: "number", min: 0 },
      description: "Maximum number of characters allowed",
    },
    required: {
      control: "boolean",
      description: "Whether the textarea is required",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
  args: {
    placeholder: "Enter your text here...",
    rows: 4,
    cols: 50,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    className: "px-4 py-2 rounded text-lg text-black border border-gray-300",
    placeholder: "Start typing...",
  },
};

// Different sizes
export const Small: Story = {
  args: {
    rows: 2,
    cols: 30,
    placeholder: "Small textarea",
  },
};

export const Large: Story = {
  args: {
    rows: 8,
    cols: 80,
    placeholder: "Large textarea for longer content",
  },
};

// States
export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "This textarea is disabled",
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    defaultValue: "This textarea is read-only and cannot be edited",
  },
};

export const Required: Story = {
  args: {
    required: true,
    placeholder: "This field is required",
  },
};

// With content
export const WithContent: Story = {
  args: {
    defaultValue:
      "This textarea already has some content in it. You can edit this text to see how it behaves.",
  },
};

// Character limit
export const WithMaxLength: Story = {
  args: {
    maxLength: 100,
    placeholder: "Maximum 100 characters allowed",
    defaultValue: "This textarea has a character limit of 100 characters.",
  },
};

// Custom styling example
export const CustomStyled: Story = {
  args: {
    className:
      "border-2 border-blue-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300",
    placeholder: "Custom styled textarea",
  },
};

// Form example
export const InForm: Story = {
  render: (args) => (
    <form className="space-y-4 w-full max-w-md">
      <div>
        <label
          htmlFor="feedback"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Feedback
        </label>
        <Textarea
          {...args}
          id="feedback"
          name="feedback"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  ),
  args: {
    placeholder: "Please provide your feedback...",
    required: true,
    rows: 6,
  },
};

// Resize behavior
export const ResizeVertical: Story = {
  args: {
    className: "resize-y border border-gray-300 rounded p-2",
    placeholder: "This textarea can be resized vertically",
    rows: 3,
  },
};

export const ResizeHorizontal: Story = {
  args: {
    className: "resize-x border border-gray-300 rounded p-2",
    placeholder: "This textarea can be resized horizontally",
    cols: 40,
  },
};

export const ResizeBoth: Story = {
  args: {
    className: "resize border border-gray-300 rounded p-2",
    placeholder: "This textarea can be resized in both directions",
    rows: 4,
    cols: 50,
  },
};

export const NoResize: Story = {
  args: {
    className: "resize-none border border-gray-300 rounded p-2",
    placeholder: "This textarea cannot be resized",
    rows: 4,
    cols: 50,
  },
};
