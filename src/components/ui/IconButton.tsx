import { memo, type ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  src: string;
  alt: string;
  iconSize?: string;
  label?: string;
}

export const IconButton = memo(
  ({
    src,
    alt,
    iconSize = "w-4 h-4",
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
        <img src={src} alt={alt} className={iconSize} />
      </button>
    );
  }
);
