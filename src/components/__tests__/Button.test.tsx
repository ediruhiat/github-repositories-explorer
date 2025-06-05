import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "../Button";

describe("Button Component", () => {
  it("renders with default props and children", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });

    expect(button).toBeInTheDocument();
    // Check default classes applied via cva (class-variance-authority)
    expect(button).toHaveClass("cursor-pointer");
    expect(button).toHaveClass("bg-linear-to-r"); // part of default color
    expect(button).toHaveClass("h-10"); // default size height
    expect(button).toHaveClass("rounded-sm"); // default radius
    expect(button).toHaveClass("shadow/5"); // default shadow
  });

  it("applies color, size, radius, and shadow variants correctly", () => {
    render(
      <Button color="danger" size="lg" radius="full" shadow="xl">
        Danger Button
      </Button>
    );
    const button = screen.getByRole("button", { name: /danger button/i });

    expect(button).toHaveClass("bg-red-600");
    expect(button).toHaveClass("h-11");
    expect(button).toHaveClass("rounded-full");
    expect(button).toHaveClass("shadow-xl/5");
  });

  it("renders children correctly", () => {
    render(<Button>Submit</Button>);
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("accepts and handles button props like onClick and disabled", () => {
    const onClick = jest.fn();
    render(
      <Button onClick={onClick} disabled>
        Disabled Button
      </Button>
    );
    const button = screen.getByRole("button", { name: /disabled button/i });

    expect(button).toBeDisabled();

    // Click should not trigger onClick because button is disabled
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref Button</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current?.textContent).toBe("Ref Button");
  });
});
