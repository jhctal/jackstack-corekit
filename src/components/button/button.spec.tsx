import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./button";

describe("Button", () => {
  it("renders with children", () => {
    render(<Button>Click me</Button>);
    // Use standard assertion
    expect(screen.getByText("Click me")).toBeDefined();
  });

  it("applies custom className correctly", () => {
    const customClass = "custom-class";
    render(<Button className={customClass}>Styled Button</Button>);
    const buttonElement = screen.getByText("Styled Button");
    // Use standard assertion
    expect(buttonElement.className).toBe(customClass);
  });

  it("sets button type correctly", () => {
    render(<Button type="submit">Submit Button</Button>);
    const buttonElement = screen.getByText("Submit Button");
    // Use standard assertion
    expect(buttonElement.getAttribute("type")).toBe("submit");
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);

    fireEvent.click(screen.getByText("Clickable"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
