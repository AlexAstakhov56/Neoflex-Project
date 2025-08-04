import { render, screen } from "@testing-library/react";
import { Input } from "./Input";
import { FieldError } from "react-hook-form";
import "@testing-library/jest-dom";
import { ReactNode } from "react";

const mockRegister = jest.fn();
const mockFormValues = { fieldName: "" };
jest.mock("react-router-dom", () => ({
  NavLink: ({ children }: { children: ReactNode }) => children,
}));

describe("Input Tests", () => {
  const baseProps = {
    label: "Test Label",
    placeholder: "Test Placeholder",
    required: true,
    name: "fieldName" as const,
    register: mockRegister,
    isValid: false,
    error: undefined,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders label and input with basic props", () => {
    render(<Input {...baseProps} />);

    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Test Placeholder")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("applies required indicator when required is true", () => {
    render(<Input {...baseProps} required={true} />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("applies error styles and message when error exists", () => {
    const error: FieldError = {
      type: "required",
      message: "This field is required",
    };

    render(<Input {...baseProps} error={error} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("error");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("applies valid styles when isValid is true", () => {
    render(<Input {...baseProps} isValid={true} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("valid");
  });
});
