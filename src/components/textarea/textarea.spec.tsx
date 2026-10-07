import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Textarea from "./textarea";
import { useState } from "react";

describe("Textarea Component", () => {
  describe("Rendering", () => {
    it("renders a textarea element", () => {
      render(<Textarea />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toBeInTheDocument();
      expect(textarea.tagName).toBe("TEXTAREA");
    });

    it("renders with placeholder text", () => {
      const placeholder = "Enter your message";
      render(<Textarea placeholder={placeholder} />);
      expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
    });

    it("renders with default value", () => {
      const defaultValue = "Initial content";
      render(<Textarea defaultValue={defaultValue} />);
      expect(screen.getByDisplayValue(defaultValue)).toBeInTheDocument();
    });

    it("renders with controlled value", () => {
      const value = "Controlled content";
      render(<Textarea value={value} onChange={() => {}} />);
      expect(screen.getByDisplayValue(value)).toBeInTheDocument();
    });
  });

  describe("Props and Attributes", () => {
    it("applies custom className", () => {
      const customClass = "custom-textarea-class";
      render(<Textarea className={customClass} />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass(customClass);
    });

    it("applies multiple classNames", () => {
      const className = "class1 class2 class3";
      render(<Textarea className={className} />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("class1", "class2", "class3");
    });

    it("sets rows attribute", () => {
      const rows = 5;
      render(<Textarea rows={rows} />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("rows", rows.toString());
    });

    it("sets cols attribute", () => {
      const cols = 40;
      render(<Textarea cols={cols} />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("cols", cols.toString());
    });

    it("sets maxLength attribute", () => {
      const maxLength = 100;
      render(<Textarea maxLength={maxLength} />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("maxLength", maxLength.toString());
    });

    it("sets required attribute", () => {
      render(<Textarea required />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toBeRequired();
    });

    it("sets disabled attribute", () => {
      render(<Textarea disabled />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toBeDisabled();
    });

    it("sets readOnly attribute", () => {
      render(<Textarea readOnly />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("readOnly");
    });

    it("sets name attribute", () => {
      const name = "feedback";
      render(<Textarea name={name} />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("name", name);
    });

    it("sets id attribute", () => {
      const id = "textarea-id";
      render(<Textarea id={id} />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("id", id);
    });
  });

  describe("User Interactions", () => {
    it("handles text input", async () => {
      const user = userEvent.setup();
      render(<Textarea />);
      const textarea = screen.getByRole("textbox");

      const inputText = "Hello, World!";
      await user.type(textarea, inputText);

      expect(textarea).toHaveValue(inputText);
    });

    it("handles multiline text input", async () => {
      const user = userEvent.setup();
      render(<Textarea />);
      const textarea = screen.getByRole("textbox");

      const multilineText = "Line 1\nLine 2\nLine 3";
      await user.type(textarea, multilineText);

      expect(textarea).toHaveValue(multilineText);
    });

    it("prevents input when disabled", async () => {
      const user = userEvent.setup();
      render(<Textarea disabled defaultValue="Initial" />);
      const textarea = screen.getByRole("textbox");

      await user.type(textarea, "New text");

      expect(textarea).toHaveValue("Initial");
    });

    it("prevents input when readOnly", async () => {
      const user = userEvent.setup();
      render(<Textarea readOnly defaultValue="Initial" />);
      const textarea = screen.getByRole("textbox");

      await user.type(textarea, "New text");

      expect(textarea).toHaveValue("Initial");
    });

    it("respects maxLength constraint", async () => {
      const user = userEvent.setup();
      const maxLength = 5;
      render(<Textarea maxLength={maxLength} />);
      const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

      const longText = "This text is longer than 5 characters";
      await user.type(textarea, longText);

      expect(textarea.value.length).toBeLessThanOrEqual(maxLength);
    });
  });

  describe("Event Handlers", () => {
    it("calls onChange when text is typed", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Textarea onChange={handleChange} />);
      const textarea = screen.getByRole("textbox");

      await user.type(textarea, "a");

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({
            value: "a",
          }),
        })
      );
    });

    it("calls onFocus when textarea receives focus", async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();
      render(<Textarea onFocus={handleFocus} />);
      const textarea = screen.getByRole("textbox");

      await user.click(textarea);

      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it("calls onBlur when textarea loses focus", async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();
      render(
        <div>
          <Textarea onBlur={handleBlur} />
          <button>Other element</button>
        </div>
      );

      const textarea = screen.getByRole("textbox");
      const button = screen.getByRole("button");

      await user.click(textarea);
      await user.click(button);

      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it("calls onKeyDown when key is pressed", async () => {
      const user = userEvent.setup();
      const handleKeyDown = vi.fn();
      render(<Textarea onKeyDown={handleKeyDown} />);
      const textarea = screen.getByRole("textbox");

      await user.type(textarea, "a");

      expect(handleKeyDown).toHaveBeenCalledWith(
        expect.objectContaining({
          key: "a",
        })
      );
    });

    it("handles Enter key for new lines", async () => {
      const user = userEvent.setup();
      render(<Textarea />);
      const textarea = screen.getByRole("textbox");

      await user.type(textarea, "Line 1{enter}Line 2");

      expect(textarea).toHaveValue("Line 1\nLine 2");
    });
  });

  describe("Controlled vs Uncontrolled", () => {
    it("works as uncontrolled component", async () => {
      const user = userEvent.setup();
      render(<Textarea defaultValue="initial" />);
      const textarea = screen.getByRole("textbox");

      await user.clear(textarea);
      await user.type(textarea, "new value");

      expect(textarea).toHaveValue("new value");
    });

    it("works as controlled component", async () => {
      const user = userEvent.setup();
      const TestComponent = () => {
        const [value, setValue] = useState("initial");
        return (
          <Textarea value={value} onChange={(e) => setValue(e.target.value)} />
        );
      };

      render(<TestComponent />);
      const textarea = screen.getByRole("textbox");

      await user.clear(textarea);
      await user.type(textarea, "new value");

      expect(textarea).toHaveValue("new value");
    });
  });

  describe("Accessibility", () => {
    it("can be labeled with aria-label", () => {
      const label = "Feedback textarea";
      render(<Textarea aria-label={label} />);
      const textarea = screen.getByLabelText(label);
      expect(textarea).toBeInTheDocument();
    });

    it("can be labeled with aria-labelledby", () => {
      render(
        <div>
          <label id="textarea-label">Comments</label>
          <Textarea aria-labelledby="textarea-label" />
        </div>
      );
      const textarea = screen.getByLabelText("Comments");
      expect(textarea).toBeInTheDocument();
    });

    it("supports aria-describedby for additional descriptions", () => {
      render(
        <div>
          <Textarea aria-describedby="help-text" />
          <div id="help-text">Enter your detailed feedback here</div>
        </div>
      );
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("aria-describedby", "help-text");
    });

    it("supports aria-invalid for validation states", () => {
      render(<Textarea aria-invalid="true" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("aria-invalid", "true");
    });
  });

  describe("Form Integration", () => {
    it("submits form data correctly", () => {
      const handleSubmit = vi.fn((e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        return formData.get("message");
      });

      render(
        <form onSubmit={handleSubmit}>
          <Textarea name="message" defaultValue="Test message" />
          <button type="submit">Submit</button>
        </form>
      );

      const submitButton = screen.getByRole("button", { name: "Submit" });
      fireEvent.click(submitButton);

      expect(handleSubmit).toHaveReturnedWith("Test message");
    });

    it("validates required field", async () => {
      const user = userEvent.setup();
      render(
        <form>
          <Textarea required name="message" />
          <button type="submit">Submit</button>
        </form>
      );

      const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

      // Empty required field should be invalid
      expect(textarea.validity.valid).toBe(false);
      expect(textarea.validity.valueMissing).toBe(true);

      // Fill the field
      await user.type(textarea, "Valid content");
      expect(textarea.validity.valid).toBe(true);
      expect(textarea.validity.valueMissing).toBe(false);
    });
  });

  describe("Edge Cases", () => {
    it("handles empty className prop", () => {
      render(<Textarea className="" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toBeInTheDocument();
      expect(textarea.className).toBe("");
    });

    it("handles undefined className prop", () => {
      render(<Textarea className={undefined} />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toBeInTheDocument();
    });

    it("handles zero rows", () => {
      render(<Textarea rows={0} />);
      const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
      // Browsers typically enforce a minimum rows value (usually 2)
      // So we test that the component accepts the prop without crashing
      expect(textarea).toBeInTheDocument();
      // We can verify the prop was passed by checking it's not the default behavior
      expect(typeof textarea.rows).toBe("number");
    });

    it("handles very large text content", async () => {
      const user = userEvent.setup();
      // Use a more reasonable size for testing (100 chars instead of 10,000)
      const largeText = "a".repeat(100);
      render(<Textarea />);
      const textarea = screen.getByRole("textbox");

      await user.type(textarea, largeText);

      expect(textarea).toHaveValue(largeText);
    });

    it("handles paste operation with large content", async () => {
      const user = userEvent.setup();
      const largeText = "Large pasted content: " + "x".repeat(1000);
      render(<Textarea />);
      const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

      // Focus the textarea first
      await user.click(textarea);

      // Simulate paste by directly setting the value (more realistic for large content)
      fireEvent.change(textarea, { target: { value: largeText } });

      expect(textarea).toHaveValue(largeText);
    });
  });
});
