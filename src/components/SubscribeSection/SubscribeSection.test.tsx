import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SubscribeSection } from "./SubscribeSection";
import axios from "axios";
import "@testing-library/jest-dom";
import { ReactNode } from "react";

jest.mock("axios");
jest.mock("../../components/UI/Button", () => ({
  Button: ({ children }: { children: ReactNode }) => (
    <button>{children}</button>
  ),
}));
jest.mock("../../components/UI/Title", () => ({
  Title: ({ title }: { title: string }) => <h2>{title}</h2>,
}));
jest.mock("react-router-dom", () => ({
  NavLink: ({ children }: { children: ReactNode }) => children,
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("SubscribeSection Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  it("renders email input and submit button", () => {
    render(<SubscribeSection />);

    // Ищем input по placeholder
    expect(screen.getByPlaceholderText("Your email")).toBeInTheDocument();
    // Ищем кнопку по тексту
    expect(
      screen.getByRole("button", { name: /subscribe/i })
    ).toBeInTheDocument();
  });

  it("submits form with email", async () => {
    mockedAxios.post.mockResolvedValue({ status: 200 });
    render(<SubscribeSection />);

    const emailInput = screen.getByPlaceholderText("Your email");
    const submitButton = screen.getByRole("button", { name: /subscribe/i });

    fireEvent.change(emailInput, {
      target: { value: "test@example.com" },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        "http://localhost:8080/email",
        { email: "test@example.com" }
      );
    });
  });

  it("shows success message after submit", async () => {
    mockedAxios.post.mockResolvedValue({ status: 200 });
    const { rerender } = render(<SubscribeSection />);

    fireEvent.change(screen.getByPlaceholderText("Your email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /subscribe/i }));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled();

      rerender(<SubscribeSection />);

      expect(
        screen.getByText(/you are already subscribed/i)
      ).toBeInTheDocument();
      expect(screen.queryByPlaceholderText("Your email")).toBeNull();
    });
  });
});
