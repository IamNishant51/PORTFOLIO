import React from "react";

interface PlateFrameProps {
  children: React.ReactNode;
  caption?: string;
  className?: string;
  aspectRatio?: string;
}

export function PlateFrame({
  children,
  caption,
  className = "",
  aspectRatio,
}: PlateFrameProps) {
  return (
    <figure className={`w-full flex flex-col gap-2.5 min-w-0 ${className}`}>
      <div
        className="w-full overflow-hidden relative"
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        <div className="relative w-full h-full overflow-hidden">
          {children}
        </div>
      </div>
      {caption && (
        <figcaption className="w-full meta-label text-muted text-[0.625rem] tracking-[0.16em] sm:tracking-[0.2em] leading-normal break-words sm:break-normal">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
