import { render, screen, fireEvent } from "@testing-library/react";
import { Checkbox } from "./Checkbox";
import "@testing-library/jest-dom";

describe("Checkbox Tests", () => {
  const mockOnChange = jest.fn();
  const baseProps = {
    text: "Test Checkbox",
    checked: false,
    onChange: mockOnChange,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders checkbox with label", () => {
    render(<Checkbox {...baseProps} />);

    expect(screen.getByText("Test Checkbox")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("renders checked state correctly", () => {
    render(<Checkbox {...baseProps} checked={true} />);

    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("calls onChange handler when clicked", () => {
    render(<Checkbox {...baseProps} />);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(true);
  });

  it("toggles checked state when clicked", () => {
    const { rerender } = render(<Checkbox {...baseProps} />);

    fireEvent.click(screen.getByRole("checkbox"));
    expect(mockOnChange).toHaveBeenCalledWith(true);

    rerender(<Checkbox {...baseProps} checked={true} />);

    fireEvent.click(screen.getByRole("checkbox"));
    expect(mockOnChange).toHaveBeenCalledWith(false);
  });

  it("applies correct CSS classes", () => {
    const { container } = render(<Checkbox {...baseProps} />);

    expect(container.querySelector(".checkbox-container")).toBeInTheDocument();
    expect(container.querySelector(".checkbox")).toBeInTheDocument();
    expect(container.querySelector(".checkbox__check")).toBeInTheDocument();
  });
});
