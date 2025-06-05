import { cva } from "class-variance-authority";
import React from "react";

type ButtonProps = {
  color?: "primary" | "secondary" | "danger";
  radius?: "sm" | "md" | "lg" | "full";
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
  size?: "default" | "sm" | "lg";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium shadow-md/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      color: {
        default:
          "bg-linear-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 focus-visible:ring-blue-500",
        primary:
          "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500",
        secondary:
          "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500",
        danger:
          "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
        warning:
          "bg-yellow-600 text-white hover:bg-yellow-700 focus-visible:ring-yellow-500",
        ghost:
          "hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-500",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-md px-4",
        lg: "h-11 rounded-md px-8",
      },
      radius: {
        default: "rounded-sm",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      shadow: {
        default: "shadow/5",
        none: "shadow-none",
        sm: "shadow-sm/5",
        md: "shadow-md/5",
        lg: "shadow-lg/5",
        xl: "shadow-xl/5",
      },
    },
    defaultVariants: {
      color: "default",
      size: "default",
      radius: "default",
      shadow: "default",
    },
  }
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ color, radius, size, shadow, className, children, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={buttonVariants({ color, radius, size, shadow, className })}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
