import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "./input";

describe("Input Component", () => {
  // Basic rendering
  it("renders correctly with default props", () => {
    render(<Input placeholder="Test input" />);
    const inputElement = screen.getByPlaceholderText("Test input");
    expect(inputElement).toBeDefined();
    expect(inputElement.tagName).toBe("INPUT");
  });

  it("has text as the default input type", () => {
    render(<Input placeholder="Default type" />);
    const inputElement = screen.getByPlaceholderText(
      "Default type"
    ) as HTMLInputElement;
    expect(inputElement.type).toBe("text");
  });

  // Type prop
  it("applies custom type correctly", () => {
    render(<Input type="email" placeholder="Email input" />);
    const inputElement = screen.getByPlaceholderText(
      "Email input"
    ) as HTMLInputElement;
    expect(inputElement.type).toBe("email");
  });

  // ClassName prop
  it("applies custom className correctly", () => {
    const customClass = "custom-class";
    render(<Input className={customClass} placeholder="Styled input" />);
    const inputElement = screen.getByPlaceholderText("Styled input");
    expect(inputElement.className).toBe(customClass);
  });

  // Event handling
  it("handles onChange events", () => {
    const handleChange = vi.fn();
    render(<Input placeholder="Changeable input" onChange={handleChange} />);

    const inputElement = screen.getByPlaceholderText("Changeable input");
    fireEvent.change(inputElement, { target: { value: "new value" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("handles focus events", () => {
    const handleFocus = vi.fn();
    render(<Input placeholder="Focusable input" onFocus={handleFocus} />);

    const inputElement = screen.getByPlaceholderText("Focusable input");
    fireEvent.focus(inputElement);

    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it("handles blur events", () => {
    const handleBlur = vi.fn();
    render(<Input placeholder="Blurrable input" onBlur={handleBlur} />);

    const inputElement = screen.getByPlaceholderText("Blurrable input");
    fireEvent.blur(inputElement);

    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  // Value handling
  it("displays the correct value", () => {
    const testValue = "test value";
    render(<Input value={testValue} readOnly />);

    const inputElement = screen.getByDisplayValue(
      testValue
    ) as HTMLInputElement;
    expect(inputElement.value).toBe(testValue);
  });

  it("updates value with controlled input", () => {
    const { rerender } = render(<Input value="initial" readOnly />);

    let inputElement = screen.getByDisplayValue("initial") as HTMLInputElement;
    expect(inputElement.value).toBe("initial");

    // Update the value prop
    rerender(<Input value="updated" readOnly />);

    inputElement = screen.getByDisplayValue("updated") as HTMLInputElement;
    expect(inputElement.value).toBe("updated");
  });

  // Other HTML attributes
  it("passes other HTML attributes to input element", () => {
    render(
      <Input
        placeholder="Attributed input"
        data-testid="test-input"
        aria-label="Input label"
        maxLength={10}
      />
    );

    const inputElement = screen.getByPlaceholderText("Attributed input");
    expect(inputElement.getAttribute("data-testid")).toBe("test-input");
    expect(inputElement.getAttribute("aria-label")).toBe("Input label");
    expect(inputElement.getAttribute("maxLength")).toBe("10");
  });

  // Disabled state
  it("can be disabled", () => {
    render(<Input placeholder="Disabled input" disabled />);

    const inputElement = screen.getByPlaceholderText(
      "Disabled input"
    ) as HTMLInputElement;
    expect(inputElement.disabled).toBe(true);
  });
});
