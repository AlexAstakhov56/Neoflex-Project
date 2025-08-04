import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";
import "@testing-library/jest-dom";

describe("Button Tests", () => {
  const mockOnClick = jest.fn();

  it("renders button with default props", () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
    expect(button).not.toBeDisabled();
    expect(button).toHaveClass("btn", "default");
    expect(button).toHaveStyle({
      borderRadius: "16px",
      paddingTop: "16px",
      paddingBottom: "16px",
      paddingLeft: "16px",
      paddingRight: "16px",
    });
  });

  it.each`
    type           | expectedClass
    ${"default"}   | ${"default"}
    ${"deny"}      | ${"deny"}
    ${"subscribe"} | ${"subscribe__button"}
  `(
    "applies correct class for $type button type",
    ({ type, expectedClass }) => {
      render(<Button buttonType={type}>Button</Button>);
      expect(screen.getByRole("button")).toHaveClass("btn", expectedClass);
    }
  );

  it("applies correct styles from props", () => {
    render(
      <Button borderRadius={10} paddingX={20} paddingY={5}>
        Styled
      </Button>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveStyle({
      borderRadius: "10px",
      paddingTop: "5px",
      paddingBottom: "5px",
      paddingLeft: "20px",
      paddingRight: "20px",
    });
  });

  it("calls onClick handler when clicked", () => {
    render(<Button onClick={mockOnClick}>Clickable</Button>);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("renders submit button when type is submit", () => {
    render(<Button type="submit">Submit</Button>);

    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("renders children correctly", () => {
    render(
      <Button>
        <span>Icon</span> Text
      </Button>
    );

    expect(screen.getByRole("button")).toHaveTextContent("Icon Text");
  });
});
