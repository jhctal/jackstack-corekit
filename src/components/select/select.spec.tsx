import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Select, { SelectOption } from "./select";

const basicOptions: SelectOption[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
];

const optionsWithDisabled: SelectOption[] = [
  { label: "Available", value: "available" },
  { label: "Disabled", value: "disabled", disabled: true },
  { label: "Another Available", value: "available2" },
];

describe("Select Component", () => {
  const user = userEvent.setup();

  describe("Rendering", () => {
    it("renders with placeholder when no value is selected", () => {
      render(<Select options={basicOptions} placeholder="Choose an option" />);

      expect(screen.getByText("Choose an option")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { expanded: false })
      ).toBeInTheDocument();
    });

    it("renders with default value", () => {
      render(
        <Select
          options={basicOptions}
          defaultValue="banana"
          placeholder="Choose an option"
        />
      );

      expect(screen.getByText("Banana")).toBeInTheDocument();
      expect(screen.queryByText("Choose an option")).not.toBeInTheDocument();
    });

    it("renders as disabled when disabled prop is true", () => {
      render(
        <Select
          options={basicOptions}
          disabled={true}
          placeholder="Disabled select"
        />
      );

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveClass("cursor-not-allowed");
    });

    it("applies custom className", () => {
      render(
        <Select
          options={basicOptions}
          className="custom-class"
          placeholder="Custom select"
        />
      );

      const container = screen.getByRole("button").parentElement;
      expect(container).toHaveClass("custom-class");
    });

    it('shows "No options available" when options array is empty', async () => {
      render(<Select options={[]} placeholder="Empty select" />);

      await user.click(screen.getByRole("button"));
      expect(screen.getByText("No options available")).toBeInTheDocument();
    });
  });

  describe("Dropdown Behavior", () => {
    it("opens dropdown when clicked", async () => {
      render(<Select options={basicOptions} placeholder="Click to open" />);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-expanded", "false");

      await user.click(button);

      expect(button).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByRole("listbox")).toBeInTheDocument();
      expect(screen.getByText("Apple")).toBeInTheDocument();
      expect(screen.getByText("Banana")).toBeInTheDocument();
      expect(screen.getByText("Cherry")).toBeInTheDocument();
    });

    it("closes dropdown when clicking outside", async () => {
      render(
        <div>
          <Select options={basicOptions} placeholder="Test select" />
          <div data-testid="outside">Outside element</div>
        </div>
      );

      const button = screen.getByRole("button");
      await user.click(button);
      expect(screen.getByRole("listbox")).toBeInTheDocument();

      await user.click(screen.getByTestId("outside"));
      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });

    it("does not open when disabled", async () => {
      render(
        <Select
          options={basicOptions}
          disabled={true}
          placeholder="Disabled select"
        />
      );

      await user.click(screen.getByRole("button"));
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  describe("Option Selection", () => {
    it("selects option when clicked", async () => {
      const onChange = vi.fn();
      render(
        <Select
          options={basicOptions}
          placeholder="Select fruit"
          onChange={onChange}
        />
      );

      await user.click(screen.getByRole("button"));
      await user.click(screen.getByText("Banana"));

      expect(onChange).toHaveBeenCalledWith("banana");
      expect(screen.getByText("Banana")).toBeInTheDocument();
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("does not select disabled options", async () => {
      const onChange = vi.fn();
      render(
        <Select
          options={optionsWithDisabled}
          placeholder="Select option"
          onChange={onChange}
        />
      );

      await user.click(screen.getByRole("button"));
      await user.click(screen.getByText("Disabled"));

      expect(onChange).not.toHaveBeenCalled();
      expect(screen.getByRole("listbox")).toBeInTheDocument(); // Should still be open
    });

    it("shows checkmark for selected option", async () => {
      render(
        <Select
          options={basicOptions}
          defaultValue="apple"
          placeholder="Select fruit"
        />
      );

      await user.click(screen.getByRole("button"));

      const selectedOption = screen.getByRole("option", { name: /apple/i });
      expect(selectedOption).toHaveAttribute("aria-selected", "true");

      // Check icon should be present (using class name since it's an SVG)
      const checkIcon = selectedOption.querySelector("svg");
      expect(checkIcon).toBeInTheDocument();
    });
  });

  describe("Controlled vs Uncontrolled", () => {
    it("works as uncontrolled component with defaultValue", async () => {
      const onChange = vi.fn();
      render(
        <Select
          options={basicOptions}
          defaultValue="apple"
          onChange={onChange}
        />
      );

      expect(screen.getByText("Apple")).toBeInTheDocument();

      await user.click(screen.getByRole("button"));
      await user.click(screen.getByText("Banana"));

      expect(onChange).toHaveBeenCalledWith("banana");
      expect(screen.getByText("Banana")).toBeInTheDocument();
    });

    it("works as controlled component", async () => {
      const onChange = vi.fn();
      const { rerender } = render(
        <Select options={basicOptions} value="apple" onChange={onChange} />
      );

      expect(screen.getByText("Apple")).toBeInTheDocument();

      await user.click(screen.getByRole("button"));
      await user.click(screen.getByText("Banana"));

      expect(onChange).toHaveBeenCalledWith("banana");
      // Value shouldn't change until parent updates the prop
      expect(screen.getByText("Apple")).toBeInTheDocument();

      // Simulate parent updating the value
      rerender(
        <Select options={basicOptions} value="banana" onChange={onChange} />
      );

      expect(screen.getByText("Banana")).toBeInTheDocument();
    });
  });

  describe("Keyboard Navigation", () => {
    beforeEach(() => {
      // Mock scrollIntoView since it's not available in jsdom
      Element.prototype.scrollIntoView = vi.fn();
    });

    it("opens dropdown with Enter key", async () => {
      render(<Select options={basicOptions} placeholder="Keyboard test" />);

      const button = screen.getByRole("button");
      button.focus();

      await user.keyboard("{Enter}");
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("opens dropdown with Space key", async () => {
      render(<Select options={basicOptions} placeholder="Keyboard test" />);

      const button = screen.getByRole("button");
      button.focus();

      await user.keyboard(" ");
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("navigates options with arrow keys", async () => {
      render(<Select options={basicOptions} placeholder="Keyboard test" />);

      const button = screen.getByRole("button");
      button.focus();
      await user.keyboard("{Enter}");

      // Arrow down should focus first option (Apple)
      fireEvent.keyDown(document, { key: "ArrowDown" });

      // Arrow down again should focus second option (Banana)
      fireEvent.keyDown(document, { key: "ArrowDown" });

      // Enter should select the focused option (Banana)
      fireEvent.keyDown(document, { key: "Enter" });

      await waitFor(() => {
        expect(screen.getByText("Banana")).toBeInTheDocument();
      });
    });

    it("wraps around when navigating past last option", async () => {
      render(<Select options={basicOptions} placeholder="Keyboard test" />);

      const button = screen.getByRole("button");
      button.focus();
      await user.keyboard("{Enter}");

      // Navigate to last option and then past it
      fireEvent.keyDown(document, { key: "ArrowDown" }); // Apple (index 0)
      fireEvent.keyDown(document, { key: "ArrowDown" }); // Banana (index 1)
      fireEvent.keyDown(document, { key: "ArrowDown" }); // Cherry (index 2)
      fireEvent.keyDown(document, { key: "ArrowDown" }); // Should wrap to Apple (index 0)

      fireEvent.keyDown(document, { key: "Enter" });

      await waitFor(() => {
        expect(screen.getByText("Apple")).toBeInTheDocument();
      });
    });

    it("closes dropdown with Escape key", async () => {
      render(<Select options={basicOptions} placeholder="Keyboard test" />);

      const button = screen.getByRole("button");
      button.focus();
      await user.keyboard("{Enter}");

      expect(screen.getByRole("listbox")).toBeInTheDocument();

      fireEvent.keyDown(document, { key: "Escape" });

      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });

    it("skips disabled options during keyboard navigation", async () => {
      render(
        <Select options={optionsWithDisabled} placeholder="Keyboard test" />
      );

      const button = screen.getByRole("button");
      button.focus();
      await user.keyboard("{Enter}");

      // First arrow down should focus "Available" (index 0)
      fireEvent.keyDown(document, { key: "ArrowDown" });

      // Second arrow down should skip "Disabled" and go to "Another Available" (index 2)
      fireEvent.keyDown(document, { key: "ArrowDown" });

      fireEvent.keyDown(document, { key: "Enter" });

      await waitFor(() => {
        expect(screen.getByText("Another Available")).toBeInTheDocument();
      });
    });
  });

  describe("Focus and Blur Events", () => {
    it("calls onFocus when dropdown opens", async () => {
      const onFocus = vi.fn();
      render(
        <Select
          options={basicOptions}
          placeholder="Focus test"
          onFocus={onFocus}
        />
      );

      await user.click(screen.getByRole("button"));
      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it("calls onBlur when dropdown closes", async () => {
      const onBlur = vi.fn();
      render(
        <Select
          options={basicOptions}
          placeholder="Blur test"
          onBlur={onBlur}
        />
      );

      await user.click(screen.getByRole("button"));
      await user.click(screen.getByText("Apple"));

      expect(onBlur).toHaveBeenCalledTimes(1);
    });

    it("calls onBlur when clicking outside", async () => {
      const onBlur = vi.fn();
      render(
        <div>
          <Select
            options={basicOptions}
            placeholder="Blur test"
            onBlur={onBlur}
          />
          <div data-testid="outside">Outside</div>
        </div>
      );

      await user.click(screen.getByRole("button"));
      expect(onBlur).not.toHaveBeenCalled();

      await user.click(screen.getByTestId("outside"));

      // onBlur should be called when dropdown closes due to outside click
      // Note: This might require a small delay due to event handling order
      await waitFor(() => {
        expect(onBlur).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      render(<Select options={basicOptions} placeholder="Accessible select" />);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-haspopup", "listbox");
      expect(button).toHaveAttribute("aria-expanded", "false");
      expect(button).toHaveAttribute("aria-labelledby", "select-label");
    });

    it("updates aria-expanded when dropdown opens/closes", async () => {
      render(<Select options={basicOptions} placeholder="ARIA test" />);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-expanded", "false");

      await user.click(button);
      expect(button).toHaveAttribute("aria-expanded", "true");

      fireEvent.keyDown(document, { key: "Escape" });
      await waitFor(() => {
        expect(button).toHaveAttribute("aria-expanded", "false");
      });
    });

    it("has proper role attributes for options", async () => {
      render(<Select options={basicOptions} placeholder="Role test" />);

      await user.click(screen.getByRole("button"));

      const listbox = screen.getByRole("listbox");
      expect(listbox).toBeInTheDocument();

      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(3);

      expect(options[0]).toHaveAttribute("aria-selected", "false");
      expect(options[0]).toHaveAttribute("aria-disabled", "false");
    });

    it("marks disabled options with aria-disabled", async () => {
      render(
        <Select options={optionsWithDisabled} placeholder="Disabled test" />
      );

      await user.click(screen.getByRole("button"));

      const disabledOption = screen.getByRole("option", { name: /disabled/i });
      expect(disabledOption).toHaveAttribute("aria-disabled", "true");
    });
  });

  describe("Edge Cases", () => {
    it("handles value that does not exist in options", () => {
      render(
        <Select
          options={basicOptions}
          value="nonexistent"
          placeholder="Invalid value test"
        />
      );

      // Should fall back to placeholder since value doesn't match any option
      expect(screen.getByText("Invalid value test")).toBeInTheDocument();
    });

    it("handles rapid clicks without breaking", async () => {
      render(<Select options={basicOptions} placeholder="Rapid click test" />);

      const button = screen.getByRole("button");

      // Rapidly click multiple times
      await user.click(button);
      await user.click(button);
      await user.click(button);

      // Should either be open or closed, but not broken
      const listbox = screen.queryByRole("listbox");
      const isExpanded = button.getAttribute("aria-expanded") === "true";

      if (isExpanded) {
        expect(listbox).toBeInTheDocument();
      } else {
        expect(listbox).not.toBeInTheDocument();
      }
    });

    it("cleans up event listeners on unmount", () => {
      const { unmount } = render(
        <Select options={basicOptions} placeholder="Cleanup test" />
      );

      // Add spy to verify removeEventListener is called
      const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "mousedown",
        expect.any(Function)
      );

      removeEventListenerSpy.mockRestore();
    });
  });
});
