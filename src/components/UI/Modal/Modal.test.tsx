import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "./Modal";
import "@testing-library/jest-dom";

describe("Modal Tests", () => {
  const mockOnClose = jest.fn();
  const baseProps = {
    isOpen: true,
    onClose: mockOnClose,
    children: <div>Modal Content</div>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("does not render when isOpen is false", () => {
    const { container } = render(<Modal {...baseProps} isOpen={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders modal content when isOpen is true", () => {
    render(<Modal {...baseProps} />);

    expect(screen.getByText("Modal Content")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("closes when clicking close button", () => {
    render(<Modal {...baseProps} title="Test Title" />);

    fireEvent.click(screen.getByRole("close_btn", { name: /close/i }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when clicking modal content", () => {
    render(<Modal {...baseProps} />);

    fireEvent.click(screen.getByText("Modal Content"));
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
