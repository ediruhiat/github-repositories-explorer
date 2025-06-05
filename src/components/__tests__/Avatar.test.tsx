import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Avatar } from "../Avatar";
import "@testing-library/jest-dom";

describe("Avatar component", () => {
  it("renders an image with provided src and alt", () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="Profile" />);
    const img = screen.getByAltText("Profile") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toBe("https://example.com/avatar.jpg");
  });

  it("hides the image if it fails to load", () => {
    render(<Avatar src="broken.jpg" alt="Broken" />);
    const img = screen.getByAltText("Broken");

    // Simulate image load error
    fireEvent.error(img);

    expect(img).not.toBeInTheDocument();
  });

  it("applies correct size class for 'lg'", () => {
    const { container } = render(<Avatar size="lg" />);
    const avatarDiv = container.firstChild as HTMLElement;
    expect(avatarDiv).toHaveClass("w-16 h-16");
  });

  it("applies ring class when border is true", () => {
    const { container } = render(<Avatar border />);
    const avatarDiv = container.firstChild as HTMLElement;
    expect(avatarDiv).toHaveClass("ring-1", "ring-gray-200");
  });

  it("applies custom className", () => {
    const { container } = render(<Avatar className="custom-class" />);
    const avatarDiv = container.firstChild as HTMLElement;
    expect(avatarDiv).toHaveClass("custom-class");
  });
});
