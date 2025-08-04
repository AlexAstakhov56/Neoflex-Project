import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Accordion } from "./Accordion";
import { Divider } from "../Divider";

jest.mock("../Divider", () => ({
  Divider: jest.fn(() => null),
}));

describe("Accordion Tests", () => {
  const mockOnClick = jest.fn();
  const defaultProps = {
    title: "Test Title",
    description: "Test Description",
    isActive: false,
    onClick: mockOnClick,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with title and closed state", () => {
    render(<Accordion {...defaultProps} />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByTestId("accordion-description")).not.toHaveClass(
      "active"
    );
    expect(screen.getByRole("img")).not.toHaveClass("rotate");
  });

  it("renders with open state when isActive=true", () => {
    render(<Accordion {...defaultProps} isActive={true} />);

    expect(screen.getByTestId("accordion-description")).toHaveClass("active");
    expect(screen.getByRole("img")).toHaveClass("rotate");
  });

  it("calls onClick when header is clicked", () => {
    render(<Accordion {...defaultProps} />);

    fireEvent.click(screen.getByText("Test Title"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("does not render Divider when isLast=true", () => {
    render(<Accordion {...defaultProps} isLast={true} />);
    expect(Divider).not.toHaveBeenCalled();
  });

  it("applies correct classes based on isActive", () => {
    const { rerender } = render(<Accordion {...defaultProps} />);

    expect(screen.getByTestId("accordion-description")).not.toHaveClass(
      "active"
    );
    expect(screen.getByRole("img")).not.toHaveClass("rotate");

    rerender(<Accordion {...defaultProps} isActive={true} />);
    expect(screen.getByTestId("accordion-description")).toHaveClass("active");
    expect(screen.getByRole("img")).toHaveClass("rotate");
  });
});
