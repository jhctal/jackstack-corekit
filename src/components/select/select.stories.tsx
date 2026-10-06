/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { useState } from "react";
import Select, { SelectOption } from "./select";

// Helper components for stories that need state
const ControlledSelectStory = (args: any) => {
  const [value, setValue] = useState("cherry");
  return (
    <div className="space-y-4">
      <Select
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          action("onChange")(newValue);
        }}
      />
      <div className="text-sm text-gray-600">
        Current value: <code className="bg-gray-100 px-1 rounded">{value}</code>
      </div>
      <div className="space-x-2">
        <button
          onClick={() => setValue("apple")}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
        >
          Set to Apple
        </button>
        <button
          onClick={() => setValue("")}
          className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
        >
          Clear Selection
        </button>
      </div>
    </div>
  );
};

const PlaygroundStory = (args: any) => {
  const [selectedValue, setSelectedValue] = useState(args.defaultValue || "");
  const [isControlled, setIsControlled] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isControlled}
            onChange={(e) => setIsControlled(e.target.checked)}
          />
          <span className="text-sm">Controlled mode</span>
        </label>
      </div>

      <Select
        {...args}
        value={isControlled ? selectedValue : undefined}
        onChange={(value) => {
          setSelectedValue(value);
          action("onChange")(value);
        }}
      />

      {isControlled && (
        <div className="text-sm text-gray-600">
          Selected:{" "}
          <code className="bg-gray-100 px-1 rounded">
            {selectedValue || "none"}
          </code>
        </div>
      )}
    </div>
  );
};

const meta: Meta<typeof Select> = {
  title: "Select",
  component: Select,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A customizable dropdown select component with keyboard navigation support.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "300px", padding: "20px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    placeholder: {
      control: { type: "text" },
    },
    value: {
      control: { type: "text" },
    },
    defaultValue: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

// Sample options for stories
const basicOptions: SelectOption[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Date", value: "date" },
  { label: "Elderberry", value: "elderberry" },
];

const optionsWithDisabled: SelectOption[] = [
  { label: "Available Option 1", value: "option1" },
  { label: "Disabled Option", value: "option2", disabled: true },
  { label: "Available Option 2", value: "option3" },
  { label: "Another Disabled", value: "option4", disabled: true },
  { label: "Available Option 3", value: "option5" },
];

const manyOptions: SelectOption[] = Array.from({ length: 20 }, (_, i) => ({
  label: `Option ${i + 1}`,
  value: `option-${i + 1}`,
  disabled: i % 7 === 0, // Every 7th option is disabled
}));

export const Default: Story = {
  args: {
    options: basicOptions,
    placeholder: "Choose your favorite fruit",
    onChange: action("onChange"),
    onFocus: action("onFocus"),
    onBlur: action("onBlur"),
  },
};

export const WithDefaultValue: Story = {
  args: {
    options: basicOptions,
    defaultValue: "banana",
    placeholder: "Choose your favorite fruit",
    onChange: action("onChange"),
  },
  parameters: {
    docs: {
      description: {
        story: "Select component with a pre-selected default value.",
      },
    },
  },
};

export const Controlled: Story = {
  render: ControlledSelectStory,
  args: {
    options: basicOptions,
    placeholder: "Controlled select",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Controlled select where the value is managed by parent component state.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    options: basicOptions,
    disabled: true,
    defaultValue: "apple",
    placeholder: "This select is disabled",
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: optionsWithDisabled,
    placeholder: "Some options are disabled",
    onChange: action("onChange"),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Select with some options disabled. Disabled options cannot be selected via mouse or keyboard.",
      },
    },
  },
};

export const EmptyOptions: Story = {
  args: {
    options: [],
    placeholder: "No options available",
    onChange: action("onChange"),
  },
  parameters: {
    docs: {
      description: {
        story: "Select component when no options are provided.",
      },
    },
  },
};

export const ManyOptions: Story = {
  args: {
    options: manyOptions,
    placeholder: "Scroll through many options",
    onChange: action("onChange"),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Select with many options to test scrolling behavior. Some options are disabled.",
      },
    },
  },
};

export const LongLabels: Story = {
  args: {
    options: [
      {
        label: "Short",
        value: "short",
      },
      {
        label:
          "This is a very long option label that might overflow the container width",
        value: "long",
      },
      {
        label:
          "Another extremely long option label that demonstrates text truncation behavior in the dropdown",
        value: "very-long",
      },
      {
        label: "Normal length option",
        value: "normal",
      },
    ],
    placeholder: "Test text truncation",
    onChange: action("onChange"),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Select with options that have very long labels to test text truncation.",
      },
    },
  },
};

export const CustomStyling: Story = {
  args: {
    options: basicOptions,
    placeholder: "Custom styled select",
    className: "border-2 border-purple-500 rounded-lg",
    onChange: action("onChange"),
  },
};

export const KeyboardNavigation: Story = {
  args: {
    options: optionsWithDisabled,
    placeholder: "Test keyboard navigation",
    onChange: action("onChange"),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use this story to test keyboard navigation. Click to open, then use Arrow keys to navigate, Enter/Space to select, Escape to close. Disabled options are skipped during navigation.",
      },
    },
  },
};

// Interactive playground story
export const Playground: Story = {
  render: PlaygroundStory,
  args: {
    options: basicOptions,
    placeholder: "Interactive playground",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive playground to test both controlled and uncontrolled modes.",
      },
    },
  },
};
