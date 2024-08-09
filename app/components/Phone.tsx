import { cn } from "@/lib/utils";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  dark?: boolean;
  imgSrc: string;
  className?: string;
}

function Phone({ dark = false, imgSrc, className, ...props }: Props) {
  return (
    <div
      {...props}
      className={cn(
        "relative pointer-events-none z-0 overflow-hidden",
        className
      )}
    >
      <img
        src={
          dark
            ? "/phone-template-dark-edges.png"
            : "/phone-template-white-edges.png"
        }
        className={cn("select-none")}
        alt="phone image"
      />
      <div className="absolute -z-10 inset-0">
        <img
          src={imgSrc}
          alt="phone"
          className="object-cover z-20 min-h-full max-h-full"
        />
      </div>
    </div>
  );
}

export default Phone;
