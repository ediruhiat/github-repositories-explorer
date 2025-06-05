import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ScrollToTopButton } from "../ScrollToTopButton";
import "@testing-library/jest-dom";

// Mock window.scrollTo
const scrollToMock = jest.fn();
Object.defineProperty(window, "scrollTo", {
  value: scrollToMock,
  writable: true,
});

describe("ScrollToTopButton", () => {
  beforeEach(() => {
    scrollToMock.mockClear();
    // Reset scroll position
    Object.defineProperty(window, "scrollY", {
      value: 0,
      writable: true,
    });
  });

  it("does not render when scrollY is less than 300", () => {
    render(<ScrollToTopButton />);
    expect(screen.queryByRole("button", { name: /scroll to top/i })).not.toBeInTheDocument();
  });

  it("renders when scrollY is more than 300", () => {
    render(<ScrollToTopButton />);

    act(() => {
      Object.defineProperty(window, "scrollY", { value: 350 });
      fireEvent.scroll(window);
    });

    expect(screen.getByRole("button", { name: /scroll to top/i })).toBeInTheDocument();
  });

  it("calls scrollTo when clicked", () => {
    render(<ScrollToTopButton />);

    act(() => {
      Object.defineProperty(window, "scrollY", { value: 350 });
      fireEvent.scroll(window);
    });

    const button = screen.getByRole("button", { name: /scroll to top/i });
    fireEvent.click(button);

    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});
