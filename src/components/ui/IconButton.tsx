import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  imgPath: string;
  alt: string;
  iconSize?: string;
  label?: string;
}

const BASE_URL =
  import.meta.env.VITE_BASE_URL || "https://test.create.diagnal.com/";

export const IconButton = ({
  imgPath,
  alt,
  iconSize = "w-4",
  label,
  className,
  ...props
}: IconButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        "flex items-center justify-center cursor-pointer h-8 w-8 rounded-full hover:bg-background transition-colors duration-200",
        className
      )}
      aria-label={label || alt}
      title={label || alt}
    >
      <img
        src={`${BASE_URL}images/${imgPath}`}
        alt={alt}
        className={iconSize}
      />
    </button>
  );
};
