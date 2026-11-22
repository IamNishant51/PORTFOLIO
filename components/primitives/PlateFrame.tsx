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
      {/* Museum matting frame */}
      <div
        className="w-full p-[10px] bg-paper-edge border border-hairline-strong rounded-xs overflow-hidden relative shadow-[0_4px_24px_rgba(26,24,21,0.06)]"
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        <div className="relative w-full h-full overflow-hidden rounded-[1px]">
          {children}
        </div>
      </div>
      {/* Optional mono caption underneath */}
      {caption && (
        <figcaption className="w-full meta-label text-muted text-[0.625rem] tracking-[0.16em] sm:tracking-[0.2em] leading-normal break-words sm:break-normal">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
