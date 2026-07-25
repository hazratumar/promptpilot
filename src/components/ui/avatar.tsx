import * as React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
}

export function Avatar({ className, name, src, size = "md", ...props }: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);

  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  const sizes = {
    sm: "h-7 w-7 text-2xs",
    md: "h-9 w-9 text-xs",
    lg: "h-12 w-12 text-sm font-bold",
  };

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white shadow-2xs select-none overflow-hidden",
        sizes[size],
        className
      )}
      {...props}
    >
      {src && !imageError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
