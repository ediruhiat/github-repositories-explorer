import { cva } from "class-variance-authority";
import React, { useState } from "react";

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  border?: boolean;
  className?: string;
}

const avatar = cva(
  "rounded-full flex items-center justify-center bg-gray-200 text-gray-600 font-semibold overflow-hidden",
  {
    variants: {
      size: {
        sm: "w-8 h-8 text-sm",
        md: "w-12 h-12 text-base",
        lg: "w-16 h-16 text-lg",
        xl: "w-24 h-24 text-xl",
      },
      border: {
        true: "ring-1 ring-gray-200",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      border: false,
    },
  }
);

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = "md",
  border = false,
  className = "",
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={avatar({ size, border, className })}>
      {!imageError && (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
};
